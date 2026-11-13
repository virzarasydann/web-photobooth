<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div
    role="status"
    aria-busy="true"
    class="grid grid-cols-1 items-center gap-6 md:grid-cols-2 min-[62rem]:gap-12"
  >
    <span class="sr-only">Memuat data...</span>

    <!-- Teks hero -->
    <div class="text-center md:text-start">
      <SkeletonBox
        class="mx-auto mb-3 h-12 w-full rounded-xl md:mx-0"
      />
      <SkeletonBox
        class="mx-auto mb-3 h-12 w-4/5 rounded-xl md:mx-0"
      />
      <SkeletonBox
        class="mx-auto mb-8 h-12 w-2/3 rounded-xl md:mx-0"
      />

      <SkeletonBox
        class="mx-auto mb-2 h-4 w-full max-w-[22rem] rounded-full md:mx-0"
      />
      <SkeletonBox
        class="mx-auto mb-2 h-4 w-full max-w-[22rem] rounded-full md:mx-0"
      />
      <SkeletonBox
        class="mx-auto mb-8 h-4 w-2/3 max-w-[22rem] rounded-full md:mx-0"
      />

      <div
        class="flex flex-wrap items-center justify-center gap-3 md:justify-start"
      >
        <SkeletonBox class="h-11 w-28 rounded-full" />
        <SkeletonBox class="h-11 w-24 rounded-full" />
        <SkeletonBox class="h-11 w-24 rounded-full" />
      </div>
    </div>

    <!-- Tempat banner -->
    <div class="text-center">
      <SkeletonBox
        class="mx-auto h-72 w-full max-w-[28rem] rounded-[1.25rem] md:h-[28rem]"
      />
    </div>
  </div>
</template>
