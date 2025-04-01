// import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'node:fs'
import esbuild from 'esbuild'
import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir } from '@nuxt/kit'

import { Vueless, TailwindCSS } from 'vueless/plugin-vite.js'
import { getNuxtDirs } from 'vueless/utils/node/helper.js'
import { createTailwindSafelist } from 'vueless/utils/node/tailwindSafelist.js'
import { COMPONENTS, VUELESS_CONFIG_FILE_NAME } from 'vueless/constants.js'

export default defineNuxtModule({
  meta: {
    name: '@vueless/nuxt',
    configKey: 'vueless',
    compatibility: {
      nuxt: '>=3.13.0',
    },
  },

  defaults: {
    mirrorCacheDir: '',
    debug: false,
  },

  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const { mirrorCacheDir, debug } = _options

    /* Transpile vueless and tailwindcss ts files into js */
    _nuxt.options.build.transpile.push('vueless')

    /* Add vueless vite plugin */
    _nuxt.hook('vite:extendConfig', async (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(
        TailwindCSS(),
        Vueless({ mode: 'nuxt-module', mirrorCacheDir, debug }),
      )
    })

    const configPathJs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.js`)
    const configPathTs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.ts`)

    const esbuildConfig = {
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: 'ESNext',
      loader: { '.ts': 'ts' },
      write: false,
    }

    let vuelessConfig = {}
    let result = null

    if (fs.existsSync(configPathJs)) {
      result = await esbuild.build({ ...esbuildConfig, entryPoints: [configPathJs] })
    }

    if (fs.existsSync(configPathTs)) {
      result = await esbuild.build({ ...esbuildConfig, entryPoints: [configPathTs] })
    }

    const code = result?.outputFiles?.[0]?.text || ''

    vuelessConfig = (await import(`data:text/javascript,${encodeURIComponent(code)}`)).default

    _nuxt.options.runtimeConfig.public.vueless = vuelessConfig

    /* Generate tailwind safelist before module installed */
    await createTailwindSafelist({
      targetFiles: getNuxtDirs(),
    })

    /**
     * Add runtime plugin
     * Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
     */
    addPlugin(resolve('./runtime/plugin'))

    /* Register vueless components for auto-import. */
    for (const componentName in COMPONENTS) {
      addComponent({
        name: componentName,
        filePath: `vueless/${COMPONENTS[componentName]}/${componentName}.vue`,
      })
    }

    /* Register vueless composables for auto-import. */
    addImportsDir('vueless/composables')

    /* Register vueless utils for auto-import. */
    addImportsDir('vueless/utils')
  },
})
