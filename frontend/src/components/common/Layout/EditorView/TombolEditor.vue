<script setup>
import { computed } from 'vue'

// Tombol standar Editor.
// variasi: garis | pucat | emas | bahaya
// ukuran : besar | sedang | kecil
const props = defineProps({
  variasi: {
    type: String,
    default: 'garis',
  },
  ukuran: {
    type: String,
    default: 'besar',
  },
})

const kelasVariasi = {
  garis:
    'border-[#153A2B] bg-white font-semibold hover:bg-[#FCC046] disabled:hover:bg-white',
  pucat:
    'border-[#153A2B] bg-white font-semibold hover:bg-[#E6F0EB] disabled:hover:bg-white',
  emas: 'border-[#153A2B] bg-[#FCC046] font-bold hover:bg-[#f5b52f] disabled:hover:bg-[#FCC046]',
  bahaya:
    'border-[#B42318] bg-white font-semibold text-[#B42318] hover:bg-[#FDECEA]',
}

const kelasUkuran = {
  besar: 'px-4 py-2 text-sm max-md:py-2.5',
  sedang: 'px-3 py-1.5 text-sm max-md:py-2.5',
  kecil: 'px-3 py-1.5 text-xs max-md:py-2.5 max-md:text-sm',
}

const kelasTombol = computed(() => [
  kelasVariasi[props.variasi],
  kelasUkuran[props.ukuran],
])
</script>

<template>
  <button
    type="button"
    class="cursor-pointer rounded-lg border-2 disabled:cursor-not-allowed disabled:opacity-40"
    :class="kelasTombol"
  >
    <slot />
  </button>
</template>
