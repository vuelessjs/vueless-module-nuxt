<template>
  <div class="max-w-screen-2xl grid gap-4 grid-cols-4 mt-10 mx-auto">
    <div class="grid gap-4 col-span-1">
      <PaymentCard />
      <ActivityTracker />
    </div>
    <div class="grid gap-4 col-span-1">
      <SignupForm />
      <RoleCard />
    </div>
    <div class="grid grid-cols-2 gap-4 col-span-2">
      <ClientsTable />
      <UAlert
        title="Scheduled Maintenance Notice"
        description="
            Our website will be undergoing scheduled maintenance on March 15th from 2:00 AM to 4:00 AM UTC.
            Some features may be temporarily unavailable during this time. We appreciate your patience!
          "
        variant="outlined"
        bordered
        closable
        class="col-span-2"
      />
      <UCalendar
        v-model="selectedDate"
        class="col-span-1 w-auto shadow-none border-muted"
        range
      />
      <CookieSettings class="col-span-1" />
    </div>
  </div>

  <URow
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
        label="Light"
        size="lg"
        right-icon="light_mode"
        variant="outlined"
        :config="buttonConfig"
        class="pr-4 rounded-l-full rounded-r-none"
        @click="setTheme({ colorMode: 'light' })"
      />
      <UButton
        label="Dark"
        size="lg"
        right-icon="dark_mode"
        :config="buttonConfig"
        class="pl-4 rounded-l-none rounded-r-full"
        @click="setTheme({ colorMode: 'dark' })"
      />
    </URow>
  </URow>
</template>

<script setup>
import { ref } from 'vue'
import { setTheme } from 'vueless'

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

const primary = ref('')
const neutral = ref('')

const primaryColors = {
  grayscale: 'bg-grayscale',
  red: 'bg-red-600',
  orange: 'bg-orange-600',
  amber: 'bg-amber-600',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-600',
  green: 'bg-green-600',
  emerald: 'bg-emerald-600',
  teal: 'bg-teal-600',
  cyan: 'bg-cyan-600',
  sky: 'bg-sky-600',
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  violet: 'bg-violet-600',
  purple: 'bg-purple-600',
  fuchsia: 'bg-fuchsia-600',
  pink: 'bg-pink-600',
  rose: 'bg-rose-600',
}
const neutralColors = {
  slate: 'bg-slate-600',
  gray: 'bg-gray-600',
  zinc: 'bg-zinc-600',
  neutral: 'bg-neutral-600',
  stone: 'bg-stone-600',
}

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
