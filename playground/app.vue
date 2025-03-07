<template>
  <div class="p-8 grid gap-4 grid-cols-12 grid-rows-4">
    <div class="grid gap-4 col-span-3 row-span-2">
      <PaymentCard />
      <ActivityTracker />
    </div>
    <div class="grid gap-4 col-span-3 row-span-2">
      <SignupForm class="row-span-3" />
      <RoleCard />
    </div>
    <ClientsTable />
    <div class="grid grid-cols-6 col-span-6 gap-4 gap-x-12">
      <UCalendar
        v-model="selectedDate"
        class="col-span-2"
      />
      <CookieSettings class="col-span-4" />
    </div>
  </div>

  <UCol
    gap="xl"
    class="p-16"
  >
    <UThemeColorToggle
      :brand-colors="brandColors"
      :gray-colors="grayColors"
    />

    <UAlert
      class="mb-8"
      color="brand"
      close-icon
      bordered
      variant="thirdary"
    >
      <UText>
        Alert message text

        <ULink
          size="md"
          label="this blog post"
          href="https://github.blog/2023-03-09-raising-the-bar-for-software-security-github-2fa-begins-march-13"
        />.
      </UText>
    </UAlert>

    <UCol>
      <UGroup title="User info">
        <URow>
          <UCard>
            <UCol
              size="lg"
              class="w-full"
            >
              <ULabel label="Name">
                <UText line>
                  Jonnny Grid
                </UText>
              </ULabel>

              <ULabel label="Email">
                <ULink
                  type="email"
                  href="i.ivan.gridnev@gmail.com"
                  label="i.ivan.gridnev@gmail.com"
                />
              </ULabel>

              <ULabel label="Contacts">
                <div class="flex -space-x-2 overflow-hidden pt-0.5">
                  <UAvatar
                    v-for="n in 3"
                    :key="n"
                    bordered
                    color="gray"
                    size="sm"
                    rounded="full"
                    :src="rows[n - 1].user.image"
                  />
                  <UAvatar
                    size="sm"
                    rounded="full"
                    label="99"
                    color="gray"
                  />
                </div>
              </ULabel>
            </UCol>
          </UCard>

          <UCard>
            <UCol>
              <UText size="sm">
                In this area you can change your password.
              </UText>

              <UInput
                placeholder="New password"
                size="sm"
                label-align="top"
              />

              <UInput
                placeholder="Confirm password"
                size="sm"
                label-align="top"
              />

              <URow class="items-center">
                <UButton
                  label="Change"
                  size="sm"
                />

                <USwitch
                  v-model="switchValue"
                  label="Enable 2FA"
                />
              </URow>
            </UCol>
          </UCard>
        </URow>
      </UGroup>

      <UGroup title="Payment details">
        <UTable
          :columns="columns"
          :rows="rows"
          selectable
          compact
        >
          <template #header-actions>
            <UButton
              size="sm"
              variant="thirdary"
              label="Delete"
              color="blue"
              class=""
            />
          </template>

          <template #cell-amount="{ value }">
            <UMoney
              size="sm"
              align="left"
              :value="value.sum"
              :symbol="value.symbol"
            />
          </template>

          <template #cell-user="{ value }">
            <div class="flex items-center space-x-2">
              <UAvatar
                size="sm"
                rounded="full"
                :src="value.image"
              />
              <ULink
                class="mb-0"
                target-blank
                size="md"
                color="grayscale"
                :href="value.profile"
                :label="value.nickname"
              />
            </div>
          </template>

          <template #cell-status="{ value }">
            <UBadge
              :label="value.label"
              :color="value.color"
              variant="thirdary"
            />
          </template>

          <template #cell-tools>
            <div class="flex">
              <UButton
                square
                size="sm"
                variant="thirdary"
              >
                <UIcon
                  name="edit"
                  color="gray"
                  size="xs"
                />
              </UButton>

              <UButton
                square
                size="sm"
                variant="thirdary"
                color="red"
                @click="onClickDelete"
              >
                <UIcon
                  name="delete"
                  color="red"
                  size="xs"
                />
              </UButton>
            </div>
          </template>
        </UTable>

        <UPagination
          v-model="currentPage"
          class="mt-4 flex justify-center"
          :total="90"
          size="sm"
        />
      </UGroup>
    </UCol>

    <UModalConfirm
      v-model="isShownDeleteModal"
      title="Delete payment"
      confirm-label="Delete"
      color="red"
    >
      <UText>Are you 100% sure to delete this payment?</UText>
    </UModalConfirm>

    <UHeader label="Vueless UI is ready!" />

    <UIcon name="heart_plus" />

    <UButton
      label="Button"
      left-icon="timer"
      @click="test"
    />

    <UCheckbox />

    <UCheckboxMultiState />

    <USelect label="USelect" />

    <UInput
      label="Input"
    />

    <UCalendar v-model="selectedDate" />

    <USwitch
      v-model="selectedSwitch"
      size="lg"
    />
  </UCol>
</template>

<script setup>
import { ref } from 'vue'
import { setTheme, getRandomId } from 'vueless'

const now = new Date()
const selectedDate = ref(now)

const selectedSwitch = ref(true)
const selectedColor = ref('')

watch(selectedColor, (newValue) => {
  if (newValue !== '') {
    console.log('setTheme', newValue)
    setTheme({ brand: newValue })
  }
})

const brandColors = {
  grayscale: 'bg-gray-900',
  red: 'bg-red-600',
  orange: 'bg-orange-600',
  amber: 'bg-amber-600',
  yellow: 'bg-yellow-600',
  lime: 'bg-lime-600',
  green: 'bg-green-600',
  emerald: 'bg-emerald-600',
  teal: 'bg-teal-600',
  cyan: 'bg-cyan-600',
  sky: 'bg-sky-600',
  blue: 'bg-blue-600',
  indigo: 'bg-indigo-600',
  violet: 'bg-violet-600',
  purple: 'bg-purple-600',
  fuchsia: 'bg-fuchsia-600',
  pink: 'bg-pink-600',
  rose: 'bg-rose-600',
}

const grayColors = {
  slate: 'bg-slate-600',
  cool: 'bg-cool-600',
  zinc: 'bg-zinc-600',
  neutral: 'bg-neutral-600',
  stone: 'bg-stone-600',
}

function test() {
  console.log('setTheme')
  setTheme({ brand: 'red' })
}

const currentPage = ref(1)
const switchValue = ref(false)
const isShownDeleteModal = ref(false)

function onClickDelete() {
  isShownDeleteModal.value = true
}

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'user', label: 'User' },
  { key: 'status', label: 'Status' },
  { key: 'tools', label: 'Tools' },
]

const rows = [
  {
    id: getRandomId(),
    date: '28.02.2024',
    amount: {
      sum: 46.99,
      symbol: '$',
    },
    user: {
      nickname: 'Johnny Grid',
      image: 'https://gitlab.com/uploads/-/system/user/avatar/4469990/avatar.png?width=192',
      profile: 'https://gitlab.com/JohnnyGrid',
    },
    status: {
      label: 'payed',
      color: 'green',
    },
    tools: '',
  },
  {
    id: getRandomId(),
    date: '28.02.2024',
    amount: {
      sum: 103.45,
      symbol: '$',
    },
    user: {
      nickname: 'Adam Gordon',
      image: 'https://gitlab.com/uploads/-/system/user/avatar/4469990/avatar.png?width=192',
      profile: 'https://gitlab.com/JohnnyGrid',
    },
    status: {
      label: 'pending',
      color: 'yellow',
    },
    tools: '',
  },
  {
    id: getRandomId(),
    date: '28.02.2024',
    amount: {
      sum: 30.45,
      symbol: '$',
    },
    user: {
      nickname: 'Leslie Nielsen',
      image: 'https://gitlab.com/uploads/-/system/user/avatar/4469990/avatar.png?width=192',
      profile: 'https://gitlab.com/JohnnyGrid',
    },
    status: {
      label: 'overdue',
      color: 'red',
    },
    tools: '',
  },
]
</script>
