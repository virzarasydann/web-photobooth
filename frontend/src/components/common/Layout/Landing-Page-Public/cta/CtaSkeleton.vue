<script setup>
// Latar CTA gelap, jadi kotak skeleton memakai putih transparan
// (bukan SkeletonBox yang warnanya untuk latar terang).
</script>

<template>
  <div
    role="status"
    aria-busy="true"
    class="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between"
  >
    <span class="sr-only">Memuat data...</span>

    <div class="w-full max-w-[36rem]">
      <div
        class="mb-5 h-7 w-48 animate-pulse rounded-full bg-white/15"
      ></div>
      <div
        class="mb-3 h-10 w-full animate-pulse rounded-xl bg-white/15"
      ></div>
      <div
        class="mb-5 h-10 w-3/4 animate-pulse rounded-xl bg-white/15"
      ></div>
      <div
        class="mb-2 h-4 w-full animate-pulse rounded-full bg-white/15"
      ></div>
      <div
        class="h-4 w-2/3 animate-pulse rounded-full bg-white/15"
      ></div>
    </div>

    <div class="flex shrink-0 flex-wrap items-center gap-3">
      <div
        class="h-11 w-40 animate-pulse rounded-full bg-white/15"
      ></div>
      <div
        class="h-11 w-32 animate-pulse rounded-full bg-white/15"
      ></div>
    </div>
  </div>
</template>
