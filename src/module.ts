// import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'node:fs'
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
    const { mirrorCacheDir, debug } = _options
    const { resolve } = createResolver(import.meta.url)
    const { vuelessConfig, dependencies } = await getVuelessConfig()

    /* Defining vueless config in runtime  */
    _nuxt.options.runtimeConfig.public.vueless = vuelessConfig

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

    if (_nuxt.options.dev) {
      /* Reload nuxt when vueless config was changed. */
      const chokidarPath = require.resolve('chokidar')
      const chokidar = await import(chokidarPath)

      const watcher = chokidar.watch(dependencies, { ignoreInitial: true })

      watcher.on('change', async () => {
        const { dependencies: newDependencies } = await getVuelessConfig()

        watcher.unwatch(dependencies)
        watcher.add(newDependencies)

        /* TODO: Need to find better solution. */
        _nuxt.callHook('restart')
      })
    }

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

async function getVuelessConfig() {
  /* Using esbuild. This prevents `Inlined implicit external` issue. */
  const esbuildPath = require.resolve('esbuild')
  const esbuild = await import(esbuildPath)

  const esbuildConfig = {
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'ESNext',
    loader: { '.ts': 'ts' },
    write: false,
    metafile: true, // Generate dependency tree
  }

  const configPathJs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.js`)
  const configPathTs = path.join(cwd(), `${VUELESS_CONFIG_FILE_NAME}.ts`)

  let result = null

  if (fs.existsSync(configPathJs)) {
    result = await esbuild.build({ ...esbuildConfig, entryPoints: [configPathJs] })
  }

  if (fs.existsSync(configPathTs)) {
    result = await esbuild.build({ ...esbuildConfig, entryPoints: [configPathTs] })
  }

  const code = result?.outputFiles?.[0]?.text || ''

  return {
    vuelessConfig: (await import(`data:text/javascript,${encodeURIComponent(code)}`)).default || {},
    dependencies: Object.keys(result?.metafile?.inputs || {}),
  }
}
