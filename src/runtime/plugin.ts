import { createVueless, createVueI18nAdapter, setTheme, vClickOutside, vTooltip, vuelessConfig } from 'vueless'
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
} from 'vueless/constants.js'

import { ColorMode } from 'vueless/types'
import type { CreateVuelessOptions } from 'vueless/types'

import { useRuntimeConfig } from '#imports'
import { defineNuxtPlugin } from '#app'

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
  const config = useRuntimeConfig().public.vueless
  const vuelessOptions = { config } as never as CreateVuelessOptions

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
    const colorMode = cookies?.[COLOR_MODE_KEY] || vuelessConfig.colorMode || ColorMode.Light
    const isCachedAutoMode = Boolean(Number(cookies?.[AUTO_MODE_KEY]))

    const themeRootVariables = setTheme({ primary, neutral, text, outline, rounding, disabledOpacity, colorMode }, isCachedAutoMode)
    const colorModeClass = colorMode === ColorMode.Dark ? DARK_MODE_CLASS : LIGHT_MODE_CLASS

    _nuxtApp.ssrContext?.head.push({
      style: [{ innerHTML: themeRootVariables }],
      htmlAttrs: { class: colorModeClass },
    })
  }
})
