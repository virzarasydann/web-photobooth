<script setup>
// Bingkai kartu yang dipakai semua bagian Editor
// (garis tebal + bayangan). Warna latar, padding dan
// tata letak isinya diatur lewat class dari luar.
defineProps({
  tag: {
    type: String,
    default: 'div',
  },
})
</script>

<template>
  <component
    :is="tag"
    class="rounded-xl border-2 border-[#153A2B] shadow-[4px_4px_0_#153A2B]"
  >
    <slot />
  </component>
</template>
