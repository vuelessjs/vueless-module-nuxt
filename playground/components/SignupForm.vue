<template>
  <UCard
    title="Sign Up"
    description="Enter your email below to get started and create your account."
  >
    <UCol>
      <URow
        align="center"
        justify="between"
      >
        <UButton
          label="GitHub"
          variant="secondary"
          block
          class="!leading-none"
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
          class="!leading-none"
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

      <UCol
        gap="sm"
        class="w-full"
      >
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
      </UCol>

      <UCheckbox label="Remember me" />

      <UButton
        label="Create account"
        block
      />
    </UCol>
  </UCard>
</template>

<script setup>
import GithubLogo from '~/assets/svg/github-logo.svg?component'
import GoogleLogo from '~/assets/svg/google-logo.svg?component'

const password = ref('')
</script>
