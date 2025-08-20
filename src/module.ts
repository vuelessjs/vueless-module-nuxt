import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir, hasNuxtModule } from '@nuxt/kit'
import { Vueless, TailwindCSS } from 'vueless/plugin-vite'
import { getVuelessConfig } from 'vueless/utils/node/vuelessConfig.js'
import { cacheMergedConfigs, autoImportUserConfigs } from 'vueless/utils/node/helper.js'
import { COMPONENTS, NUXT_MODULE_ENV, VUELESS_PACKAGE_DIR } from 'vueless/constants'

export default defineNuxtModule({
  meta: {
    name: '@vueless/nuxt',
    configKey: 'vueless',
    compatibility: {
      nuxt: '>=3.13.0',
    },
  },
  defaults: {
    include: [],
    basePath: '',
    debug: false,
    postcss: false,
  },
  async setup(_options, _nuxt) {
    /* Prevent invoking the module several times */
    if (_nuxt.options._prepare) return

    const { resolve } = createResolver(import.meta.url)
    const { include, debug, postcss, basePath } = _options

    /* Sync server vueless config with runtime config. */
    _nuxt.options.runtimeConfig.public.vueless = await getVuelessConfig(basePath)

    /* Register i18n module */
    if (hasNuxtModule('@nuxtjs/i18n')) {
      // @ts-expect-error Type is present in this condition
      _nuxt.hook('i18n:registerModule', (register) => {
        register({
          langDir: resolve('../node_modules/vueless/locales'),
          locales: [
            { code: 'en', name: 'English', file: 'en.json' },
          ],
        })
      })
    }

    /* Add vueless vite plugin */
    _nuxt.hook('vite:extendConfig', async (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(
        TailwindCSS({ postcss }),
        Vueless({ env: NUXT_MODULE_ENV, basePath, debug, include }),
      )
    })

    /* Auto-import user component configs */
    await autoImportUserConfigs(basePath)

    /* Merge component configs and cache it */
    await cacheMergedConfigs(VUELESS_PACKAGE_DIR)

    /**
     * Add runtime plugin
     * Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
     */
    addPlugin(resolve('./runtime/plugin'))

    /* Register vueless components for auto-import. */
    for (const [componentName, componentPath] of Object.entries(COMPONENTS)) {
      addComponent({
        name: componentName,
        filePath: `vueless/${componentPath}/${componentName}.vue`,
      })
    }

    /* Register vueless composables for auto-import. */
    addImportsDir('vueless/composables')

    /* Register vueless utils for auto-import. */
    addImportsDir('vueless/utils')
  },
})
