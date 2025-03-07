<template>
  <UGroup
    title="Payment details"
    class="col-span-6 max-h-fit"
  >
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

  <UModalConfirm
    v-model="isShownDeleteModal"
    title="Delete payment"
    confirm-label="Delete"
    color="red"
  >
    <UText>Are you 100% sure to delete this payment?</UText>
  </UModalConfirm>
</template>

<script setup>
import { getRandomId } from 'vueless'

const columns = [
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
  { key: 'user', label: 'User' },
  { key: 'status', label: 'Status' },
  { key: 'tools', label: 'Tools' },
]

const rows = computed(() => {
  return currentPage.value === 1
    ? [
        {
          id: getRandomId(),
          date: '28.02.2024',
          amount: {
            sum: 46.99,
            symbol: '$',
          },
          user: {
            nickname: 'John Doe',
            image: 'https://avatar.iran.liara.run/public/45',
            profile: 'https://gitlab.com/JohnnyGrid',
          },
          status: {
            label: 'Payment Completed',
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
            image: 'https://avatar.iran.liara.run/public/41',
            profile: 'https://gitlab.com/JohnnyGrid',
          },
          status: {
            label: 'Awaiting Confirmation',
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
            image: 'https://avatar.iran.liara.run/public/33',
            profile: 'https://gitlab.com/JohnnyGrid',
          },
          status: {
            label: 'Payment Failed',
            color: 'red',
          },
          tools: '',
        },
      ]
    : []
})

const currentPage = ref(1)
const isShownDeleteModal = ref(false)

function onClickDelete() {
  isShownDeleteModal.value = true
}
</script>
