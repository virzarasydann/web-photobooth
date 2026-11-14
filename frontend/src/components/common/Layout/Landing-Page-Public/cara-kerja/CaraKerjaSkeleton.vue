<script setup>
import SkeletonBox from '@/components/common/SkeletonBox.vue'
</script>

<template>
  <div role="status" aria-busy="true">
    <span class="sr-only">Memuat data...</span>

    <!-- Judul section -->
    <div
      class="mx-auto mb-12 flex max-w-[42rem] flex-col items-center gap-3"
    >
      <SkeletonBox class="h-4 w-32 rounded-full" />
      <SkeletonBox class="h-10 w-4/5 rounded-xl" />
      <SkeletonBox class="h-4 w-full rounded-full" />
      <SkeletonBox class="h-4 w-3/5 rounded-full" />
    </div>

    <div
      class="grid grid-cols-1 gap-8 min-[62rem]:grid-cols-2 min-[62rem]:items-stretch min-[62rem]:gap-6"
    >
      <!-- 4 kartu langkah -->
      <div
        class="order-2 grid grid-cols-1 gap-5 sm:grid-cols-2 min-[62rem]:order-1"
      >
        <div
          v-for="n in 4"
          :key="n"
          class="flex h-full min-h-[22rem] flex-col rounded-2xl border-2 border-[#153A2B]/15 bg-white/50 p-6 sm:min-h-[24rem]"
        >
          <div
            class="mb-5 flex items-start justify-between"
          >
            <SkeletonBox class="h-14 w-14 rounded-xl" />
            <SkeletonBox class="h-10 w-12 rounded-lg" />
          </div>
          <SkeletonBox class="mb-3 h-6 w-3/4 rounded-lg" />
          <SkeletonBox
            class="mb-2 h-4 w-full rounded-full"
          />
          <SkeletonBox
            class="mb-2 h-4 w-full rounded-full"
          />
          <SkeletonBox
            class="mb-2 h-4 w-full rounded-full"
          />
          <SkeletonBox
            class="mb-2 h-4 w-full rounded-full"
          />
          <SkeletonBox
            class="mb-5 h-4 w-2/3 rounded-full"
          />
          <div
            class="mt-auto border-t-2 border-dashed border-[#153A2B]/15 pt-4"
          >
            <SkeletonBox class="h-4 w-1/2 rounded-full" />
          </div>
        </div>
      </div>

      <!-- Tempat gambar banner -->
      <div
        class="order-1 flex items-center justify-center min-[62rem]:relative min-[62rem]:order-2"
      >
        <SkeletonBox
          class="h-64 w-full rounded-[1.25rem] min-[62rem]:absolute min-[62rem]:inset-0 min-[62rem]:h-full"
        />
      </div>
    </div>
  </div>
</template>
