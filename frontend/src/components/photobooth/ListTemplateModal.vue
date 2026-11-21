<template>
  <div
    v-if="isOpen"
    class="modal-overlay fixed inset-0 bg-black/60 backdrop-blur-xs z-50 p-3 sm:p-5 flex items-center justify-center"
    @click.self="isOpen = false"
  >
    <div
      class="modal-card bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#DCE7E8] flex flex-col md:flex-row overflow-hidden"
    >
      <div class="modal-left flex-1 p-4 md:p-6 flex flex-col gap-3 min-h-0 border-b md:border-b-0 md:border-r border-gray-100 overflow-y-auto">
        <div class="modal-left-header flex items-center justify-between pb-2 border-b border-gray-100 shrink-0">
          <div>
            <h3 class="modal-left-title font-bold text-base md:text-lg text-[#1C2B22]">Pilih Desain Template</h3>
            <p class="modal-left-subtitle text-xs text-gray-500">Klik salah satu template untuk melihat preview</p>
          </div>
          <button
            type="button"
            @click="isOpen = false"
            class="modal-close-mobile md:hidden text-gray-400 hover:text-gray-700 p-1 rounded-lg"
          >
            ✕
          </button>
        </div>

        <div class="modal-grid grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            v-for="item in daftarTemplate"
            :key="item.id"
            type="button"
            @click="pilihCard(item)"
            class="modal-template-btn text-left p-3 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-2"
            :class="[
              preview?.id === item.id
                ? 'border-[#2F523E] bg-[#F4F8F8] shadow-xs ring-2 ring-[#2F523E]/15'
                : 'border-[#DCE7E8] bg-white hover:border-[#2F523E]/50 hover:bg-gray-50/50'
            ]"
          >
            <div class="flex items-center justify-between w-full">
              <span
                class="modal-badge-slot px-2 py-0.5 rounded-md text-[11px] font-bold"
                :class="preview?.id === item.id ? 'bg-[#2F523E] text-white' : 'bg-[#EBF1F2] text-[#486153]'"
              >
                {{ item.slot }} Slot Foto
              </span>
              <span v-if="preview?.id === item.id" class="modal-badge-status text-xs font-bold text-[#2F523E]">
                ✓ Ditinjau
              </span>
            </div>

            <div>
              <h4 class="modal-card-title font-bold text-sm text-[#1C2B22]">{{ item.name }}</h4>
              <p class="modal-card-desc text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">{{ item.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <div class="modal-right w-full md:w-[320px] lg:w-[360px] p-4 md:p-6 bg-[#FCFDFC] flex flex-col justify-between shrink-0">
        <div class="modal-right-header flex items-center justify-between pb-2 border-b border-gray-100 shrink-0">
          <div>
            <h4 class="modal-right-title font-bold text-sm text-[#1C2B22]">Preview Template</h4>
            <p class="modal-right-subtitle text-xs text-gray-500">{{ preview?.name || 'Template' }} • {{ preview?.slot || 4 }} Slot</p>
          </div>
          <button
            type="button"
            @click="isOpen = false"
            class="modal-close-desktop hidden md:inline-flex text-xs font-semibold text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            title="Tutup Modal"
          >
            ✕ Tutup
          </button>
        </div>

        <div class="modal-preview-box flex-1 w-full min-h-[140px] max-h-[220px] md:min-h-[220px] md:max-h-[440px] flex items-center justify-center p-3 bg-[#F9FBFA] rounded-xl border border-dashed border-[#DCE7E8] overflow-hidden my-2 md:my-3">
          <img
            v-if="preview?.backgroundUrl"
            :src="preview.backgroundUrl"
            :alt="preview.name"
            class="modal-preview-img max-h-[180px] md:max-h-[380px] w-auto max-w-full object-contain rounded-lg drop-shadow-md transition-all duration-200"
          />
          <p v-else class="text-gray-400 text-xs">Pilih template untuk melihat preview</p>
        </div>

        <div class="modal-action-box flex flex-col gap-2 pt-1 border-t border-gray-100 shrink-0">
          <button
            type="button"
            @click="simpanTemplate"
            :disabled="isApplied"
            class="modal-btn-apply w-full py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
            :class="isApplied ? 'bg-emerald-700 cursor-default' : 'bg-[#2F523E] hover:bg-[#233E2F] hover:shadow-md'"
          >
            <svg v-if="isApplied" class="w-4 h-4 text-emerald-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>{{ isApplied ? 'Template Berhasil Dipilih!' : 'Gunakan Template Ini' }}</span>
          </button>

          <p v-if="isApplied" class="modal-hint-text text-xs text-emerald-700 font-semibold text-center">
            ✓ Template telah diterapkan ke bilik foto
          </p>
          <p v-else class="modal-hint-text text-[11px] text-gray-400 text-center">
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

<style scoped>
@media (orientation: landscape) and (max-height: 520px) {
  .modal-overlay {
    padding: 0.35rem 0.5rem !important;
  }
  .modal-card {
    height: 90vh !important;
    max-height: calc(100dvh - 16px) !important;
    flex-direction: row !important;
    border-radius: 0.75rem !important;
    overflow: hidden !important;
  }
  .modal-left {
    padding: 0.5rem 0.75rem !important;
    gap: 0.35rem !important;
    border-right-width: 1px !important;
    border-bottom-width: 0 !important;
    min-height: 0 !important;
    overflow-y: auto !important;
  }
  .modal-left-header {
    padding-bottom: 0.25rem !important;
  }
  .modal-left-title {
    font-size: 0.85rem !important;
  }
  .modal-left-subtitle {
    font-size: 0.65rem !important;
  }
  .modal-close-mobile {
    display: none !important;
  }
  .modal-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.35rem !important;
    padding-top: 0.15rem !important;
  }
  .modal-template-btn {
    padding: 0.35rem 0.5rem !important;
    gap: 0.2rem !important;
    border-radius: 0.5rem !important;
  }
  .modal-badge-slot {
    font-size: 0.62rem !important;
    padding: 0.05rem 0.25rem !important;
  }
  .modal-badge-status {
    font-size: 0.62rem !important;
  }
  .modal-card-title {
    font-size: 0.75rem !important;
    line-height: 1.1 !important;
  }
  .modal-card-desc {
    font-size: 0.62rem !important;
    line-height: 1.15 !important;
    -webkit-line-clamp: 1 !important;
    display: -webkit-box !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
    margin-top: 0.1rem !important;
  }
  .modal-right {
    width: 270px !important;
    min-width: 240px !important;
    max-width: 300px !important;
    padding: 0.4rem 0.65rem !important;
    background-color: #FCFDFC !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    height: 100% !important;
    min-height: 0 !important;
  }
  .modal-right-header {
    padding-bottom: 0.15rem !important;
    flex-shrink: 0 !important;
  }
  .modal-right-title {
    font-size: 0.75rem !important;
  }
  .modal-right-subtitle {
    font-size: 0.62rem !important;
  }
  .modal-close-desktop {
    display: inline-flex !important;
    font-size: 0.68rem !important;
    padding: 0.15rem 0.35rem !important;
  }
  .modal-preview-box {
    flex: 1 1 0% !important;
    min-height: 120px !important;
    max-height: none !important;
    height: 100% !important;
    margin: 0.2rem 0 !important;
    padding: 0.25rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
  }
  .modal-preview-img {
    height: 100% !important;
    max-height: 100% !important;
    max-width: 100% !important;
    width: auto !important;
    object-fit: contain !important;
  }
  .modal-action-box {
    flex-shrink: 0 !important;
    padding-top: 0.25rem !important;
    margin-top: auto !important;
    width: 100% !important;
    border-top-width: 1px !important;
    border-color: #E5E7EB !important;
  }
  .modal-btn-apply {
    width: 100% !important;
    padding: 0.45rem 0.6rem !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    border-radius: 0.55rem !important;
    gap: 0.25rem !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.12) !important;
  }
  .modal-btn-apply svg {
    width: 0.85rem !important;
    height: 0.85rem !important;
  }
  .modal-hint-text {
    display: none !important;
  }
}
</style>
