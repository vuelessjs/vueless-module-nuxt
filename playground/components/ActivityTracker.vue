<template>
  <UCard
    title="Set Goal"
    description="Define your daily activity target."
    class="!h-full"
  >
    <UCol>
      <UInputNumber
        v-model="count"
        :step="10"
        label-align="top"
        description="Calories per day"
        size="lg"
        :config="{ label: { description: 'text-center', content: 'justify-around' } }"
      />
      <UButton
        label="Set goal"
        block
      />
    </UCol>
  </UCard>
</template>

<script setup>
const count = ref(450)
</script>
