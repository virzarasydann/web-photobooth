<template>
  <div class="min-h-screen lg:h-screen lg:max-h-screen lg:overflow-hidden flex flex-col bg-white text-[#1C2B22] font-sans selection:bg-[#EAF2EE] selection:text-[#2F523E]">
    <header class="h-[54px] shrink-0 bg-white/95 backdrop-blur-md border-b border-[#D3E0E1] px-4 md:px-6 flex items-center justify-between shadow-2xs z-30">
      <div class="flex items-center gap-3">
        <button
          type="button"
          @click="kembali"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2F523E] bg-[#F4F8F8] border border-[#DCE7E8] hover:bg-[#2F523E] hover:text-white transition-all cursor-pointer active:scale-95 shadow-2xs"
          title="Kembali ke Landing Page"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          <span class="hidden sm:inline">Kembali</span>
        </button>

        <div class="h-4 w-px bg-[#D3E0E1]"></div>

        <RouterLink to="/" class="no-underline shrink-0 flex items-center">
          <BrandLogo size="sm" />
        </RouterLink>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="toggleFullscreen"
          class="w-8 h-8 rounded-full bg-[#F4F8F8] border border-[#DCE7E8] flex items-center justify-center text-[#486153] hover:text-[#2F523E] hover:bg-white transition-all cursor-pointer shadow-2xs"
          :title="isFullscreen ? 'Keluar dari Layar Penuh' : 'Mode Layar Penuh'"
        >
          <svg v-if="isFullscreen" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
          </svg>
        </button>

        <button
          type="button"
          @click="soundEnabled = !soundEnabled"
          class="w-8 h-8 rounded-full bg-[#F4F8F8] border border-[#DCE7E8] flex items-center justify-center text-[#486153] hover:text-[#2F523E] hover:bg-white transition-all cursor-pointer shadow-2xs"
          :title="soundEnabled ? 'Matikan Suara Audio' : 'Aktifkan Suara Audio'"
        >
          <svg v-if="soundEnabled" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
          <svg v-else class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-7.5 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75Z" />
          </svg>
        </button>
      </div>
    </header>

    <main class="flex-1 min-h-0 overflow-y-auto lg:overflow-hidden px-4 md:px-6 lg:px-8 py-2 md:py-3 w-full">
      <div class="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch">
        <div class="lg:col-span-7 2xl:col-span-8 h-full min-h-0 lg:pr-6 xl:pr-8 lg:border-r border-gray-200">
          <LiveCamera
            :maxPhotos="templateAktif?.slot || 4"
            :totalFoto="daftarFoto.length"
            :soundEnabled="soundEnabled"
            :retakeIndex="retakeIndex"
            :retakePhotoUrl="retakeIndex !== null ? daftarFoto[retakeIndex] : null"
            @capture="tanganiFoto"
            @retakeLast="ulangFoto"
            @reset="resetFoto"
            @cancelRetake="retakeIndex = null"
          />
        </div>

        <div class="lg:col-span-5 2xl:col-span-4 h-full min-h-0 lg:pl-6 xl:pl-8 border-t border-gray-200 pt-5 lg:pt-0 lg:border-t-0">
          <TemplatePhoto
            :daftarFoto="daftarFoto"
            :templateAktif="templateAktif"
            :retakeIndex="retakeIndex"
            @pilihTemplate="gantiTemplate"
            @reset="resetFoto"
            @pilihSlot="pilihSlot"
          />
        </div>
      </div>
    </main>

    <div
      v-if="modalKeluar"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      @click.self="modalKeluar = false"
    >
      <div class="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-[#DCE7E8] flex flex-col gap-3.5 text-center">
        <div class="w-11 h-11 rounded-full bg-[#FAF0E8] text-[#CD692C] flex items-center justify-center mx-auto">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <div>
          <h3 class="font-bold text-base text-[#1C2B22]">Kembali ke Beranda?</h3>
          <p class="text-xs text-gray-500 mt-1 leading-relaxed">
            Foto yang telah diambil dalam sesi ini akan direset. Yakin ingin keluar dari bilik foto?
          </p>
        </div>
        <div class="flex items-center gap-2.5 mt-1">
          <button
            type="button"
            @click="modalKeluar = false"
            class="flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Tetap di Booth
          </button>
          <button
            type="button"
            @click="konfirmasiKeluar"
            class="flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#CD692C] hover:bg-[#B85820] transition-colors cursor-pointer shadow-xs"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import BrandLogo from '@/components/common/Layout/Landing-Page-Public/BrandLogo.vue'
import TemplateJson from '@/config/DataSource/template-photo.json'
import LiveCamera from './LiveCamera.vue'
import TemplatePhoto from './TemplatePhoto.vue'

const router = useRouter()
const daftarFoto = ref([])
const soundEnabled = ref(true)
const isFullscreen = ref(false)
const modalKeluar = ref(false)
const templateAktif = ref(TemplateJson[0] || null)
const retakeIndex = ref(null)

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.().catch((err) => {
      console.debug('Gagal beralih ke layar penuh:', err)
    })
  } else {
    document.exitFullscreen?.().catch((err) => {
      console.debug('Gagal keluar dari layar penuh:', err)
    })
  }
}

const updateFullscreen = () => {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

onMounted(() => {
  document.addEventListener('fullscreenchange', updateFullscreen)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateFullscreen)
})

const tanganiFoto = ({ url }) => {
  const max = templateAktif.value?.slot || 4
  if (retakeIndex.value !== null) {
    daftarFoto.value[retakeIndex.value] = url
    retakeIndex.value = null
  } else if (daftarFoto.value.length < max) {
    daftarFoto.value.push(url)
  }
}

const pilihSlot = (index) => {
  if (daftarFoto.value[index]) {
    retakeIndex.value = retakeIndex.value === index ? null : index
  }
}

const ulangFoto = () => {
  if (retakeIndex.value !== null) {
    retakeIndex.value = null
  } else if (daftarFoto.value.length > 0) {
    daftarFoto.value.pop()
  }
}

const resetFoto = () => {
  daftarFoto.value = []
  retakeIndex.value = null
}

const gantiTemplate = (tmpl) => {
  templateAktif.value = tmpl
  daftarFoto.value = []
}

const kembali = () => {
  if (daftarFoto.value.length > 0) {
    modalKeluar.value = true
  } else {
    router.push('/')
  }
}

const konfirmasiKeluar = () => {
  modalKeluar.value = false
  daftarFoto.value = []
  router.push('/')
}
</script>
