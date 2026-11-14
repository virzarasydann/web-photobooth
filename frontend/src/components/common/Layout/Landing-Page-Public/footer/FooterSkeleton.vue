<script setup>
// Footer berlatar gelap, jadi kotak skeleton memakai putih transparan
// (bukan SkeletonBox yang warnanya untuk latar terang).
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat data...</span>

    <div
      class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12"
    >
      <!-- Logo + deskripsi -->
      <div class="col-span-2 md:col-span-1">
        <div
          class="mb-4 h-12 w-12 animate-pulse rounded-full bg-white/15"
        ></div>
        <div
          class="mb-2 h-4 w-full max-w-[24rem] animate-pulse rounded-full bg-white/15"
        ></div>
        <div
          class="mb-2 h-4 w-full max-w-[24rem] animate-pulse rounded-full bg-white/15"
        ></div>
        <div
          class="h-4 w-2/3 max-w-[24rem] animate-pulse rounded-full bg-white/15"
        ></div>
      </div>

      <!-- Menu -->
      <div>
        <div
          class="mb-4 h-4 w-16 animate-pulse rounded-full bg-white/15"
        ></div>
        <div
          v-for="n in 5"
          :key="n"
          class="mb-3 h-4 w-24 animate-pulse rounded-full bg-white/15"
        ></div>
      </div>

      <!-- Kontak -->
      <div>
        <div
          class="mb-4 h-4 w-16 animate-pulse rounded-full bg-white/15"
        ></div>
        <div
          v-for="n in 3"
          :key="n"
          class="mb-3 h-4 w-32 animate-pulse rounded-full bg-white/15"
        ></div>
      </div>
    </div>

    <div class="mt-10 border-t border-white/15 pt-5">
      <div
        class="mx-auto h-4 w-64 animate-pulse rounded-full bg-white/15"
      ></div>
    </div>
  </div>
</template>
