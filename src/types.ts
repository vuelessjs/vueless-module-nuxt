import type { ModuleOptions as TailwindcssModuleOptions } from '@nuxtjs/tailwindcss'
import type { Nuxt as DefaultNuxt, NuxtOptions as DefaultNuxtOptions } from '@nuxt/schema'

export interface NuxtOptions extends DefaultNuxtOptions {
  tailwindcss?: TailwindcssModuleOptions
}

export interface Nuxt extends DefaultNuxt {
  options: NuxtOptions
}
