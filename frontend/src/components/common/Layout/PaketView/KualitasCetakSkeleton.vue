<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div
    role="status"
    aria-busy="true"
    class="grid grid-cols-1 items-center gap-10 min-[62rem]:grid-cols-2 min-[62rem]:gap-12"
  >
    <span class="sr-only">Memuat data...</span>

    <div>
      <SkeletonBox class="mb-5 h-7 w-56 rounded-full" />
      <SkeletonBox class="mb-3 h-10 w-full rounded-xl" />
      <SkeletonBox class="mb-5 h-10 w-2/3 rounded-xl" />
      <SkeletonBox class="mb-2 h-4 w-full rounded-full" />
      <SkeletonBox class="mb-2 h-4 w-full rounded-full" />
      <SkeletonBox class="mb-2 h-4 w-full rounded-full" />
      <SkeletonBox class="h-4 w-1/2 rounded-full" />

      <div
        class="mt-6 grid grid-cols-1 gap-4 min-[36rem]:grid-cols-2"
      >
        <SkeletonBox
          v-for="n in 2"
          :key="n"
          class="h-[5.5rem] rounded-xl"
        />
      </div>
    </div>

    <div class="flex items-center justify-center">
      <SkeletonBox
        class="h-[21rem] w-[70%] max-w-[18rem] rounded-2xl"
      />
    </div>
  </div>
</template>
