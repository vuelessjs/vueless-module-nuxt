<template>
  <div class="max-w-screen-2xl xl:grid xl:grid-cols-2 xl:gap-4 mt-10 px-6 mx-auto">
    <div class="grid gap-4 grid-cols-2 xl:grid-cols-2 max-xl:mb-4">
      <div class="grid gap-4 col-span-1">
        <PaymentCard />
        <ActivityTracker />
      </div>
      <div class="grid gap-4 col-span-1">
        <SignupForm />
        <RoleCard />
      </div>
    </div>

    <div class="grid grid-cols-4 xl:grid-cols-2 gap-4">
      <div class="col-span-4 xl:col-span-2">
        <ClientsTable />
      </div>
      <div class="col-span-4 xl:col-span-2">
        <UAlert
          title="Scheduled Maintenance Notice"
          description="
              Our website will be undergoing scheduled maintenance on March 15th from 2:00 AM to 4:00 AM UTC.
              Some features may be temporarily unavailable during this time. We appreciate your patience!
            "
          variant="outlined"
          bordered
          closable
        />
      </div>
      <div class="col-span-2 xl:col-span-1">
        <UCalendar
          v-model="selectedDate"
          class="w-auto h-full shadow-none border-muted"
          range
        />
      </div>
      <div class="col-span-2 xl:col-span-1">
        <CookieSettings />
      </div>
    </div>
  </div>

  <URow
    justify="center"
    gap="xl"
    class="p-16"
  >
    <UThemeColorToggle
      v-model:primary="primary"
      v-model:neutral="neutral"
      :primary-colors="primaryColors"
      :neutral-colors="neutralColors"
    />

    <URow
      gap="none"
      class="flex"
    >
      <UButton
        size="lg"
        icon="light_mode"
        :variant="switcherVariant.light"
        :config="buttonConfig"
        class="pr-4 rounded-l-full rounded-r-none"
        @click="setTheme({ colorMode: 'light' })"
      />
      <UButton
        size="lg"
        icon="dark_mode"
        :variant="switcherVariant.dark"
        :config="buttonConfig"
        class="pl-4 rounded-l-none rounded-r-full"
        @click="setTheme({ colorMode: 'dark' })"
      />
    </URow>
  </URow>

  <UButton
    label="toggle language"
    @click="toggleLocale"
  />
</template>

<script setup>
import { ref } from 'vue'
import { setTheme } from 'vueless'
import { COLOR_MODE_KEY } from 'vueless/constants'

const colorModeCookie = useCookie(COLOR_MODE_KEY)

const buttonConfig = {
  centerIcon: {
    defaults: {
      size: {
        lg: 'lg',
      },
    },
  },
}

const selectedDate = ref({
  from: new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
  to: new Date(new Date().setDate(new Date().getDate() + (6 - new Date().getDay()))),
})

const { setLocale, locale } = useI18n()

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'ua' : 'en').then(() => window.location.reload())
}

const primary = ref('')
const neutral = ref('')

const primaryColors = {
  grayscale: 'bg-grayscale',
  red: 'bg-red-600 dark:bg-red-400',
  orange: 'bg-orange-600 dark:bg-orange-400',
  amber: 'bg-amber-600 dark:bg-amber-400',
  yellow: 'bg-yellow-600 dark:bg-yellow-400',
  lime: 'bg-lime-600 dark:bg-lime-400',
  green: 'bg-green-600 dark:bg-green-400',
  emerald: 'bg-emerald-600 dark:bg-emerald-400',
  teal: 'bg-teal-600 dark:bg-teal-400',
  cyan: 'bg-cyan-600 dark:bg-cyan-400',
  sky: 'bg-sky-600 dark:bg-sky-400',
  blue: 'bg-blue-600 dark:bg-blue-400',
  indigo: 'bg-indigo-600 dark:bg-indigo-400',
  violet: 'bg-violet-600 dark:bg-violet-400',
  purple: 'bg-purple-600 dark:bg-purple-400',
  fuchsia: 'bg-fuchsia-600 dark:bg-fuchsia-400',
  pink: 'bg-pink-600 dark:bg-pink-400',
  rose: 'bg-rose-600 dark:bg-rose-400',
}
const neutralColors = {
  slate: 'bg-slate-600 dark:bg-slate-400',
  gray: 'bg-gray-600 dark:bg-gray-400',
  zinc: 'bg-zinc-600 dark:bg-zinc-400',
  neutral: 'bg-neutral-600 dark:bg-neutral-400',
  stone: 'bg-stone-600 dark:bg-stone-400',
}

const switcherVariant = computed(() => ({
  light: colorModeCookie.value === 'light' ? 'solid' : 'outlined',
  dark: colorModeCookie.value === 'dark' ? 'solid' : 'outlined',
}))

watch(primary, (newValue) => {
  if (newValue !== '') {
    setTheme({ primary: newValue })
  }
})

watch(neutral, (newValue) => {
  if (newValue !== '') {
    setTheme({ neutral: newValue })
  }
})
</script>
