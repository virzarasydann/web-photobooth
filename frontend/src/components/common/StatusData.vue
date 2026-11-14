<script setup>
// Tampilan untuk keadaan data: gagal dan kosong.
// (Keadaan memuat memakai komponen Skeleton)
defineProps(['error', 'kosong'])
defineEmits(['ulangi'])
</script>

<template>
  <div v-if="error" role="alert" class="py-16 text-center">
    <p
      class="mb-4 text-[0.95rem] font-semibold text-[#7E3300]"
    >
      {{ error }}
    </p>
    <button
      type="button"
      class="cursor-pointer rounded-full bg-[#2D5141] px-5 py-2 text-[0.85rem] font-semibold text-white hover:bg-[#153A2B]"
      @click="$emit('ulangi')"
    >
      Coba lagi
    </button>
  </div>

  <div
    v-else-if="kosong"
    class="py-16 text-center text-[0.95rem] font-semibold text-[#4D534F]"
  >
    Data belum tersedia.
  </div>
</template>
