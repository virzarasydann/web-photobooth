<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat daftar template...</span>

    <div
      v-for="n in 3"
      :key="n"
      class="flex items-center gap-4 border-t border-[#dce8e2] py-3"
    >
      <SkeletonBox class="h-14 w-10 shrink-0 rounded" />
      <div class="flex flex-1 flex-col gap-2">
        <SkeletonBox class="h-4 w-1/3 rounded-full" />
        <SkeletonBox class="h-3 w-2/3 rounded-full" />
      </div>
      <SkeletonBox
        class="hidden h-8 w-28 shrink-0 rounded-lg md:block"
      />
    </div>
  </div>
</template>
