import { addTemplate, installModule, useNuxt } from '@nuxt/kit'
import { createTailwindSafelist } from '@vueless/plugin-vite/utils/tailwindSafelist'
import { join } from 'pathe'
import { defu } from 'defu'

import type { Nuxt } from './types'

export default async function installTailwind(_nuxt: Nuxt = useNuxt()) {
  /* Generate tailwind safelist before module installed */
  await createTailwindSafelist()

  /* Add vueless tailwind config template */
  const vuelessConfigFile = addTemplate({
    filename: 'vueless-tailwind.config.cjs',
    write: true,
    getContents: async () => `
      const { getSafelist, vuelessTailwindConfig } = require("vueless/preset.tailwind");

      module.exports = {
        plugins: [
          require('@tailwindcss/forms'),
        ],
        safelist: getSafelist(),
        ...vuelessTailwindConfig,
      }
    `,
  })

  /* Merge vueless and default tailwind config paths */
  const configPaths = [vuelessConfigFile.dst, join(_nuxt.options.rootDir, 'tailwind.config')]

  /* Get tailwind user configs */
  const { configPath: userConfigPath = [], ...twModuleConfig } = _nuxt.options.tailwindcss ?? {}

  /* Merge vueless, default, and user tailwind config paths */

  // configPaths.push(userConfigPath)
  if (typeof userConfigPath === 'string') {
    configPaths.push(userConfigPath)
  }
  else {
    configPaths.push(...userConfigPath)
  }

  /* Install tailwind module */
  await installModule('@nuxtjs/tailwindcss', defu({
    exposeConfig: true,
    configPath: configPaths,
  }, twModuleConfig))
}
