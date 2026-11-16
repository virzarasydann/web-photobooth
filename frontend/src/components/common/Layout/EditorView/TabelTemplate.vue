<script setup>
// Ini dipakai oleh tombol geser (toggle) Aktif / Non Aktif
import '@/assets/role/style.css'
import TombolEditor from './TombolEditor.vue'

defineProps({
  templates: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['preview', 'hapus'])

// Judul kolom. tengah = teksnya rata tengah
const daftarKolom = [
  { judul: 'No' },
  { judul: 'Gambar' },
  { judul: 'Nama' },
  { judul: 'Deskripsi' },
  { judul: 'Jumlah Slot', tengah: true },
  { judul: 'Status', tengah: true },
  { judul: 'Aksi', tengah: true },
]
</script>

<template>
  <div class="overflow-x-auto">
    <table
      class="w-full text-left text-sm md:min-w-[36rem] max-md:block"
    >
      <caption class="sr-only">
        Daftar template photostrip
      </caption>
      <thead class="max-md:hidden">
        <tr class="bg-[#E6F0EB]">
          <th
            v-for="kolom in daftarKolom"
            :key="kolom.judul"
            scope="col"
            class="px-4 py-3 font-semibold"
            :class="kolom.tengah ? 'text-center' : ''"
          >
            {{ kolom.judul }}
          </th>
        </tr>
      </thead>
      <tbody
        class="max-md:flex max-md:flex-col max-md:gap-3"
      >
        <tr
          v-for="(item, index) in templates"
          :key="item.id"
          class="border-t border-[#dce8e2] max-md:grid max-md:grid-cols-[auto_1fr] max-md:items-center max-md:gap-x-3 max-md:gap-y-1 max-md:rounded-xl max-md:border-2 max-md:p-3"
        >
          <td class="px-4 py-3 max-md:hidden">
            {{ index + 1 }}
          </td>
          <td
            class="px-4 py-3 max-md:row-span-4 max-md:p-0"
          >
            <img
              :src="item.backgroundUrl"
              :alt="item.name"
              class="h-14 w-10 rounded border border-[#dce8e2] object-cover max-md:h-24 max-md:w-16"
            />
          </td>
          <td
            class="px-4 py-3 font-semibold max-md:p-0 max-md:text-base"
          >
            {{ item.name }}
          </td>
          <td class="px-4 py-3 text-[#5b6b64] max-md:p-0">
            {{ item.description }}
          </td>
          <td
            class="px-4 py-3 text-center max-md:p-0 max-md:text-left max-md:before:text-[#5b6b64] max-md:before:content-['Jumlah_slot:_']"
          >
            {{ item.slot }}
          </td>
          <td
            class="px-4 py-3 text-center max-md:p-0 max-md:text-left"
          >
            <label
              class="inline-flex cursor-pointer items-center gap-2 font-semibold"
            >
              <span class="wrapper-toggle">
                <input
                  v-model="item.status"
                  type="checkbox"
                  true-value="Aktif"
                  false-value="Non Aktif"
                  :aria-label="`Status template ${item.name}`"
                />
              </span>
              {{ item.status }}
            </label>
          </td>
          <td
            class="px-4 py-3 text-center max-md:col-span-2 max-md:p-0 max-md:pt-2"
          >
            <div
              class="flex items-center justify-center gap-2 max-md:grid max-md:grid-cols-2"
            >
              <TombolEditor
                ukuran="kecil"
                :aria-label="`Preview template ${item.name}`"
                @click="emit('preview', item)"
              >
                Preview
              </TombolEditor>
              <TombolEditor
                variasi="bahaya"
                ukuran="kecil"
                :aria-label="`Hapus template ${item.name}`"
                @click="emit('hapus', item)"
              >
                Hapus
              </TombolEditor>
            </div>
          </td>
        </tr>
        <tr v-if="templates.length === 0">
          <td
            colspan="7"
            class="px-4 py-8 text-center text-[#5b6b64]"
          >
            Belum ada template.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
