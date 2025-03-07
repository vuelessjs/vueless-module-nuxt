<template>
  <UCard
    title="Sign Up"
    description="Enter your email below to get started and create your account."
    :config="{ content: 'flex flex-col gap-4' }"
  >
    <URow
      align="center"
      justify="between"
    >
      <UButton
        label="GitHub"
        variant="secondary"
        block
      >
        <template #left>
          <UIcon
            :src="GithubLogo"
            color="inherit"
          />
        </template>
      </UButton>

      <UButton
        label="Google"
        variant="secondary"
        block
      >
        <template #left>
          <UIcon
            :src="GoogleLogo"
            color="inherit"
          />
        </template>
      </UButton>
    </URow>

    <UDivider label="OR CONTINUE WITH" />

    <UGroup :config="{ content: 'flex flex-col gap-2' }">
      <UInput
        label="Email"
        placeholder="johndoe@example.com"
        type="email"
      />
      <UInput
        v-model="password"
        label="Password"
        type="password"
      />
    </UGroup>

    <UButton
      label="Create account"
      block
    />
  </UCard>
</template>

<script setup>
import GithubLogo from '../assets/svg/github-logo.svg?component'
import GoogleLogo from '../assets/svg/google-logo.svg?component'

const password = ref('')
</script>
