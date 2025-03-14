import type { Nuxt as DefaultNuxt, NuxtOptions } from '@nuxt/schema'

export interface Nuxt extends DefaultNuxt {
  options: NuxtOptions
}
