<template>
  <UCard
    title="Team Collaboration"
    description="Invite your team members to work together seamlessly."
    class="flex flex-col"
  >
    <UCol
      justify="between"
      class="h-full"
    >
      <URow
        v-for="member in teamMembers"
        :key="member.email"
        justify="between"
        block
        align="center"
      >
        <URow
          align="center"
          gap="sm"
        >
          <UAvatar
            :src="member.src"
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
        </URow>
        <UDropdownButton
          v-model="member.role"
          label="Select a role"
          :options="rolesOptions"
          variant="soft"
          size="xs"
        />
      </URow>
    </UCol>
  </UCard>
</template>

<script setup>
import JohnDoe from '~/assets/images/john-doe.png'
import EmilyDavis from '~/assets/images/emily-davis.png'
import ChrisLee from '~/assets/images/chris-lee.png'

const rolesOptions = ref([
  { label: 'Owner', id: 'owner' },
  { label: 'Admin', id: 'admin' },
  { label: 'Developer', id: 'developer' },
  { label: 'Viewer', id: 'viewer' },
  { label: 'Editor', id: 'editor' },
  { label: 'Support', id: 'support' },
])

const teamMembers = ref([
  {
    name: 'John Doe',
    email: 'j@example.com',
    src: JohnDoe,
    role: '',
  },
  {
    name: 'Emily Davis',
    email: 'e@example.com',
    src: EmilyDavis,
    role: '',
  },
  {
    name: 'Chris Lee',
    email: 'c@example.com',
    src: ChrisLee,
    role: '',
  },
])
</script>
