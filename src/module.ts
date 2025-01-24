import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir } from '@nuxt/kit'
import { COMPONENTS } from 'vueless/constants.js'
import { Vueless } from 'vueless/plugin-vite.js'
import installTailwind from './tailwind'

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
    _nuxt.options.build.transpile.push('vueless', 'tailwindcss')

    /* Add vueless vite plugin */
    _nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(
        Vueless({ mode: 'nuxt-module', mirrorCacheDir, debug }),
      )
    })

    /* Install Tailwind module */
    await installTailwind(_nuxt)

    /**
     * Add runtime plugin
     * Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
     */
    addPlugin(resolve('./runtime/plugin'))

    /* Register vueless components for auto-import. */
    for (const componentName in COMPONENTS) {
      await addComponent({
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
