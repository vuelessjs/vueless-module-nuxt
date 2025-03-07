<template>
  <UCard
    title="Cookie Preferences"
    description="Customize your cookie settings to enhance your browsing experience."
    :config="{ wrapper: 'flex flex-col', content: 'h-full flex flex-col justify-between gap-4' }"
  >
    <UGroup :config="{ content: 'flex flex-col gap-4' }">
      <URow
        justify="between"
        align="center"
      >
        <UCol gap="2xs">
          <UHeader
            label="Strictly Necessary"
            class="text-sm"
          />
          <UText
            html="Essential cookies required for core website functionality."
            size="sm"
          />
        </UCol>
        <USwitch v-model="cookiesFirst" />
      </URow>

      <URow
        justify="between"
        align="center"
      >
        <UCol gap="2xs">
          <UHeader
            label="Functional Cookies"
            class="text-sm"
          />
          <UText
            html="Enable personalized features and enhance usability."
            size="sm"
          />
        </UCol>
        <USwitch v-model="cookiesSecond" />
      </URow>

      <URow
        justify="between"
        align="center"
      >
        <UCol gap="2xs">
          <UHeader
            label="Performance Cookies"
            class="text-sm"
          />
          <UText
            html="Help us analyze and optimize website performance."
            size="sm"
          />
        </UCol>
        <USwitch v-model="cookiesThird" />
      </URow>
    </UGroup>

    <UButton
      label="Save preferences"
      variant="secondary"
      block
    />
  </UCard>
</template>

<script setup>
const cookiesFirst = ref(false)
const cookiesSecond = ref(false)
const cookiesThird = ref(false)
</script>
