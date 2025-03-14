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
        variant="thirdary"
        color="white"
        bordered
        closable
        class="col-span-2"
      />
      <UCalendar
        v-model="selectedDate"
        class="col-span-1 w-auto shadow-none border-gray-200"
      />
      <CookieSettings class="col-span-1" />
    </div>
  </div>

  <UCol
    gap="xl"
    class="p-16"
  >
    <UThemeColorToggle
      :primary-colors="primaryColors"
      :neutral-colors="neutralColors"
    />

    <ULabel label="Contacts">
      <div class="flex -space-x-2 overflow-hidden pt-0.5">
        <UAvatar
          v-for="n in 3"
          :key="n"
          bordered
          color="neutral"
          size="sm"
          rounded="full"
        />
        <UAvatar
          size="sm"
          rounded="full"
          label="99"
          color="neutral"
        />
      </div>
    </ULabel>
  </UCol>
</template>

<script setup>
import { ref } from 'vue'
import { setTheme } from 'vueless'

const now = new Date()
const selectedDate = ref(now)
const selectedColor = ref('')

watch(selectedColor, (newValue) => {
  if (newValue !== '') {
    console.log('setTheme', newValue)
    setTheme({ brand: newValue })
  }
})

const primaryColors = {
  grayscale: 'bg-gray-900',
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
  gray: 'bg-cool-600',
  zinc: 'bg-zinc-600',
  neutral: 'bg-neutral-600',
  stone: 'bg-stone-600',
}
</script>
