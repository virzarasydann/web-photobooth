<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat data...</span>

    <div
      class="mx-auto mb-8 flex max-w-[42rem] flex-col items-center gap-3"
    >
      <SkeletonBox class="h-10 w-3/4 rounded-xl" />
      <SkeletonBox class="h-4 w-full rounded-full" />
    </div>

    <div
      class="overflow-hidden rounded-2xl border border-[#dce8e2] bg-white"
    >
      <div
        v-for="n in 6"
        :key="n"
        class="flex items-center gap-5 px-5 py-4 max-sm:py-6"
        :class="n > 1 ? 'border-t border-[#eef2f0]' : ''"
      >
        <SkeletonBox class="h-5 w-1/3 rounded-full" />
        <SkeletonBox class="h-4 flex-1 rounded-full" />
        <SkeletonBox class="h-4 flex-1 rounded-full" />
        <SkeletonBox class="h-4 flex-1 rounded-full" />
      </div>
    </div>
  </div>
</template>
