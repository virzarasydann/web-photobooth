<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 p-3 sm:p-5 flex items-center justify-center"
    @click.self="isOpen = false"
  >
    <div
      class="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#DCE7E8] flex flex-col md:flex-row overflow-hidden"
    >
      <div class="flex-1 p-4 md:p-6 flex flex-col gap-3 min-h-0 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
        <div class="flex items-center justify-between pb-2 border-b border-gray-100 shrink-0">
          <div>
            <h3 class="font-bold text-base md:text-lg text-[#1C2B22]">Pilih Desain Template</h3>
            <p class="text-xs text-gray-500">Klik salah satu template untuk melihat preview</p>
          </div>
          <button
            type="button"
            @click="isOpen = false"
            class="md:hidden text-gray-400 hover:text-gray-700 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            v-for="item in daftarTemplate"
            :key="item.id"
            type="button"
            @click="pilihCard(item)"
            class="text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2"
            :class="[
              preview?.id === item.id
                ? 'border-[#2F523E] bg-[#F4F8F8] shadow-xs ring-2 ring-[#2F523E]/15'
                : 'border-[#DCE7E8] bg-white hover:border-[#2F523E]/50 hover:bg-gray-50/50'
            ]"
          >
            <div class="flex items-center justify-between w-full">
              <span
                class="px-2 py-0.5 rounded-md text-[11px] font-bold"
                :class="preview?.id === item.id ? 'bg-[#2F523E] text-white' : 'bg-[#EBF1F2] text-[#486153]'"
              >
                {{ item.slot }} Slot Foto
              </span>
              <span v-if="preview?.id === item.id" class="text-xs font-bold text-[#2F523E]">
                ✓ Ditinjau
              </span>
            </div>

            <div>
              <h4 class="font-bold text-sm text-[#1C2B22]">{{ item.name }}</h4>
              <p class="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{{ item.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <div class="w-full md:w-[320px] lg:w-[360px] p-4 md:p-6 bg-[#FCFDFC] flex flex-col justify-between shrink-0">
        <div class="flex items-center justify-between pb-2 border-b border-gray-100 shrink-0">
          <div>
            <h4 class="font-bold text-sm text-[#1C2B22]">Preview Template</h4>
            <p class="text-xs text-gray-500">{{ preview?.name || 'Template' }} • {{ preview?.slot || 4 }} Slot</p>
          </div>
          <button
            type="button"
            @click="isOpen = false"
            class="hidden md:inline-flex text-xs font-semibold text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            ✕ Tutup
          </button>
        </div>

        <div class="flex-1 w-full min-h-[220px] max-h-[440px] flex items-center justify-center p-3 bg-[#F9FBFA] rounded-xl border border-dashed border-[#DCE7E8] overflow-hidden my-3">
          <img
            v-if="preview?.backgroundUrl"
            :src="preview.backgroundUrl"
            :alt="preview.name"
            class="max-h-[380px] w-auto max-w-full object-contain rounded-lg drop-shadow-md transition-all duration-200"
          />
          <p v-else class="text-gray-400 text-xs">Pilih template untuk melihat preview</p>
        </div>

        <div class="flex flex-col gap-2 pt-1 border-t border-gray-100 shrink-0">
          <button
            type="button"
            @click="simpanTemplate"
            :disabled="isApplied"
            class="w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
            :class="isApplied ? 'bg-emerald-700 cursor-default' : 'bg-[#2F523E] hover:bg-[#233E2F] hover:shadow-md'"
          >
            <svg v-if="isApplied" class="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>{{ isApplied ? 'Template Berhasil Dipilih!' : 'Gunakan Template Ini' }}</span>
          </button>

          <p v-if="isApplied" class="text-xs text-emerald-700 font-semibold text-center">
            ✓ Template telah diterapkan ke bilik foto
          </p>
          <p v-else class="text-[11px] text-gray-400 text-center">
            Tekan tombol di atas untuk menerapkan desain ini
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import JsonTemplate from '@/config/DataSource/template-photo.json'

const props = defineProps({
  templateAktif: {
    type: Object,
    default: null
  }
})

const isOpen = defineModel('isOpen', {
  type: Boolean,
  default: false
})

const emit = defineEmits(['pilihTemplate'])

const daftarTemplate = ref(JsonTemplate)
const preview = ref(props.templateAktif || daftarTemplate.value[0] || null)
const isApplied = ref(false)
let timer = null

const pilihCard = (item) => {
  preview.value = item
  isApplied.value = false
  if (timer) clearTimeout(timer)
}

const simpanTemplate = () => {
  if (!preview.value) return

  emit('pilihTemplate', preview.value)
  isApplied.value = true

  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    isApplied.value = false
    isOpen.value = false
  }, 700)
}

watch(
  () => props.templateAktif,
  (val) => {
    if (val) preview.value = val
  }
)

watch(isOpen, (buka) => {
  if (buka) {
    isApplied.value = false
    preview.value = props.templateAktif || preview.value || daftarTemplate.value[0]
  }
})
</script>
