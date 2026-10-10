import { defineNuxtPlugin } from '#app'
import {
  getTheme,
  setTheme,
  ColorMode,
  createVueless,
  createVueI18nAdapter,
  getThemeCookieName,
  normalizeThemeConfig,
  vClickOutside,
  vTooltip,
} from 'vueless'
import {
  TEXT,
  OUTLINE,
  ROUNDING,
  THEME_TOKENS,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  AUTO_MODE_KEY,
  COLOR_MODE_KEY,
  LETTER_SPACING,
  DARK_MODE_CLASS,
  LIGHT_MODE_CLASS,
  DISABLED_OPACITY,
} from 'vueless/constants'

import type { CreateVuelessOptions } from 'vueless'

export default defineNuxtPlugin((_nuxtApp) => {
  const vuelessOptions = {} as CreateVuelessOptions

  /* Define vue-i18n adapter */
  if ('$i18n' in _nuxtApp) {
    vuelessOptions.i18n = {
      adapter: createVueI18nAdapter({ global: _nuxtApp.$i18n }),
    }
  }

  /* Init vueless */
  const vueless = createVueless(vuelessOptions)
  _nuxtApp.vueApp.use(vueless, [])

  /* Set vueless directives */
  _nuxtApp.vueApp.directive('clickOutside', vClickOutside)
  _nuxtApp.vueApp.directive('tooltip', vTooltip)

  /* Set vueless theme variables */
  if (import.meta.server) {
    const event = _nuxtApp.ssrContext?.event
    const cookies = parseCookies(event?.node.req.headers.cookie)

    const normalizedThemeParams = normalizeThemeConfig({
      colorMode: cookies?.[getThemeCookieName(COLOR_MODE_KEY)],
      isColorModeAuto: cookies?.[getThemeCookieName(AUTO_MODE_KEY)],
      primary: cookies?.[getThemeCookieName(`vl-${PRIMARY_COLOR}`)],
      neutral: cookies?.[getThemeCookieName(`vl-${NEUTRAL_COLOR}`)],
      text: {
        xs: cookies?.[getThemeCookieName(`vl-${TEXT}-xs`)],
        sm: cookies?.[getThemeCookieName(`vl-${TEXT}-sm`)],
        md: cookies?.[getThemeCookieName(`vl-${TEXT}-md`)],
        lg: cookies?.[getThemeCookieName(`vl-${TEXT}-lg`)],
      },
      outline: {
        sm: cookies?.[getThemeCookieName(`vl-${OUTLINE}-sm`)],
        md: cookies?.[getThemeCookieName(`vl-${OUTLINE}-md`)],
        lg: cookies?.[getThemeCookieName(`vl-${OUTLINE}-lg`)],
      },
      rounding: {
        sm: cookies?.[getThemeCookieName(`vl-${ROUNDING}-sm`)],
        md: cookies?.[getThemeCookieName(`vl-${ROUNDING}-md`)],
        lg: cookies?.[getThemeCookieName(`vl-${ROUNDING}-lg`)],
      },
      disabledOpacity: cookies?.[getThemeCookieName(`vl-${DISABLED_OPACITY}`)],
      letterSpacing: cookies?.[getThemeCookieName(`vl-${LETTER_SPACING}`)],
    })

    const theme = getTheme(normalizedThemeParams)

    const themeRootVariables = setTheme(theme)
    const colorModeClass = theme.colorMode === ColorMode.Dark ? DARK_MODE_CLASS : LIGHT_MODE_CLASS

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables, id: THEME_TOKENS }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {}

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, cookie) => {
    const [key, value] = cookie.trim().split('=')

    if (key) {
      acc[key] = value || ''
    }

    return acc
  }, {})
}
