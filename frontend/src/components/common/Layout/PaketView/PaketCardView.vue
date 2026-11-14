<script setup>
import AppButton from '@/components/common/button/AppButton.vue'
import IkonSvg from '@/components/common/IkonSvg.vue'
import PaketFitur from './PaketFitur.vue'

// fitur: daftar teks keunggulan paket (dari JSON)
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
  fitur: Array,
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
      <IkonSvg
        v-if="ikon"
        :nama="ikon"
        :tebal="1.8"
        class="h-5 w-5 text-[#153A2B]"
      />
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

    <div v-if="harga" class="mt-5">
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
      <PaketFitur
        v-for="teks in fitur"
        :key="teks"
        :teks="teks"
      />
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
