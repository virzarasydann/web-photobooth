<script setup>
defineProps(['size'])
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <img
      src="@/assets/img/logo.png"
      alt="Logo Sleepy Ruben"
      class="rounded-full object-cover"
      :class="size === 'sm' ? 'h-10 w-10' : 'h-11 w-11'"
    />
    <span
      class="font-extrabold tracking-[-0.01em] text-[#153A2B]"
      :class="
        size === 'sm' ? 'text-[1.05rem]' : 'text-[1.15rem]'
      "
    >
      Sleepy Ruben
      <span
        class="text-[#2F523E] ml-1 text-[0.95rem] font-medium-bold"
      >
        <br />
        Photobooth
      </span>
    </span>
  </span>
</template>
