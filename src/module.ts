import { copyFileSync, existsSync } from 'node:fs'
import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir } from '@nuxt/kit'
import TailwindCSS from '@tailwindcss/vite'

import { Vueless } from 'vueless/plugin-vite.js'
import { getNuxtDirs } from 'vueless/utils/node/helper.js'
import { createTailwindSafelist } from 'vueless/utils/node/tailwindSafelist.js'
import { COMPONENTS, VUELESS_CACHE_DIR, VUELESS_CONFIG_FILE_NAME } from 'vueless/constants.js'

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
    _nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(
        TailwindCSS(),
        Vueless({ mode: 'nuxt-module', mirrorCacheDir, debug }),
      )
    })

    /* Copy vueless config into .output folder. */
    _nuxt.hook('nitro:build:public-assets', () => {
      const source = resolve(process.cwd(), `${VUELESS_CACHE_DIR}/${VUELESS_CONFIG_FILE_NAME}.mjs`)
      const destination = resolve(process.cwd(), `.output/${VUELESS_CONFIG_FILE_NAME}.mjs`)

      if (existsSync(source)) {
        copyFileSync(source, destination)
      }
    })

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
