<template>
  <UCard
    title="Payment Options"
    description="Add a new payment method to your account."
    :config="{ content: 'flex flex-col gap-4' }"
  >
    <URow>
      <UToggle
        v-model="selectedPaymentOption"
        name="paymentOptions"
        :options="paymentOptions"
        block
        split
        :config="toggleItemConfig"
      >
        <template #left="{ option }">
          <UIcon
            :name="option.iconName"
            color="inherit"
          />
        </template>
      </UToggle>
    </URow>

    <UGroup :config="{ content: 'flex flex-col gap-2' }">
      <UInput
        label="Name"
        placeholder="John Doe"
        validation-rule="string"
      />
      <UInput
        label="City"
        placeholder="New York"
        validation-rule="string"
      />
      <UInput
        label="Card Number"
        type="number"
        validation-rule="integer"
        max-length="16"
      />
    </UGroup>

    <URow align="end">
      <USelect
        v-model="selectedMonth"
        label="Expiration date"
        :options="months"
        placeholder="Month"
        label-align="top"
      />
      <USelect
        v-model="selectedYear"
        :options="years"
        placeholder="Year"
        label-align="top"
        validation-rule="integer"
        max-length="4"
      />
      <UInput
        label="CVC"
        placeholder="000"
        label-align="top"
        validation-rule="integer"
        max-length="3"
      />
    </URow>

    <UButton
      label="Continue"
      block
    />
  </UCard>
</template>

<script setup>
const toggleItemConfig = /* tw */ {
  toggleButton: {
    base: 'flex-col',
    defaults: {
      variant: 'secondary',
    },
  },
}

const months = [
  { label: 'January', id: '1' },
  { label: 'February', id: '2' },
  { label: 'March', id: '3' },
  { label: 'April', id: '4' },
  { label: 'May', id: '5' },
  { label: 'June', id: '6' },
  { label: 'July', id: '7' },
  { label: 'August', id: '8' },
  { label: 'September', id: '9' },
  { label: 'October', id: '10' },
  { label: 'November', id: '11' },
  { label: 'December', id: '12' },
]

const years = [
  { label: '2025', id: '2025' },
  { label: '2026', id: '2026' },
  { label: '2027', id: '2027' },
  { label: '2028', id: '2028' },
  { label: '2029', id: '2029' },
  { label: '2030', id: '2030' },
  { label: '2031', id: '2031' },
  { label: '2032', id: '2032' },
  { label: '2033', id: '2033' },
  { label: '2034', id: '2034' },
]
const paymentOptions = ref([
  { iconName: 'credit_card', label: 'Card', value: '1' },
  { iconName: 'account_balance', label: 'Transfer', value: '2' },
  { iconName: 'payments', label: 'Cash', value: '3' },
])

const selectedPaymentOption = ref(paymentOptions.value[0].value)
const selectedMonth = ref(null)
const selectedYear = ref(null)
</script>
