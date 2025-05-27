<template>
  <UCard
    title="Set Goal"
    description="Define your daily calorie target."
    class="flex flex-col"
  >
    <UCol class="h-full justify-between">
      <UInputCounter
        v-model="count"
        :step="10"
        :max="5000"
        :min="500"
        label-align="top"
        description="Calories per day"
        size="lg"
        :config="counterConfig"
        class="w-full justify-between"
      />
      <UButton
        label="Set goal"
        block
        variant="subtle"
      />
    </UCol>
  </UCard>
</template>

<script setup>
const counterConfig = {
  label: {
    description: 'text-center',
    content: 'justify-around',
  },
  counterInput: 'w-full',
}

const count = ref(1200)
</script>
