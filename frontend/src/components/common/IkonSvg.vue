<script setup>
// Kumpulan ikon. Pilih ikon lewat props "nama",
// misalnya <IkonSvg nama="jam" />
defineProps({
  nama: String,
  tebal: { type: Number, default: 2 },
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-linejoin="round"
    :stroke-width="tebal"
    aria-hidden="true"
  >
    <!-- video -->
    <template v-if="nama === 'video'">
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="m16 10 5-3v10l-5-3" />
    </template>

    <!-- palet warna -->
    <template v-else-if="nama === 'palet'">
      <path
        d="M12 3a9 9 0 1 0 0 18c1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.1 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-3.9-4-7.3-9-7.3Z"
      />
      <circle cx="7.5" cy="11.5" r="1" fill="currentColor" />
      <circle cx="10.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="15" cy="8" r="1" fill="currentColor" />
    </template>

    <!-- unduh -->
    <template v-else-if="nama === 'unduh'">
      <path d="M12 4v10" />
      <path d="m8 11 4 4 4-4" />
      <path d="M5 19h14" />
    </template>

    <!-- gembok -->
    <template v-else-if="nama === 'gembok'">
      <rect x="5" y="11" width="14" height="9" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </template>

    <!-- jam -->
    <template v-else-if="nama === 'jam'">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l2.5 1.5" />
    </template>

    <!-- kuas -->
    <template v-else-if="nama === 'kuas'">
      <path
        d="M14 4.5 19.5 10 11 18.5c-1.3 1.3-3.4 1.4-4.8.3-1.2-1-1.4-2.7-.5-4L14 4.5Z"
      />
      <path d="m12 6.5 5.5 5.5" />
    </template>

    <!-- printer -->
    <template v-else-if="nama === 'printer'">
      <path
        d="M7 9V4h10v5M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"
      />
      <rect x="7" y="14" width="10" height="6" rx="1" />
    </template>

    <!-- pengguna -->
    <template v-else-if="nama === 'pengguna'">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
    </template>

    <!-- kamera (paket) -->
    <template v-else-if="nama === 'kamera'">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
      />
      <circle cx="12" cy="13" r="3.5" />
    </template>

    <!-- berdua -->
    <template v-else-if="nama === 'berdua'">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
      <path d="M16 4.7a3.5 3.5 0 0 1 0 6.6" />
      <path d="M18 14.3c2 .8 3.5 2.7 3.5 5.7" />
    </template>

    <!-- ramai (banyak orang) -->
    <template v-else-if="nama === 'ramai'">
      <circle cx="12" cy="7.5" r="3" />
      <circle cx="5" cy="10" r="2.3" />
      <circle cx="19" cy="10" r="2.3" />
      <path d="M6.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
      <path d="M1.5 18c0-2 1.3-3.5 3.5-3.5" />
      <path d="M22.5 18c0-2-1.3-3.5-3.5-3.5" />
    </template>

    <!-- centang -->
    <template v-else-if="nama === 'centang'">
      <path d="m5 12 5 5 9-10" />
    </template>
  </svg>
</template>
