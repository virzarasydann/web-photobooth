<template>
    <div class="flex w-full min-w-0 flex-col gap-3 md:flex-row md:items-center ">
      <div class="flex min-h-11 min-w-0 w-full md:w-1/3 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5 shrink-0 text-gray-500" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        <label for="role-search" class="sr-only">Cari role</label>
        <input
          id="role-search"
          v-model="search"
          type="text"
          :placeholder="placeholder"
          class="w-full min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-[#2F523E] focus-visible:ring-offset-1"
        />
      </div>
  
      <div class="flex min-h-11 items-center gap-2  px-2">
        <label for="role-status" class="shrink-0 text-sm font-semibold text-gray-500">{{ statusLabel }}:</label>
        <select
          id="role-status"
          v-model="status"
          class="min-h-[44px] cursor-pointer rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm outline-none hover:border-gray-300 focus-visible:ring-2 focus-visible:ring-[#2F523E] focus-visible:ring-offset-1"
        >
          <option :value="allLabel">{{ allLabel }}</option>
          <option v-for="option in statusOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
  </template>
  
  <script setup>
  const search = defineModel('search', { default: '' })
  const status = defineModel('status', { default: 'Semua status' })
  
  defineProps({
    placeholder: { type: String, default: 'Cari role...' },
    statusLabel: { type: String, default: 'STATUS' },
    allLabel: { type: String, default: 'Semua status' },
    statusOptions: { type: Array, default: () => [] },
  })
  </script>