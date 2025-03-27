import { createVueless, setTheme } from 'vueless'
import { COLOR_MODE_KEY, AUTO_MODE_KEY, LIGHT_MODE_SELECTOR, DARK_MODE_SELECTOR, PRIMARY_COLOR_KEY, NEUTRAL_COLOR_KEY, ROUNDING_KEY, DEFAULT_PRIMARY_COLOR, DEFAULT_NEUTRAL_COLOR, DEFAULT_ROUNDING } from 'vueless/constants'
import { ColorMode } from 'vueless/types'
import vClickOutside from 'vueless/directives/clickOutside/vClickOutside'
import vTooltip from 'vueless/directives/tooltip/vTooltip'

import { defineNuxtPlugin } from '#app'

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {}

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')
    if (key) acc[key] = value
    return acc
  }, {})
}

export default defineNuxtPlugin((_nuxtApp) => {
  /* Init vueless */
  const vueless = createVueless()
  _nuxtApp.vueApp.use(vueless, [])

  /* Set vueless directives */
  _nuxtApp.vueApp.directive('clickOutside', vClickOutside)
  _nuxtApp.vueApp.directive('tooltip', vTooltip)

  /* Set vueless theme variables */
  if (import.meta.server) {
    const event = _nuxtApp.ssrContext?.event

    const cookies = parseCookies(event?.node.req.headers.cookie)

    const colorMode = cookies?.[COLOR_MODE_KEY] || ColorMode.Auto
    const isAutoMode = cookies?.[AUTO_MODE_KEY] === undefined ? true : !!Number(cookies?.[AUTO_MODE_KEY])
    const primaryColor = cookies?.[PRIMARY_COLOR_KEY] || DEFAULT_PRIMARY_COLOR
    const neutralColor = cookies?.[NEUTRAL_COLOR_KEY] || DEFAULT_NEUTRAL_COLOR
    const rounding = cookies?.[ROUNDING_KEY] || DEFAULT_ROUNDING

    const themeRootVariables = setTheme(
      {
        primary: primaryColor,
        neutral: neutralColor,
        rounding: Number(rounding),
        colorMode: colorMode,
      },
      isAutoMode,
    )

    const colorModeClass = colorMode === ColorMode.Dark ? DARK_MODE_SELECTOR : LIGHT_MODE_SELECTOR

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})
