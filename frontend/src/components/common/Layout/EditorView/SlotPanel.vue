<script setup>
import KartuEditor from './KartuEditor.vue'

defineProps({
  slots: {
    type: Array,
    required: true,
  },
  slotTerpilih: {
    type: Number,
    default: null,
  },
  jsonBaru: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['pilih', 'hapus'])

// Nama dan deskripsi template baru, dikirim ke atas lewat v-model
const nama = defineModel('nama', { default: '' })
const deskripsi = defineModel('deskripsi', { default: '' })

// Dua kolom isian dibuat dari satu daftar
const daftarIsian = [
  {
    judul: 'Nama Template',
    model: nama,
    contoh: 'Contoh: Midnight Party',
  },
  {
    judul: 'Deskripsi',
    model: deskripsi,
    contoh: 'Contoh: Strip 4 foto bertema pesta',
  },
]
</script>

<template>
  <KartuEditor
    tag="section"
    aria-labelledby="judul-slot"
    class="flex flex-col gap-4 bg-white p-5"
  >
    <!-- Data template baru -->
    <div class="flex flex-col gap-3">
      <label
        v-for="isian in daftarIsian"
        :key="isian.judul"
        class="text-xs font-semibold"
      >
        {{ isian.judul }}
        <input
          v-model="isian.model.value"
          type="text"
          :placeholder="isian.contoh"
          class="mt-1 w-full rounded-lg border-2 border-[#dce8e2] px-3 py-2 text-sm font-normal outline-none focus:border-[#153A2B]"
        />
      </label>
    </div>

    <h2
      id="judul-slot"
      class="border-b-2 border-[#153A2B]/15 pb-2 font-bold"
    >
      Slot Foto ({{ slots.length }})
    </h2>

    <p
      v-if="slots.length === 0"
      class="text-xs text-[#5b6b64]"
    >
      Belum ada slot. Pilih gambar dulu, lalu klik tombol
      Kotak atau Bulat di atas.
    </p>

    <ul
      class="flex max-h-[320px] flex-col gap-2 overflow-y-auto"
    >
      <li
        v-for="(slotItem, index) in slots"
        :key="slotItem.id"
        class="cursor-pointer rounded-lg border-2 p-3 text-xs"
        :class="
          slotItem.id === slotTerpilih
            ? 'border-[#153A2B] bg-[#FFF3D6]'
            : 'border-[#dce8e2] bg-white hover:border-[#153A2B]/50'
        "
        @click="emit('pilih', slotItem.id)"
      >
        <div class="flex items-center justify-between">
          <!-- Tombol ini supaya slot bisa dipilih lewat keyboard -->
          <button
            type="button"
            class="cursor-pointer font-bold"
            :aria-pressed="slotItem.id === slotTerpilih"
          >
            Slot {{ index + 1 }} ·
            {{
              slotItem.bentuk === 'bulat'
                ? 'Bulat'
                : 'Kotak'
            }}
          </button>
          <button
            type="button"
            class="cursor-pointer font-semibold text-[#B42318] hover:underline"
            :aria-label="`Hapus slot ${index + 1}`"
            @click.stop="emit('hapus', index)"
          >
            Hapus
          </button>
        </div>
        <p class="mt-1 font-mono text-[#5b6b64]">
          x {{ slotItem.x }} · y {{ slotItem.y }} ·
          {{ slotItem.width }}×{{ slotItem.height }}
        </p>
      </li>
    </ul>

    <!-- Hasil JSON, dilipat supaya tidak memenuhi layar -->
    <details class="text-xs">
      <summary class="cursor-pointer font-semibold">
        Lihat JSON template baru
      </summary>
      <pre
        class="mt-2 max-h-[220px] overflow-auto rounded-lg border-2 border-[#dce8e2] bg-[#F3FAF6] p-3 font-mono text-[11px]"
        tabindex="0"
        >{{ jsonBaru }}</pre
      >
    </details>
  </KartuEditor>
</template>
