<script setup>
import AppButton from '@/components/common/button/AppButton.vue'

defineProps({
  populer: Boolean,
  ikon: String,
  label: String,
  nama: String,
  deskripsi: String,
  harga: String,
  satuan: String,
  catatan: String,
  tombol: String,
  href: String,
})
</script>

<template>
  <article
    class="relative flex flex-col rounded-[1.25rem] p-6 shadow-[0_6px_18px_rgba(21,58,43,0.08)]"
    :class="
      populer
        ? 'border-2 border-[#2D5141] bg-[#F3FAF6]'
        : 'border border-[#dce8e2] bg-white'
    "
  >
    <span
      v-if="populer"
      class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FCC046] px-3 py-1 text-[0.72rem] font-bold whitespace-nowrap text-[#3b2a12]"
    >
      ★ Paling Populer
    </span>

    <div class="flex items-start justify-between">
      <p
        class="text-[0.72rem] font-semibold tracking-[0.15em] text-[#7a8a82] uppercase"
      >
        {{ label }}
      </p>

      <svg
        v-if="ikon === 'kamera'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5 text-[#153A2B]"
        aria-hidden="true"
      >
        <path
          d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"
        />
        <circle cx="12" cy="13" r="3.5" />
      </svg>

      <svg
        v-else-if="ikon === 'berdua'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5 text-[#153A2B]"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6" />
        <path d="M16 4.7a3.5 3.5 0 0 1 0 6.6" />
        <path d="M18 14.3c2 .8 3.5 2.7 3.5 5.7" />
      </svg>

      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-5 w-5 text-[#153A2B]"
        aria-hidden="true"
      >
        <circle cx="12" cy="7.5" r="3" />
        <circle cx="5" cy="10" r="2.3" />
        <circle cx="19" cy="10" r="2.3" />
        <path d="M6.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M1.5 18c0-2 1.3-3.5 3.5-3.5" />
        <path d="M22.5 18c0-2-1.3-3.5-3.5-3.5" />
      </svg>
    </div>

    <h3
      class="mt-1 text-[1.15rem] font-bold text-[#153A2B]"
    >
      {{ nama }}
    </h3>
    <p
      class="mt-2 text-[0.85rem] leading-relaxed text-[#5b6b64]"
    >
      {{ deskripsi }}
    </p>

    <div class="mt-5">
      <p
        class="text-[1.9rem] leading-none font-extrabold text-[#153A2B]"
      >
        {{ harga }}
        <span
          class="text-[0.85rem] font-medium text-[#7a8a82]"
        >
          {{ satuan }}
        </span>
      </p>
      <p class="mt-1 text-[0.78rem] text-[#7a8a82]">
        {{ catatan }}
      </p>
    </div>

    <hr class="my-5 border-0 border-t border-[#e3ece7]" />

    <ul class="m-0 flex list-none flex-col gap-3 p-0">
      <slot />
    </ul>

    <div class="mt-auto pt-6">
      <AppButton
        :variant="populer ? 'primary' : 'outline'"
        :href="href"
        class="w-full"
      >
        {{ tombol }}
      </AppButton>
    </div>
  </article>
</template>
