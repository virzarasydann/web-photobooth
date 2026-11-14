<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat data...</span>

    <!-- Judul dan tombol tab -->
    <div
      class="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div class="w-full max-w-[34rem]">
        <SkeletonBox class="mb-3 h-4 w-36 rounded-full" />
        <SkeletonBox class="mb-4 h-12 w-4/5 rounded-xl" />
        <SkeletonBox class="mb-2 h-4 w-full rounded-full" />
        <SkeletonBox class="mb-2 h-4 w-full rounded-full" />
        <SkeletonBox class="h-4 w-2/3 rounded-full" />
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <SkeletonBox
          v-for="n in 4"
          :key="n"
          class="h-9 w-24 rounded-full"
        />
      </div>
    </div>

    <!-- 4 kartu frame -->
    <div
      class="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[62rem]:grid-cols-4"
    >
      <div
        v-for="n in 4"
        :key="n"
        class="h-full rounded-[1.25rem] border border-[#dce8e2] bg-white p-2"
      >
        <SkeletonBox class="h-64 w-full rounded-[0.9rem]" />
        <div class="px-2 pt-3 pb-2">
          <SkeletonBox
            class="mb-2 h-5 w-3/4 rounded-full"
          />
          <SkeletonBox class="h-4 w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>
