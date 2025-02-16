import { addTemplate, installModule, useNuxt } from '@nuxt/kit'
import { createTailwindSafelist } from 'vueless/utils/node/tailwindSafelist.js'
import { getNuxtDirs } from 'vueless/utils/node/helper.js'
import { join } from 'pathe'
import { defu } from 'defu'

import type { Nuxt } from './types'

export default async function installTailwind(_nuxt: Nuxt = useNuxt()) {
  /* Generate tailwind safelist before module installed */
  await createTailwindSafelist({
    targetFiles: getNuxtDirs(),
  })

  /* Add vueless tailwind config template */
  const vuelessConfigFile = addTemplate({
    filename: 'vueless-tailwind.config.mjs',
    write: true,
    getContents: async () => `
      import forms from "@tailwindcss/forms";
      import { getSafelist, vuelessTailwindConfig } from "vueless/preset-tailwind";

      export default {
        plugins: [forms({ strategy: "base" })],
        safelist: getSafelist(),
        ...vuelessTailwindConfig,
      }
    `,
  })

  /* Merge vueless and default tailwind config paths */
  const configPaths = [vuelessConfigFile.dst, join(_nuxt.options.rootDir, 'tailwind.config')]

  /* Get tailwind user configs */
  const { configPath = [], ...twModuleConfig } = _nuxt.options.tailwindcss ?? {}
  const userConfigPath = configPath as string | string[]

  /* Merge vueless, default, and user tailwind config paths */
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
