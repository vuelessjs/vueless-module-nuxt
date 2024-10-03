import type { ModuleOptions as TailwindcssMoudleOptions } from '@nuxtjs/tailwindcss'
import type { Nuxt as DefaultNuxt, NuxtOptions as DefaultNuxtOptions } from '@nuxt/schema'

export interface NuxtOptions extends DefaultNuxtOptions {
  tailwindcss?: TailwindcssMoudleOptions
}

export interface Nuxt extends DefaultNuxt {
  options: NuxtOptions
}
