import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import {
  getTheme,
  setTheme,
  ColorMode,
  createVueless,
  createVueI18nAdapter,
  normalizeThemeConfig,
  vClickOutside,
  vTooltip,
} from 'vueless'
import {
  TEXT,
  OUTLINE,
  ROUNDING,
  PRIMARY_COLOR,
  NEUTRAL_COLOR,
  AUTO_MODE_KEY,
  COLOR_MODE_KEY,
  LETTER_SPACING,
  DARK_MODE_CLASS,
  LIGHT_MODE_CLASS,
  DISABLED_OPACITY,
} from 'vueless/constants'

import type { CreateVuelessOptions, Config as VuelessConfig } from 'vueless'

export default defineNuxtPlugin((_nuxtApp) => {
  const vuelessOptions = {} as CreateVuelessOptions

  /* Define Vueless config only in production to prevent hydration errors */
  if (!import.meta.env.DEV) {
    vuelessOptions.config = useRuntimeConfig().public.vueless as VuelessConfig
  }

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
      colorMode: cookies?.[COLOR_MODE_KEY],
      isColorModeAuto: cookies?.[AUTO_MODE_KEY],
      primary: cookies?.[`vl-${PRIMARY_COLOR}`],
      neutral: cookies?.[`vl-${NEUTRAL_COLOR}`],
      text: {
        xs: cookies?.[`vl-${TEXT}-xs`],
        sm: cookies?.[`vl-${TEXT}-sm`],
        md: cookies?.[`vl-${TEXT}-md`],
        lg: cookies?.[`vl-${TEXT}-lg`],
      },
      outline: {
        sm: cookies?.[`vl-${OUTLINE}-sm`],
        md: cookies?.[`vl-${OUTLINE}-md`],
        lg: cookies?.[`vl-${OUTLINE}-lg`],
      },
      rounding: {
        sm: cookies?.[`vl-${ROUNDING}-sm`],
        md: cookies?.[`vl-${ROUNDING}-md`],
        lg: cookies?.[`vl-${ROUNDING}-lg`],
      },
      disabledOpacity: cookies?.[`vl-${DISABLED_OPACITY}`],
      letterSpacing: cookies?.[`vl-${LETTER_SPACING}`],
    })

    const theme = getTheme(normalizedThemeParams)

    const themeRootVariables = setTheme(theme)
    const colorModeClass = theme.colorMode === ColorMode.Dark ? DARK_MODE_CLASS : LIGHT_MODE_CLASS

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
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
