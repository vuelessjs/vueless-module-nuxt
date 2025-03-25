import { createVueless, setTheme } from 'vueless'
import { COLOR_MODE_KEY, AUTO_MODE_KEY, LIGHT_MODE_SELECTOR, DARK_MODE_SELECTOR, PRIMARY_COLOR_KEY, NEUTRAL_COLOR_KEY } from 'vueless/constants'
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

    const colorModeCookie = cookies?.[COLOR_MODE_KEY]
    const isAutoModeCookie = cookies?.[AUTO_MODE_KEY]
    const primaryColorCookie = cookies?.[PRIMARY_COLOR_KEY]
    const neutralColorCookie = cookies?.[NEUTRAL_COLOR_KEY]

    const themeRootVariables = setTheme({
      primary: primaryColorCookie,
      neutral: neutralColorCookie,
      colorMode: colorModeCookie,
    },
    Boolean(Number(isAutoModeCookie)),
    )

    const colorModeClass = colorModeCookie === ColorMode.Dark ? DARK_MODE_SELECTOR : LIGHT_MODE_SELECTOR

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})
