<template>
  <UCard
    title="Cookie Preferences"
    description="Customize your cookie settings to enhance your browsing experience."
  >
    <UCol>
      <URow
        v-for="(cookie, index) in cookieSettings"
        :key="cookie.label"
        justify="between"
        align="center"
      >
        <UCol gap="2xs">
          <UHeader
            :label="cookie.label"
            class="text-sm"
          />
          <UText
            :html="cookie.description"
            size="sm"
          />
        </UCol>
        <USwitch v-model="cookieValues[index]" />
      </URow>

      <UButton
        label="Save preferences"
        variant="secondary"
        block
      />
    </UCol>
  </UCard>
</template>

<script setup>
const cookieSettings = ref([
  {
    label: "Strictly Necessary",
    description: "Essential cookies required for core website functionality."
  },
  {
    label: "Functional Cookies",
    description: "Enable personalized features and enhance usability."
  },
  {
    label: "Performance Cookies",
    description: "Help us analyze and optimize website performance."
  }
])

const cookieValues = ref([true, false, false])
</script>
