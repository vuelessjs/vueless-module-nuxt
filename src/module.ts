import path from 'node:path'
import { cwd } from 'node:process'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { defineNuxtModule, addPlugin, createResolver, addComponent, addImportsDir, hasNuxtModule } from '@nuxt/kit'
import { Vueless, TailwindCSS } from 'vueless/plugin-vite.js'
import { cacheMergedConfigs } from 'vueless/utils/node/helper.js'
import { COMPONENTS, VUELESS_CONFIG_FILE_NAME, NUXT_MODULE_ENV, VUELESS_PACKAGE_DIR } from 'vueless/constants.js'

const require = createRequire(import.meta.url)

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
    mirrorCacheDir: '',
    debug: false,
  },

  async setup(_options, _nuxt) {
    const { include, mirrorCacheDir, debug } = _options
    const { resolve } = createResolver(import.meta.url)
    const { vuelessConfig, dependencies } = await getVuelessConfig()

    /* Defining vueless config in runtime  */
    _nuxt.options.runtimeConfig.public.vueless = vuelessConfig

    /* Transpile vueless and tailwindcss ts files into js */
    _nuxt.options.build.transpile.push('vueless')

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
        TailwindCSS(),
        Vueless({ env: NUXT_MODULE_ENV, mirrorCacheDir, debug, include }),
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

    /* Merge component configs and cache it */
    await cacheMergedConfigs(VUELESS_PACKAGE_DIR)

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
