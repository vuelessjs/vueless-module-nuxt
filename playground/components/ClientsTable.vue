<template>
  <UGroup>
    <UTable
      :columns="columns"
      :rows="rows"
      selectable
      compact
    >
      <template #header-actions>
        <URow gap="2xs">
          <UButton
            label="Edit"
            variant="ghost"
            size="sm"
          />

          <UButton
            label="Delete"
            variant="ghost"
            size="sm"
          />
        </URow>
      </template>

      <template #cell-amount="{ value }">
        <UNumber
          align="left"
          :value="value.sum"
          :currency="value.currency"
        />
      </template>

      <template #cell-user="{ value }">
        <URow align="center">
          <UAvatar
            :src="value.src"
            size="sm"
            rounded="full"
          />
          <ULink
            class="mb-0"
            target-blank
            size="md"
            color="grayscale"
            :label="value.nickname"
          />
        </URow>
      </template>

      <template #cell-status="{ value }">
        <UBadge
          :label="value.label"
          :color="value.color"
          variant="soft"
        />
      </template>

      <template #cell-tools>
        <URow>
          <UButton
            square
            size="sm"
            variant="ghost"
          >
            <UIcon
              name="edit"
              size="xs"
            />
          </UButton>

          <UButton
            square
            size="sm"
            variant="ghost"
            color="error"
            @click="onClickDelete"
          >
            <UIcon
              name="delete"
              color="error"
              size="xs"
            />
          </UButton>
        </URow>
      </template>
    </UTable>

    <UPagination
      v-model="currentPage"
      class="mt-4 flex justify-center"
      :total="90"
      show-first
      show-last
      size="sm"
      @change="onPageChange"
    />
  </UGroup>

  <UModalConfirm
    v-model="isShownDeleteModal"
    title="Confirm Payment Deletion"
    confirm-label="Delete Payment"
    color="red"
  >
    <UText>This action cannot be undone. Are you sure you want to permanently delete this payment?</UText>
  </UModalConfirm>
</template>

<script setup>
import { getRandomId } from 'vueless'

import JohnDoe from '~/assets/images/john-doe.png'
import AlexJohnson from '~/assets/images/alex-johnson.png'
import EmilyDavis from '~/assets/images/emily-davis.png'
import PatMorgan from '~/assets/images/pat-morgan.png'
import ChrisLee from '~/assets/images/chris-lee.png'
import TaylorBrown from '~/assets/images/taylor-brown.png'
import JamieWilson from '~/assets/images/jamie-wilson.png'
import JordanWhite from '~/assets/images/jordan-white.png'

const currentPage = ref(1)
const isShownDeleteModal = ref(false)

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'user', label: 'User' },
  { key: 'status', label: 'Status' },
  { key: 'tools', label: 'Tools' },
]

const rows = ref([])

onMounted(() => {
  rows.value = generateRandomTableData()
})

function onClickDelete() {
  isShownDeleteModal.value = true
}

function generateRandomTableData() {
  const users = [
    { nickname: 'John Doe', src: JohnDoe },
    { nickname: 'Alex Johnson', src: AlexJohnson },
    { nickname: 'Emily Davis', src: EmilyDavis },
    { nickname: 'Pat Morgan', src: PatMorgan },
    { nickname: 'Chris Lee', src: ChrisLee },
    { nickname: 'Taylor Brown', src: TaylorBrown },
    { nickname: 'Jamie Wilson', src: JamieWilson },
    { nickname: 'Jordan White', src: JordanWhite },
  ]

  const statuses = [
    { label: 'Completed', color: 'success' },
    { label: 'Awaiting', color: 'warning' },
    { label: 'Failed', color: 'error' },
    { label: 'Processing', color: 'info' },
    { label: 'Pending', color: 'notice' },
  ]

  const generateDate = () => {
    const day = Math.floor(Math.random() * 28) + 1

    return `${day.toString().padStart(2, '0')}.02.2024`
  }

  const generateAmount = () => {
    return {
      sum: Number.parseFloat((Math.random() * 190 + 10).toFixed(2)),
      currency: '$',
    }
  }

  return Array(3).fill(null).map(() => {
    const randomUserIndex = Math.floor(Math.random() * users.length)
    const randomStatusIndex = Math.floor(Math.random() * statuses.length)

    return {
      id: getRandomId(),
      date: generateDate(),
      amount: generateAmount(),
      user: users[randomUserIndex],
      status: statuses[randomStatusIndex],
      tools: '',
    }
  })
}

function onPageChange(newPage) {
  currentPage.value = newPage
}
</script>
