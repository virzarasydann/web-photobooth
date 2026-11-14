<script setup>
// daftar: nama-nama kategori paket (dari JSON)
defineProps(['daftar'])
</script>

<template>
  <div class="mt-8 flex justify-center">
    <div
      class="inline-flex flex-wrap justify-center gap-1 rounded-full border border-[#dce8e2] bg-white p-1.5"
    >
      <button
        v-for="kategori in daftar"
        :key="kategori"
        type="button"
        class="cursor-pointer rounded-full bg-[#F3FAF6] px-5 py-2.5 text-[0.85rem] font-medium"
      >
        {{ kategori }}
      </button>
    </div>
  </div>
</template>
