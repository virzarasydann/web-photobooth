<template>
  <div
    :style="{ backgroundColor: color }"
    class="max-w-4/5  md:max-w-1/4 p-3 w-full rounded-2xl flex flex-col gap-3 "
  >
    <div class="flex justify-between" data-section="head">
      <div>
        <h2
          :style="{ color: Color.forestGreen }"
          class="font-bold"
        >
          {{ props.title }}
        </h2>
      </div>
      <div>
        <slot name="icon" />
      </div>
    </div>

    <div data-section="head">
      <h1 class="font-extrabold text-2xl text-center md:text-left">{{ props.number }}</h1>
    </div>

    <div data-section="description">
      <h1 class="font-medium text-[#6B7280] text-center md:text-left wrap-break-word">{{ props.description }}</h1>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import Color from '@/config/DataSource/color.json'

const props = defineProps({
  variant: { type: String, default: 'white' },
  title: { type: String, default: 'Your title' },
  number: { type: Number, default: 0 },
  description: { type: String, default: 'Your description' },
})

const color = computed(() => {
  return Color[props.variant] ?? props.variant
})
</script>
