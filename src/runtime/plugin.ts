import { createVueless, setTheme } from 'vueless'
import vClickOutside from 'vueless/directives/clickOutside/vClickOutside'
import vTooltip from 'vueless/directives/tooltip/vTooltip'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  /* Init vueless */
  const vueless = createVueless()
  _nuxtApp.vueApp.use(vueless, [])

  /* Set vueless directives */
  _nuxtApp.vueApp.directive('clickOutside', vClickOutside)
  _nuxtApp.vueApp.directive('tooltip', vTooltip)

  /* Set vueless theme variables */
  if (import.meta.server) {
    const themeRootVariables = setTheme()

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
    })
  }
})
