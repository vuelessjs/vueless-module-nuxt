import { createVueless, setTheme } from 'vueless'
import {
  TEXT,
  OUTLINE,
  ROUNDING,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  AUTO_MODE_KEY,
  COLOR_MODE_KEY,
  DARK_MODE_CLASS,
  LIGHT_MODE_CLASS,
  DISABLED_OPACITY,
} from 'vueless/constants'
import { ColorMode } from 'vueless/types'
import vClickOutside from 'vueless/directives/clickOutside/vClickOutside'
import vTooltip from 'vueless/directives/tooltip/vTooltip'

import { useRuntimeConfig } from '#imports'
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
  const config = useRuntimeConfig().public.vueless

  /* Init vueless */
  const vueless = createVueless({ config })
  _nuxtApp.vueApp.use(vueless, [])

  /* Set vueless directives */
  _nuxtApp.vueApp.directive('clickOutside', vClickOutside)
  _nuxtApp.vueApp.directive('tooltip', vTooltip)

  /* Set vueless theme variables */
  if (import.meta.server) {
    const event = _nuxtApp.ssrContext?.event

    const cookies = parseCookies(event?.node.req.headers.cookie)

    const primary = cookies?.[`vl-${PRIMARY_COLOR}`]
    const neutral = cookies?.[`vl-${NEUTRAL_COLOR}`]

    const text = {
      xs: cookies?.[`vl-${TEXT}-xs`],
      sm: cookies?.[`vl-${TEXT}-sm`],
      md: cookies?.[`vl-${TEXT}-md`],
      lg: cookies?.[`vl-${TEXT}-lg`],
    }

    const outline = {
      sm: cookies?.[`vl-${OUTLINE}-sm`],
      md: cookies?.[`vl-${OUTLINE}-md`],
      lg: cookies?.[`vl-${OUTLINE}-lg`],
    }

    const rounding = {
      sm: cookies?.[`vl-${ROUNDING}-sm`],
      md: cookies?.[`vl-${ROUNDING}-md`],
      lg: cookies?.[`vl-${ROUNDING}-lg`],
    }

    const disabledOpacity = cookies?.[`vl-${DISABLED_OPACITY}`]
    const colorMode = cookies?.[COLOR_MODE_KEY]
    const isCachedAutoMode = Boolean(Number(cookies?.[AUTO_MODE_KEY]))

    const themeRootVariables = setTheme({ primary, neutral, text, outline, rounding, disabledOpacity, colorMode }, isCachedAutoMode)
    const colorModeClass = colorMode === ColorMode.Dark ? DARK_MODE_CLASS : LIGHT_MODE_CLASS

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})
