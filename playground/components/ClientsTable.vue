<template>
  <UGroup class="col-span-2">
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
            variant="thirdary"
            color="brand"
            size="sm"
          />

          <UButton
            label="Delete"
            variant="thirdary"
            color="brand"
            size="sm"
          />
        </URow>
      </template>

      <template #cell-amount="{ value }">
        <UMoney
          align="left"
          :value="value.sum"
          :symbol="value.symbol"
        />
      </template>

      <template #cell-user="{ value }">
        <URow>
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
            :label="value.nickname"
          />
        </URow>
      </template>

      <template #cell-status="{ value }">
        <UBadge
          :label="value.label"
          :color="value.color"
          variant="thirdary"
        />
      </template>

      <template #cell-tools>
        <URow>
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
import { getRandomId } from "vueless"

const currentPage = ref(1)
const isShownDeleteModal = ref(false)

const columns = [
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "user", label: "User" },
  { key: "status", label: "Status" },
  { key: "tools", label: "Tools" },
]

const rows = computed(() => {
  return generateRandomTableData(currentPage.value);
});

function onClickDelete() {
  isShownDeleteModal.value = true
}

function generateRandomTableData() {
  const users = [
    { nickname: "John Doe", image: "https://avatar.iran.liara.run/public/45" },
    { nickname: "Adam Gordon", image: "https://avatar.iran.liara.run/public/41" },
    { nickname: "Leslie Nielsen", image: "https://avatar.iran.liara.run/public/33" },
    { nickname: "Sarah Johnson", image: "https://avatar.iran.liara.run/public/25" },
    { nickname: "Mike Chen", image: "https://avatar.iran.liara.run/public/28" },
    { nickname: "Emma Watson", image: "https://avatar.iran.liara.run/public/15" },
    { nickname: "David Miller", image: "https://avatar.iran.liara.run/public/22" },
    { nickname: "Alex Rodriguez", image: "https://avatar.iran.liara.run/public/19" }
  ];

  const statuses = [
    { label: "Completed", color: "green" },
    { label: "Awaiting", color: "yellow" },
    { label: "Failed", color: "red" },
    { label: "Processing", color: "blue" },
    { label: "Pending", color: "orange" }
  ];

  const generateDate = () => {
    const day = Math.floor(Math.random() * 28) + 1;

    return `${day.toString().padStart(2, "0")}.02.2024`;
  };

  const generateAmount = () => {
    return {
      sum: parseFloat((Math.random() * 190 + 10).toFixed(2)),
      symbol: "$"
    };
  };

  return Array(3).fill(null).map(() => {
    const randomUserIndex = Math.floor(Math.random() * users.length);
    const randomStatusIndex = Math.floor(Math.random() * statuses.length);

    return {
      id: getRandomId(),
      date: generateDate(),
      amount: generateAmount(),
      user: users[randomUserIndex],
      status: statuses[randomStatusIndex],
      tools: "",
    };
  });
}

function onPageChange(newPage) {
  currentPage.value = newPage;
}
</script>
