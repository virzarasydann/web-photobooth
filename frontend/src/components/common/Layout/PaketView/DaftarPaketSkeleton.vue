<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat data...</span>

    <!-- Judul halaman -->
    <div
      class="mx-auto flex max-w-[42rem] flex-col items-center gap-3"
    >
      <SkeletonBox class="h-12 w-full rounded-xl" />
      <SkeletonBox class="mb-1 h-12 w-3/4 rounded-xl" />
      <SkeletonBox class="h-4 w-full rounded-full" />
      <SkeletonBox class="h-4 w-4/5 rounded-full" />
    </div>

    <!-- Tombol kategori -->
    <div class="mt-8 flex justify-center">
      <SkeletonBox class="h-[3.25rem] w-56 rounded-full" />
    </div>

    <!-- 3 kartu paket -->
    <div
      class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch"
    >
      <div
        v-for="n in 3"
        :key="n"
        class="flex flex-col rounded-[1.25rem] border border-[#dce8e2] bg-white p-6"
      >
        <div class="flex items-start justify-between">
          <SkeletonBox class="h-3 w-28 rounded-full" />
          <SkeletonBox class="h-5 w-5 rounded-md" />
        </div>
        <SkeletonBox class="mt-3 h-6 w-3/4 rounded-lg" />
        <SkeletonBox class="mt-3 h-4 w-full rounded-full" />
        <SkeletonBox class="mt-2 h-4 w-2/3 rounded-full" />
        <SkeletonBox class="mt-5 h-9 w-1/2 rounded-lg" />
        <SkeletonBox class="mt-2 h-3 w-1/3 rounded-full" />
        <hr
          class="my-5 border-0 border-t border-[#e3ece7]"
        />
        <div class="flex flex-col gap-3">
          <div
            v-for="m in 4"
            :key="m"
            class="flex items-start gap-3 md:min-h-[2rem]"
          >
            <SkeletonBox
              class="mt-0.5 h-[1.1rem] w-[1.1rem] shrink-0 rounded-full"
            />
            <SkeletonBox class="h-4 w-full rounded-full" />
          </div>
        </div>
        <SkeletonBox
          class="mt-6 h-11 w-full rounded-full"
        />
      </div>
    </div>
  </div>
</template>
