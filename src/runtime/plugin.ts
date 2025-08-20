import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createVueless, createVueI18nAdapter, setTheme, ColorMode, vClickOutside, vTooltip, vuelessConfig } from 'vueless'
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

import type { CreateVuelessOptions, Config as VuelessConfig } from 'vueless'

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

export default defineNuxtPlugin((_nuxtApp) => {
  const vuelessOptions = {} as CreateVuelessOptions

  /* Define Vueless config only in production to prevent hydration errors */
  if (import.meta.env.PROD) {
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

    const primary = cookies?.[`vl-${PRIMARY_COLOR}`] ?? undefined
    const neutral = cookies?.[`vl-${NEUTRAL_COLOR}`] ?? undefined

    const textXs = Number(cookies?.[`vl-${TEXT}-xs`])
    const textSm = Number(cookies?.[`vl-${TEXT}-sm`])
    const textMd = Number(cookies?.[`vl-${TEXT}-md`])
    const textLg = Number(cookies?.[`vl-${TEXT}-lg`])

    const text = {
      xs: !Number.isNaN(textXs) ? textXs : undefined,
      sm: !Number.isNaN(textSm) ? textSm : undefined,
      md: !Number.isNaN(textMd) ? textMd : undefined,
      lg: !Number.isNaN(textLg) ? textLg : undefined,
    }

    const outlineSm = Number(cookies?.[`vl-${OUTLINE}-sm`])
    const outlineMd = Number(cookies?.[`vl-${OUTLINE}-md`])
    const outlineLg = Number(cookies?.[`vl-${OUTLINE}-lg`])

    const outline = {
      sm: !Number.isNaN(outlineSm) ? outlineSm : undefined,
      md: !Number.isNaN(outlineMd) ? outlineMd : undefined,
      lg: !Number.isNaN(outlineLg) ? outlineLg : undefined,
    }

    const roundingSm = Number(cookies?.[`vl-${ROUNDING}-sm`])
    const roundingMd = Number(cookies?.[`vl-${ROUNDING}-md`])
    const roundingLg = Number(cookies?.[`vl-${ROUNDING}-lg`])

    const rounding = {
      sm: !Number.isNaN(roundingSm) ? roundingSm : undefined,
      md: !Number.isNaN(roundingMd) ? roundingMd : undefined,
      lg: !Number.isNaN(roundingLg) ? roundingLg : undefined,
    }

    const disabledOpacityValue = Number(cookies?.[`vl-${DISABLED_OPACITY}`])
    const disabledOpacity = !Number.isNaN(disabledOpacityValue) ? disabledOpacityValue : undefined

    const colorMode = (cookies?.[COLOR_MODE_KEY] || vuelessConfig.colorMode || ColorMode.Light) as ColorMode

    const autoModeValue = Number(cookies?.[AUTO_MODE_KEY])
    const isCachedAutoMode = Boolean(!Number.isNaN(autoModeValue) ? autoModeValue : undefined)

    const themeRootVariables = setTheme({ primary, neutral, text, outline, rounding, disabledOpacity, colorMode }, isCachedAutoMode)
    const colorModeClass = colorMode === ColorMode.Dark ? DARK_MODE_CLASS : LIGHT_MODE_CLASS

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})
