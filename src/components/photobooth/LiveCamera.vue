<template>
  <section class="h-full min-h-0 flex flex-col justify-between py-1">
    <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#DCE7E8] shrink-0">
      <div class="flex items-center gap-2">
        <h2 class="font-bold text-base md:text-lg text-[#1C2B22]">Live Camera</h2>
      </div>

      <div class="flex items-center gap-2">
        <div class="inline-flex items-center p-0.5 rounded-xl bg-white border border-[#DCE7E8] shadow-2xs gap-1">
          <button
            v-for="sec in [3, 5, 10]"
            :key="sec"
            type="button"
            @click="timerDuration = sec"
            class="px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
            :class="timerDuration === sec ? 'bg-[#2F523E] text-white shadow-2xs' : 'text-[#486153] hover:text-[#2F523E]'"
          >
            {{ sec }}s
          </button>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-1.5 overflow-x-auto py-1.5 text-xs no-scrollbar shrink-0">
      <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
      <button
        v-for="filter in filterOptions"
        :key="filter.id"
        type="button"
        @click="selectedFilter = filter.id"
        class="px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
        :class="selectedFilter === filter.id ? 'bg-[#2F523E] text-white shadow-xs' : 'bg-white text-[#486153] hover:bg-gray-50 border border-[#DCE7E8]'"
      >
        {{ filter.label }}
      </button>
    </div>

    <div class="flex-1 min-h-0 w-full flex items-center justify-center my-auto py-1 overflow-hidden">
      <div
        class="relative w-auto h-full max-w-full max-h-[360px] md:max-h-[400px] lg:max-h-[440px] xl:max-h-[500px] 2xl:max-h-[560px] aspect-video flex items-center justify-center bg-black rounded-2xl overflow-hidden shadow-xl border border-black/20 transition-all duration-300 mx-auto"
        :style="{ aspectRatio: cameraAspect || '16/9' }"
      >
        <img
          v-if="retakePhotoUrl && !isCounting"
          :src="retakePhotoUrl"
          alt="Foto Lama Slot"
          class="w-full h-full object-cover"
        />

        <div
          v-show="mediaStream"
          class="transition-all duration-300"
          :class="[
            retakePhotoUrl && !isCounting
              ? 'absolute top-3 right-3 w-32 sm:w-40 rounded-xl overflow-hidden border-2 border-white shadow-2xl z-20 bg-black'
              : 'w-full h-full flex items-center justify-center'
          ]"
          :style="retakePhotoUrl && !isCounting ? { aspectRatio: cameraAspect } : undefined"
        >
          <video
            ref="videoRef"
            autoplay
            playsinline
            muted
            @loadedmetadata="onVideoMetadata"
            class="w-full h-full object-cover transition-transform duration-200"
            :class="{ '-scale-x-100': isMirrored }"
            :style="{ filter: filterMap[selectedFilter] || 'none' }"
          ></video>
        </div>

        <div
          v-if="!mediaStream"
          class="flex flex-col items-center justify-center text-gray-400 gap-2 p-4 text-center"
        >
          <svg class="w-10 h-10 text-gray-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <span class="text-xs md:text-sm font-medium">Menghubungkan ke Kamera...</span>
          <span class="text-[11px] text-gray-500">Pastikan izin kamera telah diberikan di browser</span>
        </div>

        <div
          v-if="isCounting && countdown !== null"
          class="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20"
        >
          <div class="text-white text-7xl md:text-8xl font-black font-heading animate-pulse-subtle drop-shadow-2xl">
            {{ countdown }}
          </div>
        </div>

        <div
          v-if="isFlash"
          class="absolute inset-0 bg-white pointer-events-none z-30 transition-opacity duration-300"
          :class="isFlash ? 'opacity-95' : 'opacity-0'"
        ></div>

        <div class="absolute inset-3 pointer-events-none border border-white/20 rounded-xl flex flex-col justify-between p-2">
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
        <button
          v-for="idx in maxPhotos"
          :key="idx"
          type="button"
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
          :title="daftarFoto[idx - 1] ? 'Klik untuk foto ulang slot ke-' + idx : (daftarFoto.length === idx - 1 ? 'Slot yang akan diambil berikutnya' : 'Slot belum terisi')"
        >
          <img
            v-if="daftarFoto[idx - 1]"
            :src="daftarFoto[idx - 1]"
            :alt="'Foto ' + idx"
            class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-200"
          />

          <div
            v-if="retakeIndex === idx - 1"
            class="absolute inset-0 bg-[#CD692C]/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white font-bold"
          >
            <span class="text-base sm:text-lg font-black">↺</span>
            <span class="text-[10px] tracking-tight uppercase">Ulang</span>
          </div>

          <span
            v-if="daftarFoto[idx - 1] && retakeIndex !== idx - 1"
            class="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold tracking-tight"
          >
            Slot {{ idx }}
          </span>

          <div
            v-else-if="!daftarFoto[idx - 1] && daftarFoto.length === idx - 1"
            class="flex flex-col items-center justify-center gap-1 text-[#2F523E]"
          >
            <div class="w-6 h-6 rounded-full bg-[#EAF2EE] flex items-center justify-center font-bold text-xs shadow-2xs">
              {{ idx }}
            </div>
            <span class="text-[9px] font-bold uppercase tracking-wider">Aktif</span>
          </div>

          <div
            v-else-if="!daftarFoto[idx - 1]"
            class="flex flex-col items-center justify-center gap-0.5 text-gray-400"
          >
            <span class="text-xs font-bold text-gray-400">#{{ idx }}</span>
            <span class="text-[9px] text-gray-400">Kosong</span>
          </div>
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-1.5 pt-1 shrink-0">
      <div v-if="retakeIndex !== null" class="flex items-center gap-2 w-full">
        <button
          type="button"
          @click="startCapture"
          :disabled="isCounting"
          class="flex-1 py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white bg-[#CD692C] hover:bg-[#B85820] flex items-center justify-center gap-2 transition-all shadow-sm ring-2 ring-[#CD692C]/30 active:scale-98 cursor-pointer disabled:opacity-80"
        >
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span v-if="isCounting">Menghitung Mundur ({{ countdown }}s)...</span>
          <span v-else>Ambil Ulang Foto</span>
          <span
            v-if="!isCounting"
            class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight"
          >
            Spasi
          </span>
        </button>

        <button
          type="button"
          @click="$emit('cancelRetake')"
          :disabled="isCounting"
          class="py-2.5 md:py-3 px-3.5 sm:px-4 rounded-xl font-bold text-xs md:text-sm text-[#486153] hover:text-[#1C2B22] bg-[#F4F8F8] hover:bg-[#E8F0EE] border border-[#DCE7E8] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs disabled:opacity-50"
          title="Batalkan foto ulang slot ini"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span>Batal Ulang</span>
        </button>
      </div>

      <button
        v-else
        type="button"
        @click="startCapture"
        :disabled="isCounting || totalFoto >= maxPhotos"
        class="w-full py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98 cursor-pointer"
        :class="[
          totalFoto >= maxPhotos
            ? 'bg-emerald-700 cursor-not-allowed opacity-90'
            : isCounting
            ? 'bg-[#1C2B22] cursor-wait opacity-90'
            : 'bg-[#2F523E] hover:bg-[#233E2F] hover:shadow-md'
        ]"
      >
        <svg v-if="totalFoto < maxPhotos && !isCounting" class="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
        </svg>
        <svg v-else-if="totalFoto >= maxPhotos" class="w-4 h-4 md:w-5 md:h-5 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>

        <span v-if="isCounting">Menghitung Mundur ({{ countdown }}s)...</span>
        <span v-else-if="totalFoto < maxPhotos">Ambil Foto (Foto {{ totalFoto + 1 }} dari {{ maxPhotos }})</span>
        <span v-else>Semua Slot Foto Terisi ({{ maxPhotos }}/{{ maxPhotos }})</span>

        <span
          v-if="totalFoto < maxPhotos && !isCounting"
          class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight"
        >
          Spasi
        </span>
      </button>

      <div v-if="totalFoto > 0 && retakeIndex === null" class="flex items-center justify-between gap-2 pt-0.5 text-xs">
        <button
          type="button"
          @click="$emit('retakeLast')"
          class="text-[#CD692C] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <span>Foto Ulang Terakhir</span>
        </button>

        <button
          type="button"
          @click="$emit('reset')"
          class="text-gray-500 hover:text-red-600 font-medium inline-flex items-center gap-1 cursor-pointer"
        >
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

const emit = defineEmits(['capture', 'retakeLast', 'reset', 'cancelRetake', 'pilihSlot'])

const videoRef = ref(null)
const mediaStream = ref(null)
const timerDuration = ref(3)
const isCounting = ref(false)
const countdown = ref(null)
const isFlash = ref(false)
const isMirrored = ref(true)
const selectedFilter = ref('normal')
const cameraAspect = ref(16 / 9)

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
  if (!videoRef.value) return
  const video = videoRef.value
  const width = video.videoWidth || 1280
  const height = video.videoHeight || 720

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
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

  emit('capture', {
    url: canvas.toDataURL('image/png')
  })
}

const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1920 },
        height: { ideal: 1080 },
        facingMode: 'user'
      },
      audio: false
    })

    mediaStream.value = stream
    await nextTick()
    if (videoRef.value) {
      videoRef.value.srcObject = stream
      videoRef.value.onloadedmetadata = () => {
        if (videoRef.value.videoWidth && videoRef.value.videoHeight) {
          cameraAspect.value = videoRef.value.videoWidth / videoRef.value.videoHeight
        }
      }
    }

    const [videoTrack] = stream.getVideoTracks()
    if (videoTrack) {
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
  } catch (error) {
    console.error('Akses webcam tidak tersedia:', error)
  }
}

const stopCamera = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop())
    mediaStream.value = null
  }
}

const onKeyDown = (e) => {
  if (e.code === 'Space' && !e.repeat) {
    const activeEl = document.activeElement
    if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
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
  0%, 100% {
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
