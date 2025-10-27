import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir, hasNuxtModule } from '@nuxt/kit'
import { dirname, relative } from 'pathe'
import { Vueless, TailwindCSS } from 'vueless/plugin-vite'
import { cacheMergedConfigs, autoImportUserConfigs } from 'vueless/utils/node/helper.js'
import { COMPONENTS, NUXT_MODULE_ENV, VUELESS_LIBRARY } from 'vueless/constants.js'

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

    const { resolve, resolvePath } = createResolver(import.meta.url)
    const { include, debug, postcss, basePath } = _options

    const vuelessPath = await resolvePath(VUELESS_LIBRARY)
    const vuelessDir = dirname(vuelessPath)

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
    await cacheMergedConfigs({ vuelessSrcDir: relative(process.cwd(), vuelessDir), basePath })

    /* Register i18n module */
    if (hasNuxtModule('@nuxtjs/i18n')) {
      // @ts-expect-error Type is present in this condition
      _nuxt.hook('i18n:registerModule', (register) => {
        register({
          langDir: resolve(`${vuelessDir}/locales`),
          locales: [
            { code: 'en', name: 'English', file: 'en.json' },
          ],
        })
      })
    }

    /**
     * Add runtime plugin
     * Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
     */
    addPlugin(resolve('./runtime/plugin'))

    /* Register vueless components for auto-import. */
    for (const [componentName, componentDir] of Object.entries(COMPONENTS)) {
      addComponent({
        name: componentName,
        filePath: `${vuelessDir}/${componentDir}/${componentName}.vue`,
      })
    }

    /* Register vueless composables for auto-import. */
    addImportsDir(`${vuelessDir}/composables`)

    /* Register vueless utils for auto-import. */
    addImportsDir(`${vuelessDir}/utils`)
  },
})
