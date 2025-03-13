<template>
  <UCard
    title="Team Collaboration"
    description="Invite your team members to work together seamlessly."
  >
    <UCol>
      <URow
        v-for="member in teamMembers"
        :key="member.email"
        justify="between"
        align="center"
        gap="2xs"
      >
        <UAvatar
          :src="member.avatar"
          rounded="full"
        />
        <UCol gap="2xs">
          <UHeader
            :label="member.name"
            class="text-sm"
          />
          <UText
            :html="member.email"
            size="sm"
          />
        </UCol>
        <UDropdownButton
          label="Select a role"
          :options="rolesOptions"
          variant="thirdary"
          size="sm"
        />
      </URow>
    </UCol>
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

const teamMembers = ref([
  {
    name: 'Ryan Black',
    email: 'r@example.com',
    avatar: 'https://avatar.iran.liara.run/public/41',
  },
  {
    name: 'Emily Caldwell',
    email: 'e@example.com',
    avatar: 'https://avatar.iran.liara.run/public/78',
  },
  {
    name: 'John Doe',
    email: 'j@example.com',
    avatar: 'https://avatar.iran.liara.run/public/35',
  },
])
</script>
