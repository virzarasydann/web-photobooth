<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  },
})

const baseClass =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-[50rem] font-medium no-underline transition-all duration-200'

const variantClasses = {
  primary:
    'bg-[#FFDBCB] text-[#5A2200] shadow-[0_4px_0_#793100] hover:brightness-[1.03] active:translate-y-[2px] active:shadow-[0_2px_0_#793100]',
  outline:
    'border-2 border-[#2f5440] text-[#2f5440] hover:bg-[#2f5440] hover:text-white',
  'outline-light':
    'border border-white/40 text-white hover:bg-white/10',
  soft: 'bg-[#E6F0EB] text-[#153A2B] hover:bg-[#d7e6de]',
  dark: 'bg-[#2D5141] text-white hover:bg-[#254436]',
}

const sizeClasses = {
  sm: 'h-[42px] px-4 text-[0.875rem]',
  md: 'h-[50px] min-w-[100px] px-5 text-[0.95rem]',
}

const buttonClass = computed(() => [
  baseClass,
  variantClasses[props.variant],
  sizeClasses[props.size],
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="buttonClass">
    <slot />
  </RouterLink>

  <a v-else-if="href" :href="href" :class="buttonClass">
    <slot />
  </a>

  <button v-else :type="type" :class="buttonClass">
    <slot />
  </button>
</template>
