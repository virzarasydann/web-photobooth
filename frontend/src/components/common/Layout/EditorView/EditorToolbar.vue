<script setup>
import KartuEditor from './KartuEditor.vue'
import TombolEditor from './TombolEditor.vue'

defineProps({
  gambarSiap: Boolean,
  adaSlot: Boolean,
  dataSiap: Boolean,
  sedangMenyimpan: Boolean,
})

const emit = defineEmits([
  'pilihGambar',
  'tambahSlot',
  'unduhJson',
  'simpan',
])

// Dua tombol tambah slot dibuat dari satu daftar
const daftarBentuk = [
  { nilai: 'kotak', label: 'Kotak' },
  { nilai: 'bulat', label: 'Bulat' },
]

// File dikirim ke atas, lalu nilai input dikosongkan
// supaya file yang sama bisa dipilih lagi
const handleFile = (e) => {
  const file = e.target.files[0]
  e.target.value = ''
  if (file) emit('pilihGambar', file)
}
</script>

<template>
  <KartuEditor
    class="flex flex-wrap items-center gap-3 bg-white p-3 max-md:flex-col max-md:items-stretch"
  >
    <label
      class="relative cursor-pointer rounded-lg bg-[#153A2B] px-4 py-2 text-sm font-semibold text-white focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#153A2B] hover:bg-[#2D5141] max-md:flex max-md:min-h-11 max-md:items-center max-md:justify-center"
    >
      Pilih Gambar Template
      <input
        type="file"
        accept="image/*"
        class="sr-only"
        @change="handleFile"
      />
    </label>

    <div
      class="flex items-center gap-2 border-l-2 border-[#153A2B]/15 pl-3 max-md:flex-col max-md:items-stretch max-md:border-t-2 max-md:border-l-0 max-md:pt-3 max-md:pl-0"
    >
      <span
        class="text-xs font-semibold text-[#5b6b64] uppercase"
      >
        Tambah slot
      </span>

      <div
        role="group"
        aria-label="Tambah slot foto"
        class="flex items-center gap-2 max-md:grid max-md:grid-cols-2"
      >
        <TombolEditor
          v-for="bentuk in daftarBentuk"
          :key="bentuk.nilai"
          ukuran="sedang"
          class="flex items-center gap-2 max-md:justify-center"
          :disabled="!gambarSiap"
          @click="emit('tambahSlot', bentuk.nilai)"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <rect
              v-if="bentuk.nilai === 'kotak'"
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />
            <circle v-else cx="12" cy="12" r="8" />
          </svg>
          {{ bentuk.label }}
        </TombolEditor>
      </div>
    </div>

    <div
      class="ml-auto flex items-center gap-2 max-md:ml-0 max-md:grid max-md:grid-cols-1 max-md:border-t-2 max-md:border-[#153A2B]/15 max-md:pt-3"
    >
      <!-- Cadangan: unduh JSON lalu pasang manual -->
      <TombolEditor
        variasi="pucat"
        :disabled="!adaSlot || !dataSiap"
        @click="emit('unduhJson')"
      >
        Unduh JSON
      </TombolEditor>

      <!-- Simpan otomatis ke folder proyek -->
      <TombolEditor
        variasi="emas"
        class="max-md:order-first"
        :disabled="!adaSlot || sedangMenyimpan"
        :aria-busy="sedangMenyimpan"
        @click="emit('simpan')"
      >
        {{
          sedangMenyimpan
            ? 'Menyimpan...'
            : 'Simpan Template'
        }}
      </TombolEditor>
    </div>
  </KartuEditor>
</template>
