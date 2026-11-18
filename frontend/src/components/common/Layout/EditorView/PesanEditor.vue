<script setup>
// Pesan hasil simpan / hapus.
// Pembungkusnya selalu ada dengan aria-live, supaya
// pembaca layar ikut membacakan pesan yang baru muncul.
defineProps({
  teks: {
    type: String,
    default: '',
  },
  berhasil: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div aria-live="polite" class="empty:hidden">
    <p
      v-if="teks"
      :role="berhasil ? 'status' : 'alert'"
      class="rounded-lg border-2 px-4 py-2 text-sm font-semibold"
      :class="
        berhasil
          ? 'border-[#153A2B] bg-[#E6F0EB]'
          : 'border-[#B42318] bg-[#FDECEA] text-[#B42318]'
      "
    >
      {{ teks }}
    </p>
  </div>
</template>
