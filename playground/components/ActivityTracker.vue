<template>
  <UCard
    title="Set Goal"
    description="Define your daily activity target."
    class="flex flex-col"
  >
    <UCol
      justify="between"
      class="h-full"
    >
      <ULabel
        description="Calories per day"
        :config="{ description: 'text-center !text-medium' }"
      >
        <UInputCounter
          v-model="count"
          :step="10"
          :max="5000"
          :min="500"
          label-align="top"
          description="Calories per day"
          size="lg"
          readonly
          :config="counterConfig"
          class="w-full justify-around"
        />
      </ULabel>
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
