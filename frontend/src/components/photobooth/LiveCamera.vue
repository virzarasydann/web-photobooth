<template>
  <section class="h-full min-h-0 flex flex-col justify-between py-1">
    <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#DCE7E8] shrink-0">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-base md:text-lg text-[#1C2B22]">Live Camera</h2>
        <span v-if="mediaStream"
          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>LIVE</span>
        </span>
        <span v-else-if="isLoadingCamera"
          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-spin"></span>
          <span>MEMUAT</span>
        </span>
        <span v-else-if="cameraError"
          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold">
          <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span>
          <span>ERROR</span>
        </span>
      </div>

      <div class="flex items-center gap-2">
        <div class="inline-flex items-center p-0.5 rounded-xl bg-white border border-[#DCE7E8] shadow-2xs gap-1">
          <button v-for="sec in [3, 5, 10]" :key="sec" type="button" @click="timerDuration = sec"
            class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
            :class="timerDuration === sec ? 'bg-[#2F523E] text-white shadow-2xs' : 'text-[#486153] hover:text-[#2F523E]'">
            {{ sec }}s
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto py-1.5 text-xs no-scrollbar shrink-0">
      <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
      <button v-for="filter in filterOptions" :key="filter.id" type="button" @click="selectedFilter = filter.id"
        class="px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
        :class="selectedFilter === filter.id ? 'bg-[#2F523E] text-white shadow-xs' : 'bg-white text-[#486153] hover:bg-gray-50 border border-[#DCE7E8]'">
        {{ filter.label }}
      </button>
    </div>

    <div class="flex-1 min-h-0 w-full flex items-center justify-center my-auto py-1 overflow-hidden">
      <div
        class="relative w-auto h-full max-w-full max-h-[360px] md:max-h-[400px] lg:max-h-[440px] xl:max-h-[500px] 2xl:max-h-[560px] aspect-video flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-xl border border-black/20 transition-all duration-300 mx-auto"
        :style="{ aspectRatio: cameraAspect || '16/9' }">
        <div v-if="snapshotError"
          class="absolute top-3 left-3 right-3 z-30 bg-red-600/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl text-xs flex items-center justify-between shadow-lg border border-red-400/40">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{{ snapshotError }}</span>
          </div>
          <button type="button" @click="snapshotError = null"
            class="cursor-pointer text-white/80 hover:text-white font-bold px-1">✕</button>
        </div>

        <img v-if="retakePhotoUrl && !isCounting" :src="retakePhotoUrl" alt="Foto Lama Slot"
          class="w-full h-full object-cover" />

        <div v-show="mediaStream" class="transition-all duration-300" :class="[
          retakePhotoUrl && !isCounting
            ? 'absolute top-3 right-3 w-32 sm:w-40 rounded-xl overflow-hidden border-2 border-white shadow-2xl z-20 bg-black'
            : 'w-full h-full flex items-center justify-center'
        ]" :style="retakePhotoUrl && !isCounting ? { aspectRatio: cameraAspect } : undefined">
          <video ref="videoRef" autoplay playsinline muted @loadedmetadata="onVideoMetadata"
            class="w-full h-full object-cover transition-transform duration-200" :class="{ '-scale-x-100': isMirrored }"
            :style="{ filter: filterMap[selectedFilter] || 'none' }"></video>
        </div>

        <div v-if="isLoadingCamera && !mediaStream && !cameraError"
          class="flex flex-col items-center justify-center text-gray-300 gap-3 p-6 text-center select-none">
          <div class="relative flex items-center justify-center">
            <div class="w-12 h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin"></div>
            <svg class="w-5 h-5 text-emerald-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <div>
            <span class="text-sm font-semibold text-white block">Menghubungkan ke Kamera...</span>
            <span class="text-xs text-gray-400 mt-0.5 block">Meminta izin dan menyiapkan webcam</span>
          </div>
        </div>

        <div v-else-if="cameraError && !mediaStream"
          class="flex flex-col items-center justify-center text-center p-4 sm:p-6 max-w-md mx-auto z-10 w-full select-none">
          <div
            class="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-2.5 shadow-lg">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 class="text-white font-bold text-sm sm:text-base tracking-tight mb-1">
            {{ cameraError.title }}
          </h3>

          <p class="text-gray-300 text-xs leading-relaxed mb-3 max-w-xs sm:max-w-sm">
            {{ cameraError.message }}
          </p>

          <div
            class="w-full bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-2.5 mb-3.5 text-left flex items-start gap-2 shadow-xs">
            <svg class="w-4 h-4 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <div class="text-[11px] text-gray-200 leading-normal">
              <span class="font-semibold text-amber-300 block mb-0.5">Saran Solusi:</span>
              <span>{{ cameraError.actionText }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2 flex-wrap justify-center">
            <button type="button" @click="retryCamera" :disabled="isLoadingCamera"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2F523E] hover:bg-[#233E2F] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50">
              <svg class="w-4 h-4" :class="{ 'animate-spin': isLoadingCamera }" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              <span>{{ isLoadingCamera ? 'Mencoba Menghubungkan...' : 'Coba Lagi' }}</span>
            </button>

            <button type="button" @click="showTechDetails = !showTechDetails"
              class="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-medium text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
              <span>{{ showTechDetails ? 'Tutup Detail' : 'Detail Error' }}</span>
            </button>
          </div>

          <div v-if="showTechDetails && cameraError.details"
            class="mt-2.5 w-full p-2 bg-black/60 rounded-lg text-left text-[10px] font-mono text-red-300 border border-red-500/20 break-all select-all">
            {{ cameraError.details }}
          </div>
        </div>

        <div v-if="isCounting && countdown !== null"
          class="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20">
          <div class="text-white text-7xl md:text-8xl font-black font-heading animate-pulse-subtle drop-shadow-2xl">
            {{ countdown }}
          </div>
        </div>

        <div v-if="isFlash" class="absolute inset-0 bg-white pointer-events-none z-30 transition-opacity duration-300"
          :class="isFlash ? 'opacity-95' : 'opacity-0'"></div>

        <div
          class="absolute inset-3 pointer-events-none border border-white/20 rounded-xl flex flex-col justify-between p-2">
          <div class="flex justify-between">
            <span class="w-2.5 h-2.5 border-t-2 border-l-2 border-white/70"></span>
            <span class="w-2.5 h-2.5 border-t-2 border-r-2 border-white/70"></span>
          </div>
          <div class="flex justify-between">
            <span class="w-2.5 h-2.5 border-b-2 border-l-2 border-white/70"></span>
            <span class="w-2.5 h-2.5 border-b-2 border-r-2 border-white/70"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-1.5 py-1.5 px-0.5 shrink-0 border-t border-[#DCE7E8]/70 mt-1">
      <div class="flex items-center justify-between text-[11px] font-semibold text-gray-600 px-1">
        <span>
          {{ retakeIndex !== null ? 'Sedang Foto Ulang:' : 'Slot Foto Booth:' }}
        </span>
        <span class="text-[10px] text-gray-400">
          {{ daftarFoto.length }} / {{ maxPhotos }} Terisi
        </span>
      </div>

      <div class="grid grid-cols-4 gap-2 sm:gap-2.5 lg:gap-3 w-full">
        <button v-for="idx in maxPhotos" :key="idx" type="button"
          :disabled="!daftarFoto[idx - 1] && daftarFoto.length !== idx - 1"
          @click="daftarFoto[idx - 1] ? $emit('pilihSlot', idx - 1) : null"
          class="relative h-20 sm:h-24 lg:h-26 xl:h-28 2xl:h-32 rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center shadow-2xs group"
          :class="[
            retakeIndex === idx - 1
              ? 'border-[#CD692C] ring-2 ring-[#CD692C] ring-offset-2 scale-102 shadow-md cursor-pointer bg-[#FAF0E8]'
              : daftarFoto[idx - 1]
                ? 'border-[#DCE7E8] hover:border-[#2F523E] hover:scale-102 cursor-pointer bg-white'
                : daftarFoto.length === idx - 1
                  ? 'border-[#2F523E] border-dashed bg-white/80 ring-2 ring-[#2F523E]/20'
                  : 'border-[#DCE7E8] border-dashed bg-white/40 text-gray-400 cursor-not-allowed'
          ]"
          :title="daftarFoto[idx - 1] ? 'Klik untuk foto ulang slot ke-' + idx : (daftarFoto.length === idx - 1 ? 'Slot yang akan diambil berikutnya' : 'Slot belum terisi')">
          <img v-if="daftarFoto[idx - 1]" :src="daftarFoto[idx - 1]" :alt="'Foto ' + idx"
            class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200" />

          <div v-if="retakeIndex === idx - 1"
            class="absolute inset-0 bg-[#CD692C]/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white font-bold">
            <span class="text-base sm:text-lg font-black">↺</span>
            <span class="text-[10px] tracking-tight uppercase">Ulang</span>
          </div>

          <span v-if="daftarFoto[idx - 1] && retakeIndex !== idx - 1"
            class="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold tracking-tight">
            Slot {{ idx }}
          </span>

          <div v-else-if="!daftarFoto[idx - 1] && daftarFoto.length === idx - 1"
            class="flex flex-col items-center justify-center gap-1 text-[#2F523E]">
            <div
              class="w-6 h-6 rounded-full bg-[#EAF2EE] flex items-center justify-center font-bold text-xs shadow-2xs">
              {{ idx }}
            </div>
            <span class="text-[9px] font-bold uppercase tracking-wider">Aktif</span>
          </div>

          <div v-else-if="!daftarFoto[idx - 1]" class="flex flex-col items-center justify-center gap-0.5 text-gray-400">
            <span class="text-xs font-bold text-gray-400">#{{ idx }}</span>
            <span class="text-[9px] text-gray-400">Kosong</span>
          </div>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-1.5 pt-1 shrink-0">
      <div v-if="retakeIndex !== null" class="flex items-center gap-2 w-full">
        <button type="button" @click="startCapture" :disabled="!mediaStream || isCounting || Boolean(cameraError)"
          class="flex-1 py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm ring-2 ring-[#CD692C]/30 active:scale-98"
          :class="[
            !mediaStream || cameraError
              ? 'bg-gray-400 cursor-not-allowed opacity-75'
              : 'bg-[#CD692C] hover:bg-[#B85820] cursor-pointer'
          ]">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span v-if="cameraError">Kamera Bermasalah</span>
          <span v-else-if="isLoadingCamera">Menyiapkan Kamera...</span>
          <span v-else-if="isCounting">Menghitung Mundur ({{ countdown }}s)...</span>
          <span v-else>Ambil Ulang Foto</span>
          <span v-if="!isCounting && mediaStream && !cameraError"
            class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight">
            Spasi
          </span>
        </button>

        <button type="button" @click="$emit('cancelRetake')" :disabled="isCounting"
          class="py-2.5 md:py-3 px-3.5 sm:px-4 rounded-xl font-bold text-xs md:text-sm text-[#486153] hover:text-[#1C2B22] bg-[#F4F8F8] hover:bg-[#E8F0EE] border border-[#DCE7E8] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs disabled:opacity-50"
          title="Batalkan foto ulang slot ini">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span>Batal Ulang</span>
        </button>
      </div>

      <button v-else type="button" @click="startCapture"
        :disabled="!mediaStream || isCounting || totalFoto >= maxPhotos || Boolean(cameraError)"
        class="w-full py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
        :class="[
          cameraError || !mediaStream
            ? 'bg-gray-400 cursor-not-allowed opacity-75'
            : totalFoto >= maxPhotos
              ? 'bg-emerald-700 cursor-not-allowed opacity-90'
              : isCounting
                ? 'bg-[#1C2B22] cursor-wait opacity-90'
                : 'bg-[#2F523E] hover:bg-[#233E2F] hover:shadow-md cursor-pointer'
        ]">
        <svg v-if="cameraError" class="w-4 h-4 md:w-5 md:h-5 text-gray-200" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <svg v-else-if="totalFoto < maxPhotos && !isCounting && mediaStream" class="w-4 h-4 md:w-5 md:h-5" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
        <svg v-else-if="totalFoto >= maxPhotos" class="w-4 h-4 md:w-5 md:h-5 text-emerald-300" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>

        <span v-if="cameraError">Kamera Tidak Tersedia (Periksa Izin/Perangkat)</span>
        <span v-else-if="isLoadingCamera">Menyiapkan Kamera...</span>
        <span v-else-if="isCounting">Menghitung Mundur ({{ countdown }}s)...</span>
        <span v-else-if="totalFoto < maxPhotos">Ambil Foto (Foto {{ totalFoto + 1 }} dari {{ maxPhotos }})</span>
        <span v-else>Semua Slot Foto Terisi ({{ maxPhotos }}/{{ maxPhotos }})</span>

        <span v-if="totalFoto < maxPhotos && !isCounting && mediaStream && !cameraError"
          class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight">
          Spasi
        </span>
      </button>

      <div v-if="totalFoto > 0 && retakeIndex === null" class="flex items-center justify-between gap-2 pt-0.5 text-xs">
        <button type="button" @click="$emit('retakeLast')"
          class="text-[#CD692C] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <span>Foto Ulang Terakhir</span>
        </button>

        <button type="button" @click="$emit('reset')"
          class="text-gray-500 hover:text-red-600 font-medium inline-flex items-center gap-1 cursor-pointer">
          <span>Reset Semua</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  daftarFoto: {
    type: Array,
    default: () => []
  },
  maxPhotos: {
    type: Number,
    default: 4
  },
  totalFoto: {
    type: Number,
    default: 0
  },
  soundEnabled: {
    type: Boolean,
    default: true
  },
  retakeIndex: {
    type: Number,
    default: null
  },
  retakePhotoUrl: {
    type: String,
    default: null
  }
})

const emit = defineEmits([
  'capture',
  'retakeLast',
  'reset',
  'cancelRetake',
  'pilihSlot',
  'cameraError',
  'cameraReady'
])

const videoRef = ref(null)
const mediaStream = ref(null)
const timerDuration = ref(3)
const isCounting = ref(false)
const countdown = ref(null)
const isFlash = ref(false)
const isMirrored = ref(true)
const selectedFilter = ref('normal')
const cameraAspect = ref(16 / 9)

const isLoadingCamera = ref(true)
const cameraError = ref(null)
const snapshotError = ref(null)
const showTechDetails = ref(false)

const onVideoMetadata = () => {
  if (videoRef.value && videoRef.value.videoWidth && videoRef.value.videoHeight) {
    cameraAspect.value = videoRef.value.videoWidth / videoRef.value.videoHeight
  }
}

const filterOptions = [
  { id: 'normal', label: 'Normal' },
  { id: 'warm', label: 'Warm' },
  { id: 'mono', label: 'B&W' },
  { id: 'vintage', label: 'Vintage' },
  { id: 'soft', label: 'Soft' }
]

const filterMap = {
  normal: 'none',
  warm: 'sepia(30%) saturate(130%) hue-rotate(-8deg) brightness(102%)',
  mono: 'grayscale(100%) contrast(110%)',
  vintage: 'sepia(45%) contrast(110%) brightness(95%) saturate(85%)',
  soft: 'contrast(95%) brightness(108%) saturate(115%)'
}

let countdownTimer = null
const canvas = document.createElement('canvas')

function playBeep(isHigh = false) {
  if (!props.soundEnabled) return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(isHigh ? 960 : 540, ctx.currentTime)
    gain.gain.setValueAtTime(0.18, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.13)
  } catch (err) {
    console.debug('Audio beep playback failed:', err)
  }
}

function playShutter() {
  if (!props.soundEnabled) return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') ctx.resume()

    const osc = ctx.createOscillator()
    const oscGain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(850, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.04)
    oscGain.gain.setValueAtTime(0.35, ctx.currentTime)
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05)
    osc.connect(oscGain)
    oscGain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.05)

    const bufferSize = ctx.sampleRate * 0.06
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer
    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.4, ctx.currentTime + 0.02)
    noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08)
    noise.connect(noiseGain)
    noiseGain.connect(ctx.destination)
    noise.start(ctx.currentTime + 0.02)
  } catch (err) {
    console.debug('Audio shutter playback failed:', err)
  }
}

const startCapture = () => {
  if (!mediaStream.value || cameraError.value) return
  if ((props.totalFoto >= props.maxPhotos && props.retakeIndex === null) || isCounting.value) return

  if (timerDuration.value <= 0) {
    triggerCapture()
    return
  }

  isCounting.value = true
  countdown.value = timerDuration.value
  playBeep(false)

  countdownTimer = setInterval(() => {
    countdown.value--
    if (countdown.value > 0) {
      playBeep(false)
    } else if (countdown.value === 0) {
      clearInterval(countdownTimer)
      countdownTimer = null
      playBeep(true)
      triggerCapture()
    }
  }, 1000)
}

const triggerCapture = () => {
  isFlash.value = true
  playShutter()
  takeSnapshot()

  setTimeout(() => {
    isFlash.value = false
    isCounting.value = false
    countdown.value = null
  }, 300)
}

const takeSnapshot = () => {
  try {
    if (!videoRef.value || !mediaStream.value) {
      throw new Error('Video kamera belum siap atau stream tidak aktif.')
    }
    const video = videoRef.value
    const width = video.videoWidth || 1280
    const height = video.videoHeight || 720

    if (width === 0 || height === 0) {
      throw new Error('Dimensi frame kamera tidak valid atau video belum termuat.')
    }

    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Konteks grafis canvas 2D tidak tersedia.')
    }

    ctx.save()

    if (isMirrored.value) {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    const filterCss = filterMap[selectedFilter.value]
    if (filterCss && filterCss !== 'none') {
      ctx.filter = filterCss
    }

    ctx.drawImage(video, 0, 0, width, height)
    ctx.restore()

    const snapshotUrl = canvas.toDataURL('image/png')
    emit('capture', {
      url: snapshotUrl
    })
  } catch (err) {
    console.error('Gagal mengambil snapshot:', err)
    snapshotError.value = err.message || 'Terjadi kesalahan saat memotret'
    setTimeout(() => {
      snapshotError.value = null
    }, 4000)
  }
}

const parseCameraError = (error) => {
  const name = error?.name || ''
  const message = error?.message || ''

  if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
    return {
      type: 'permission',
      title: 'Izin Akses Kamera Ditolak',
      message: 'Website belum diberikan izin untuk mengakses webcam perangkat Anda.',
      actionText: 'Klik ikon gembok / perizinan di sebelah kiri address bar browser, ubah izin Kamera menjadi "Izinkan" (Allow), lalu klik tombol "Coba Lagi".',
      details: `${name}: ${message || 'User denied camera permission'}`
    }
  }

  if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
    return {
      type: 'not-found',
      title: 'Kamera Tidak Ditemukan',
      message: 'Tidak ada perangkat kamera / webcam yang terdeteksi pada sistem Anda.',
      actionText: 'Pastikan webcam eksternal terhubung dengan baik atau kamera laptop aktif dan driver terpasang dengan benar.',
      details: `${name}: ${message || 'No video input devices found'}`
    }
  }

  if (name === 'NotReadableError' || name === 'TrackStartError') {
    return {
      type: 'busy',
      title: 'Kamera Sedang Digunakan',
      message: 'Kamera tidak dapat diakses karena kemungkinan sedang digunakan oleh aplikasi atau browser tab lain.',
      actionText: 'Tutup aplikasi seperti Zoom, Google Meet, OBS, atau tab browser lain yang sedang memakai webcam, lalu klik "Coba Lagi".',
      details: `${name}: ${message || 'Device is already in use or hardware error'}`
    }
  }

  if (name === 'OverconstrainedError' || name === 'ConstraintNotSatisfiedError') {
    return {
      type: 'overconstrained',
      title: 'Resolusi Kamera Tidak Didukung',
      message: 'Kamera Anda tidak mendukung spesifikasi resolusi atau aspek rasio yang diminta sistem.',
      actionText: 'Klik tombol "Coba Lagi" untuk mencoba inisialisasi ulang dengan mode resolusi standar.',
      details: `${name}: ${message || 'Constraints could not be satisfied'}`
    }
  }

  if (name === 'SecurityError') {
    return {
      type: 'security',
      title: 'Akses Kamera Dibatasi',
      message: 'Akses webcam diblokir oleh kebijakan keamanan browser.',
      actionText: 'Pastikan website dibuka melalui koneksi aman HTTPS atau localhost.',
      details: `${name}: ${message || 'Insecure origin or security policy'}`
    }
  }

  return {
    type: 'unknown',
    title: 'Gagal Menghubungkan Kamera',
    message: 'Terjadi kendala saat mencoba mengaktifkan webcam Anda.',
    actionText: 'Periksa perizinan browser dan sambungan perangkat kamera Anda, lalu klik "Coba Lagi".',
    details: `${name || 'Error'}: ${message || 'Terjadi kesalahan sistem saat mengakses kamera'}`
  }
}

const stopCameraTracks = () => {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop())
    mediaStream.value = null
  }
}

const startCamera = async () => {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    isLoadingCamera.value = false
    cameraError.value = {
      type: 'unsupported',
      title: 'Browser Tidak Mendukung Kamera',
      message: 'Browser ini tidak mendukung fitur WebRTC MediaDevices atau dibuka di lingkungan non-HTTPS.',
      actionText: 'Buka website menggunakan browser modern (Chrome, Edge, Safari, Firefox) melalui HTTPS atau localhost.',
      details: 'navigator.mediaDevices.getUserMedia is undefined'
    }
    emit('cameraError', cameraError.value)
    return
  }

  stopCameraTracks()

  isLoadingCamera.value = true
  cameraError.value = null

  try {
    let stream
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'user'
        },
        audio: false
      })
    } catch (firstErr) {
      if (firstErr.name === 'OverconstrainedError' || firstErr.name === 'ConstraintNotSatisfiedError') {
        console.warn('Resolusi ideal kamera tidak terpenuhi, beralih ke video standar...')
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        })
      } else {
        throw firstErr
      }
    }

    mediaStream.value = stream
    isLoadingCamera.value = false
    cameraError.value = null

    await nextTick()
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      videoRef.value.onloadedmetadata = () => {
        if (videoRef.value && videoRef.value.videoWidth && videoRef.value.videoHeight) {
          cameraAspect.value = videoRef.value.videoWidth / videoRef.value.videoHeight
        }
      }
    }

    const [videoTrack] = stream.getVideoTracks()
    if (videoTrack) {
      videoTrack.onended = () => {
        mediaStream.value = null
        cameraError.value = {
          type: 'disconnected',
          title: 'Koneksi Kamera Terputus',
          message: 'Perangkat kamera terlepas atau sambungan terputus saat sesi berlangsung.',
          actionText: 'Pastikan kamera kembali terhubung dengan baik, lalu klik tombol "Coba Lagi".',
          details: 'Video track ended unexpectedly'
        }
        emit('cameraError', cameraError.value)
      }

      const capabilities = videoTrack.getCapabilities?.() || {}
      if (capabilities.zoom) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ zoom: capabilities.zoom.min || 1 }]
          })
        } catch (e) {
          console.debug('Pengaturan hardware zoom:', e)
        }
      }
    }

    emit('cameraReady')
  } catch (error) {
    console.error('Akses webcam tidak berhasil:', error)
    isLoadingCamera.value = false
    mediaStream.value = null
    cameraError.value = parseCameraError(error)
    emit('cameraError', cameraError.value)
  }
}

const retryCamera = () => {
  startCamera()
}

const stopCamera = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  stopCameraTracks()
}

const onKeyDown = (e) => {
  if (e.code === 'Space' && !e.repeat) {
    const activeEl = document.activeElement
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
      return
    }
    if (!mediaStream.value || cameraError.value || isCounting.value) {
      return
    }
    e.preventDefault()
    startCapture()
  }
}

onMounted(() => {
  startCamera()
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  stopCamera()
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
@keyframes pulse-subtle {

  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.18);
    opacity: 0.9;
  }
}

.animate-pulse-subtle {
  animation: pulse-subtle 0.85s infinite ease-in-out;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
