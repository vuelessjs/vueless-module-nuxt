<template>
  <UCard
    title="Payment Options"
    description="Add a new payment method to your account."
    class="flex flex-col"
  >
    <UCol class="h-full justify-between">
      <UToggle
        v-model="selectedPaymentOption"
        name="paymentOptions"
        :options="paymentOptions"
        block
        split
        :config="toggleItemConfig"
      >
        <template #option="{ option }">
          <UIcon
            :name="option.iconName"
            color="inherit"
          />
          {{ option.label }}
        </template>
      </UToggle>

      <UCol
        gap="sm"
        class="w-full"
      >
        <UInput
          label="Name"
          placeholder="John Doe"
        />
        <UInput
          label="City"
          placeholder="New York"
        />
        <UInput
          label="Card Number"
          validation-rule="integer"
        />
      </UCol>

      <URow
        align="end"
        gap="sm"
        class="grid grid-cols-3"
      >
        <USelect
          v-model="selectedMonth"
          label="Expiration date"
          :options="months"
          :clearable="false"
          placeholder="Month"
          label-align="top"
          :config="{ innerWrapper: 'pr-0', toggleWrapper: 'mr-2' }"
        />
        <USelect
          v-model="selectedYear"
          :options="years"
          :clearable="false"
          placeholder="Year"
          label-align="top"
          validation-rule="integer"
          max-length="4"
          :config="{ innerWrapper: 'pr-0', toggleWrapper: 'mr-2' }"
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
    </UCol>
  </UCard>
</template>

<script setup>
const toggleItemConfig = /* tw */ {
  toggleButton: {
    base: 'flex-col',
    defaults: {
      variant: 'outlined',
    },
  },
}

const months = [
  { label: '01', id: '1' },
  { label: '02', id: '2' },
  { label: '03', id: '3' },
  { label: '04', id: '4' },
  { label: '05', id: '5' },
  { label: '06', id: '6' },
  { label: '07', id: '7' },
  { label: '08', id: '8' },
  { label: '09', id: '9' },
  { label: '10', id: '10' },
  { label: '11', id: '11' },
  { label: '12', id: '12' },
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
