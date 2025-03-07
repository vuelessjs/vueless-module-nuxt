<template>
  <UCard
    title="Team Collaboration"
    description="Invite your team members to work together seamlessly."
    :config="{ content: 'flex flex-col gap-4' }"
  >
    <URow
      justify="between"
      align="center"
    >
      <UAvatar
        src="https://avatar.iran.liara.run/public/41"
        rounded="full"
      />
      <UCol gap="2xs">
        <UHeader
          label="Ryan Black"
          class="text-sm"
        />
        <UText
          html="ryan@example.com"
          size="sm"
        />
      </UCol>
      <UDropdownButton
        label="Select a role"
        :options="rolesOptions"
        variant="thirdary"
        :clearable="false"
      />
    </URow>

    <URow
      justify="between"
      align="center"
    >
      <UAvatar
        src="https://avatar.iran.liara.run/public/78"
        rounded="full"
      />
      <UCol gap="2xs">
        <UHeader
          label="Emily Caldwell"
          class="text-sm"
        />
        <UText
          html="emily@example.com"
          size="sm"
        />
      </UCol>
      <UDropdownButton
        label="Select a role"
        :options="rolesOptions"
        variant="thirdary"
        :clearable="false"
      />
    </URow>

    <URow
      justify="between"
      align="center"
    >
      <UAvatar
        src="https://avatar.iran.liara.run/public/35"
        rounded="full"
      />
      <UCol gap="2xs">
        <UHeader
          label="John Doe"
          class="text-sm"
        />
        <UText
          html="john@example.com"
          size="sm"
        />
      </UCol>
      <UDropdownButton
        label="Select a role"
        :options="rolesOptions"
        variant="thirdary"
        :clearable="false"
      />
    </URow>
  </UCard>
</template>

<script setup>
const rolesOptions = ref([
  { label: 'Owner' },
  { label: 'Admin' },
  { label: 'Developer' },
  { label: 'Viewer' },
  { label: 'Editor' },
  { label: 'Support' },
])
</script>
