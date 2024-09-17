import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'
import { COMPONENTS } from '@vueless/plugin-vite/constants.js'
import { Vueless } from '@vueless/plugin-vite'
import installTailwind from './tailwind'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@vueless/module-nuxt',
    configKey: 'vueless',
    compatibility: {
      nuxt: '>=3.13.0',
    },
  },
  defaults: {},
  async setup(_options, _nuxt) {
    const { resolve } = createResolver(import.meta.url)

    /* Add vueless vite plugin */
    _nuxt.hook('vite:extendConfig', (config) => {
      config.plugins = config.plugins || []
      config.plugins.push(Vueless({ mode: 'nuxt-module' }))
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
        filePath: `vueless/${COMPONENTS[componentName].folder}/${componentName}.vue`,
      })
    }
  },
})
