// import { copyFileSync, existsSync } from 'node:fs'
import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir } from '@nuxt/kit'

import { Vueless, TailwindCSS } from 'vueless/plugin-vite.js'
import { getNuxtDirs } from 'vueless/utils/node/helper.js'
import { createTailwindSafelist } from 'vueless/utils/node/tailwindSafelist.js'
import { COMPONENTS } from 'vueless/constants.js'

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

    let vuelessConfig = {}

    try {
      vuelessConfig = (await import(/* @vite-ignore */ `${process.cwd()}/vueless.config.js`))
        .default

      if (!vuelessConfig) {
        vuelessConfig = (await import(/* @vite-ignore */ `${process.cwd()}/vueless.config.ts`))
          .default
      }
    }
    catch {
      vuelessConfig = {}
    }

    console.log('vuelessConfig', vuelessConfig)

    _nuxt.options.runtimeConfig.public.vueless = vuelessConfig

    /* Copy vueless config into .output folder. */
    // _nuxt.hook('nitro:build:public-assets', () => {
    //   const source = resolve(process.cwd(), `${VUELESS_CACHE_DIR}/${VUELESS_CONFIG_FILE_NAME}.mjs`)
    //   const destination = resolve(process.cwd(), `.output/${VUELESS_CONFIG_FILE_NAME}.mjs`)
    //   const destination2 = resolve(process.cwd(), `dist/${VUELESS_CONFIG_FILE_NAME}.mjs`)
    //   const destination3 = resolve(process.cwd(), `dist/_nuxt/${VUELESS_CONFIG_FILE_NAME}.mjs`)
    //   const destination4 = resolve(process.cwd(), `${VUELESS_CONFIG_FILE_NAME}.mjs`)
    //
    //   const outputDir = resolve(process.cwd(), `.output`)
    //   const distDir = resolve(process.cwd(), `dist`)
    //   const distNuxtDir = resolve(process.cwd(), `dist/_nuxt`)
    //
    //   console.log('source', source)
    //   console.log('destination', destination)
    //   console.log('existsSync(source)', existsSync(source))
    //
    //   console.log('existsSync(.output)', existsSync(outputDir))
    //   console.log('existsSync(dist)', existsSync(distDir))
    //
    //   if (existsSync(source) && existsSync(outputDir)) {
    //     copyFileSync(source, destination)
    //   }
    //
    //   if (existsSync(source) && existsSync(distDir)) {
    //     copyFileSync(source, destination2)
    //   }
    //
    //   if (existsSync(source) && existsSync(distNuxtDir)) {
    //     copyFileSync(source, destination3)
    //   }
    //
    //   if (existsSync(source)) {
    //     copyFileSync(source, destination4)
    //   }
    // })

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
