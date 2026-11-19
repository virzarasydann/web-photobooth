<template>
  <section class="camera-section min-h-0 lg:h-full flex flex-col justify-between py-1">
    <div class="camera-header flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#DCE7E8] shrink-0">
      <div class="flex items-center gap-2">
        <h2 class="camera-title font-bold text-base md:text-lg text-[#1C2B22]">Live Camera</h2>
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
            class="camera-timer-btn px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer"
            :class="timerDuration === sec ? 'bg-[#2F523E] text-white shadow-2xs' : 'text-[#486153] hover:text-[#2F523E]'">
            {{ sec }}s
          </button>
        </div>
      </div>
    </div>

    <div class="camera-filter-bar flex items-center gap-1.5 overflow-x-auto py-1.5 text-xs no-scrollbar shrink-0">
      <span class="text-[11px] font-bold text-gray-500 uppercase tracking-wider mr-1 shrink-0">Filter:</span>
      <button v-for="filter in filterOptions" :key="filter.id" type="button" @click="selectedFilter = filter.id"
        class="camera-filter-btn px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
        :class="selectedFilter === filter.id ? 'bg-[#2F523E] text-white shadow-xs' : 'bg-white text-[#486153] hover:bg-gray-50 border border-[#DCE7E8]'">
        {{ filter.label }}
      </button>
    </div>

    <div class="camera-viewfinder-wrapper flex-1 min-h-[260px] lg:min-h-0 w-full flex items-center justify-center my-auto py-1">
      <div
        class="camera-viewfinder-box relative flex items-center justify-center rounded-2xl shadow-xl transition-all duration-300 mx-auto"
        :class="[
          mediaStream
            ? 'w-auto h-full max-w-full max-h-[360px] sm:max-h-[420px] md:max-h-[480px] lg:max-h-[520px] xl:max-h-[600px] 2xl:max-h-[700px] aspect-video bg-black overflow-hidden border border-black/20'
            : 'w-full max-w-xl lg:max-w-2xl xl:max-w-3xl h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[420px] max-h-[520px] xl:max-h-[600px] bg-[#111A15] border border-[#2F523E]/30 overflow-y-auto no-scrollbar p-4 sm:p-6 lg:p-8'
        ]"
        :style="mediaStream ? { aspectRatio: '16/9' } : undefined">
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

        <div
          v-if="retakePhotoUrl && !isCounting"
          class="absolute inset-0 w-full h-full z-10"
        >
          <img
            :src="retakePhotoUrl"
            alt="Foto Lama Slot"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/75 backdrop-blur-md text-white text-xs font-semibold shadow-md pointer-events-none border border-white/10">
            <span class="text-[#CD692C] font-bold">Slot {{ retakeIndex !== null ? retakeIndex + 1 : '' }}</span>
            <span class="text-gray-300">• Foto Saat Ini</span>
          </div>
        </div>

        <div
          v-show="mediaStream"
          class="camera-video-container transition-all duration-300"
          :class="[
            retakePhotoUrl && !isCounting
              ? 'camera-retake-pip hidden lg:flex items-center justify-center lg:absolute lg:top-4 lg:right-4 lg:w-56 lg:h-auto lg:aspect-video lg:rounded-xl lg:overflow-hidden lg:border-2 lg:border-white lg:shadow-2xl lg:z-30 lg:bg-black'
              : 'w-full h-full flex items-center justify-center'
          ]"
        >
          <!-- Badge Kamera Live di pojok desktop PiP -->
          <span
            v-if="retakePhotoUrl && !isCounting"
            class="hidden lg:inline-flex absolute top-1.5 left-2 z-30 items-center gap-1 px-1.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold tracking-wider uppercase pointer-events-none"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live</span>
          </span>

          <video ref="videoRef" autoplay playsinline muted @loadedmetadata="onVideoMetadata"
            class="w-full h-full object-cover transition-transform duration-200" :class="{ '-scale-x-100': isMirrored }"
            :style="{ filter: filterMap[selectedFilter] || 'none' }"></video>
        </div>

        <div v-if="isLoadingCamera && !mediaStream && !cameraError"
          class="flex flex-col items-center justify-center text-gray-300 gap-3 p-4 sm:p-6 text-center select-none my-auto">
          <div class="relative flex items-center justify-center">
            <div class="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin"></div>
            <svg class="w-5 h-5 text-emerald-400 absolute" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <div>
            <span class="text-xs sm:text-sm font-semibold text-white block">Menghubungkan ke Kamera...</span>
            <span class="text-[11px] sm:text-xs text-gray-400 mt-0.5 block">Meminta izin dan menyiapkan webcam</span>
          </div>
        </div>

        <div v-else-if="cameraError && !mediaStream"
          class="camera-error-container flex flex-col items-center justify-center text-center p-2 sm:p-4 max-w-md mx-auto z-10 w-full select-none my-auto">
          <div
            class="camera-error-icon w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-2 shadow-lg shrink-0">
            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h3 class="camera-error-title text-white font-bold text-sm sm:text-base tracking-tight mb-1">
            {{ cameraError.title }}
          </h3>

          <p class="camera-error-desc text-gray-300 text-xs leading-relaxed mb-2.5 max-w-xs sm:max-w-sm">
            {{ cameraError.message }}
          </p>

          <div
            class="camera-error-solution w-full bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-2.5 mb-3 text-left flex items-start gap-2 shadow-xs">
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

          <div class="flex items-center gap-2 flex-wrap justify-center shrink-0">
            <button type="button" @click="retryCamera" :disabled="isLoadingCamera"
              class="camera-error-btn inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#2F523E] hover:bg-[#233E2F] active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50">
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" :class="{ 'animate-spin': isLoadingCamera }" fill="none" viewBox="0 0 24 24"
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
            class="mt-2.5 w-full p-2.5 bg-black/60 rounded-xl text-left text-[10px] font-mono text-red-300 border border-red-500/20 break-all select-all max-h-32 overflow-y-auto">
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
          v-if="mediaStream"
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

    <div class="camera-slot-row flex flex-col gap-1.5 py-1.5 px-0.5 shrink-0 border-t border-[#DCE7E8]/70 mt-1">
      <div class="camera-slot-info flex items-center justify-between text-[11px] font-semibold text-gray-600 px-1">
        <span>
          {{ retakeIndex !== null ? 'Sedang Foto Ulang:' : 'Slot Foto Booth:' }}
        </span>
        <span class="text-[10px] text-gray-400">
          {{ daftarFoto.length }} / {{ maxPhotos }} Terisi
        </span>
      </div>

      <div
        class="camera-slot-grid grid gap-2 sm:gap-2.5 lg:gap-3 w-full"
        :style="{ gridTemplateColumns: `repeat(${maxPhotos || 4}, minmax(0, 1fr))` }">
        <button v-for="idx in maxPhotos" :key="idx" type="button"
          :disabled="!daftarFoto[idx - 1] && daftarFoto.length !== idx - 1"
          @click="daftarFoto[idx - 1] ? $emit('pilihSlot', idx - 1) : null"
          class="camera-slot-btn relative h-16 sm:h-18 lg:h-22 xl:h-24 2xl:h-28 rounded-xl lg:rounded-2xl overflow-hidden border-2 transition-all flex flex-col items-center justify-center shadow-2xs group"
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
            class="camera-slot-retake absolute inset-0 bg-[#CD692C]/50 backdrop-blur-2xs flex flex-col items-center justify-center text-white font-bold">
            <span class="text-sm sm:text-base font-black">↺</span>
            <span class="text-[9px] tracking-tight uppercase">Ulang</span>
          </div>

          <span v-if="daftarFoto[idx - 1] && retakeIndex !== idx - 1"
            class="camera-slot-badge absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold tracking-tight">
            Slot {{ idx }}
          </span>

          <div v-else-if="!daftarFoto[idx - 1] && daftarFoto.length === idx - 1"
            class="camera-slot-active flex flex-col items-center justify-center gap-0.5 text-[#2F523E]">
            <div
              class="camera-slot-num-circle w-5 h-5 rounded-full bg-[#EAF2EE] flex items-center justify-center font-bold text-[11px] shadow-2xs">
              {{ idx }}
            </div>
            <span class="camera-slot-num-label text-[9px] font-bold uppercase tracking-wider">Aktif</span>
          </div>

          <div v-else-if="!daftarFoto[idx - 1]" class="camera-slot-empty flex flex-col items-center justify-center gap-0.5 text-gray-400">
            <span class="camera-slot-num-text text-xs font-bold text-gray-400">#{{ idx }}</span>
            <span class="camera-slot-num-sub text-[9px] text-gray-400">Kosong</span>
          </div>
        </button>
      </div>
    </div>

    <div class="camera-action-box flex flex-col gap-1.5 pt-1 shrink-0">
      <div v-if="retakeIndex !== null" class="flex items-center gap-2 w-full">
        <button type="button" @click="startCapture" :disabled="!mediaStream || isCounting || Boolean(cameraError)"
          class="camera-capture-btn flex-1 py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm ring-2 ring-[#CD692C]/30 active:scale-98"
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
          <span v-else>
            <span class="btn-text-full">Ambil Ulang Foto</span>
            <span class="btn-text-short hidden">Foto Ulang</span>
          </span>
          <span v-if="!isCounting && mediaStream && !cameraError"
            class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight">
            Spasi
          </span>
        </button>

        <button type="button" @click="$emit('cancelRetake')" :disabled="isCounting"
          class="camera-cancel-retake-btn py-2.5 md:py-3 px-3.5 sm:px-4 rounded-xl font-bold text-xs md:text-sm text-[#486153] hover:text-[#1C2B22] bg-[#F4F8F8] hover:bg-[#E8F0EE] border border-[#DCE7E8] transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0 shadow-2xs disabled:opacity-50"
          title="Batalkan foto ulang slot ini">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <span class="btn-text-full">Batal Ulang</span>
          <span class="btn-text-short hidden">Batal</span>
        </button>
      </div>

      <button v-else type="button" @click="startCapture"
        :disabled="!mediaStream || isCounting || totalFoto >= maxPhotos || Boolean(cameraError)"
        class="camera-capture-btn w-full py-2.5 md:py-3 px-4 rounded-xl font-bold text-xs md:text-sm text-white flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
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

        <span v-if="cameraError" class="truncate">
          <span class="sm:hidden">Kamera Tidak Tersedia</span>
          <span class="hidden sm:inline">Kamera Tidak Tersedia (Periksa Izin/Perangkat)</span>
        </span>
        <span v-else-if="isLoadingCamera">Menyiapkan Kamera...</span>
        <span v-else-if="isCounting">Menghitung Mundur ({{ countdown }}s)...</span>
        <span v-else-if="totalFoto < maxPhotos">
          <span class="btn-text-full">Ambil Foto (Foto {{ totalFoto + 1 }} dari {{ maxPhotos }})</span>
          <span class="btn-text-short hidden">Ambil Foto ({{ totalFoto + 1 }}/{{ maxPhotos }})</span>
        </span>
        <span v-else>
          <span class="btn-text-full">Semua Slot Foto Terisi ({{ maxPhotos }}/{{ maxPhotos }})</span>
          <span class="btn-text-short hidden">Semua Terisi ({{ maxPhotos }}/{{ maxPhotos }})</span>
        </span>

        <span v-if="totalFoto < maxPhotos && !isCounting && mediaStream && !cameraError"
          class="hidden sm:inline-block ml-1 px-1.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono tracking-tight">
          Spasi
        </span>
      </button>

      <div v-if="totalFoto > 0 && retakeIndex === null" class="camera-secondary-actions flex items-center justify-between gap-1 pt-0.5 text-xs">
        <button type="button" @click="$emit('retakeLast')"
          class="camera-btn-retake-last text-[#CD692C] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          <span class="btn-text-full">Foto Ulang Terakhir</span>
          <span class="btn-text-short hidden">Ulang Terakhir</span>
        </button>

        <button type="button" @click="$emit('reset')"
          class="camera-btn-reset text-gray-500 hover:text-red-600 font-medium inline-flex items-center gap-0.5 cursor-pointer shrink-0">
          <span class="btn-text-full">Reset Semua</span>
          <span class="btn-text-short hidden">Reset</span>
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
  // Selalu kunci rasio viewfinder photobooth ke 16:9 widescreen
  cameraAspect.value = 16 / 9
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

    // Selalu pastikan hasil foto konsisten 16:9 sesuai rasio viewfinder photobooth
    const targetAspect = 16 / 9
    const videoAspect = width / height

    let srcX = 0
    let srcY = 0
    let srcW = width
    let srcH = height

    if (videoAspect < targetAspect) {
      // Video lebih vertikal dari 16:9 (contohnya video kamera HP saat portrait 9:16 atau 3:4)
      // Ambil bagian tengah vertikal agar rasionya tepat 16:9
      srcH = Math.round(width / targetAspect)
      srcY = Math.round((height - srcH) / 2)
    } else if (videoAspect > targetAspect) {
      // Video lebih lebar dari 16:9
      srcW = Math.round(height * targetAspect)
      srcX = Math.round((width - srcW) / 2)
    }

    canvas.width = srcW
    canvas.height = srcH
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

    ctx.drawImage(video, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height)
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
        cameraAspect.value = 16 / 9
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

.camera-viewfinder-box {
  aspect-ratio: 16 / 9 !important;
}

@media (max-width: 1023px) {
  .camera-retake-pip {
    position: static !important;
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 16 / 9 !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
  .camera-retake-pip video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    aspect-ratio: 16 / 9 !important;
  }
}
@media (min-width: 1024px) {
  .camera-retake-pip {
    position: absolute !important;
    top: 1rem !important;
    right: 1rem !important;
    width: 14rem !important;
    height: auto !important;
    aspect-ratio: 16 / 9 !important;
    border-radius: 0.85rem !important;
    border: 2.5px solid #ffffff !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4) !important;
    overflow: hidden !important;
    z-index: 25 !important;
    background: #000000 !important;
  }
  .camera-retake-pip video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    aspect-ratio: 16 / 9 !important;
  }
}

@media (orientation: landscape) and (max-height: 520px) {
  .camera-section {
    --vh-camera: clamp(210px, 56vh, 245px);
    --vw-camera: calc(var(--vh-camera) * 16 / 9);
    display: grid !important;
    grid-template-columns: var(--vw-camera) minmax(0, 1fr) !important;
    grid-template-areas:
      "header header"
      "filter filter"
      "viewfinder slots"
      "viewfinder action" !important;
    column-gap: 0.75rem !important;
    row-gap: 0.25rem !important;
    align-items: stretch !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
    height: auto !important;
  }
  .camera-header {
    grid-area: header !important;
    padding-bottom: 0.2rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .camera-title {
    font-size: 0.8rem !important;
  }
  .camera-timer-btn {
    padding: 0.1rem 0.35rem !important;
    font-size: 0.65rem !important;
  }
  .camera-filter-bar {
    grid-area: filter !important;
    padding-top: 0.1rem !important;
    padding-bottom: 0.15rem !important;
    font-size: 0.65rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .camera-filter-btn {
    padding: 0.1rem 0.45rem !important;
    font-size: 0.65rem !important;
  }
  .camera-viewfinder-wrapper {
    grid-area: viewfinder !important;
    width: var(--vw-camera) !important;
    max-width: var(--vw-camera) !important;
    height: var(--vh-camera) !important;
    min-height: var(--vh-camera) !important;
    max-height: var(--vh-camera) !important;
    padding: 0 !important;
    margin: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    flex-shrink: 0 !important;
  }
  .camera-viewfinder-box {
    width: var(--vw-camera) !important;
    max-width: var(--vw-camera) !important;
    height: var(--vh-camera) !important;
    min-height: var(--vh-camera) !important;
    max-height: var(--vh-camera) !important;
    aspect-ratio: 16/9 !important;
    padding: 0 !important;
    margin: 0 !important;
    transition: none !important;
    flex-shrink: 0 !important;
  }
  .camera-video-container {
    transition: none !important;
  }
  .camera-error-container {
    padding: 0.5rem !important;
  }
  .camera-error-icon {
    width: 2.25rem !important;
    height: 2.25rem !important;
    margin-bottom: 0.25rem !important;
  }
  .camera-error-title {
    font-size: 0.85rem !important;
    margin-bottom: 0.15rem !important;
  }
  .camera-error-desc {
    font-size: 0.72rem !important;
    margin-bottom: 0.35rem !important;
    line-height: 1.3 !important;
  }
  .camera-error-solution {
    padding: 0.35rem 0.6rem !important;
    margin-bottom: 0.35rem !important;
  }
  .camera-error-btn {
    padding: 0.35rem 0.65rem !important;
    font-size: 0.75rem !important;
  }
  .camera-slot-row {
    grid-area: slots !important;
    border-top-width: 0 !important;
    margin-top: 0 !important;
    padding: 0 !important;
    gap: 0.25rem !important;
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .camera-slot-info {
    font-size: 0.68rem !important;
    padding: 0 0.15rem !important;
    max-width: 100% !important;
  }
  .camera-slot-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0.45rem !important;
    max-width: 100% !important;
    width: 100% !important;
  }
  .camera-slot-btn {
    height: 60px !important;
    border-radius: 0.6rem !important;
    transform: none !important;
  }
  .camera-slot-active .camera-slot-num-circle {
    width: 1.4rem !important;
    height: 1.4rem !important;
    font-size: 0.75rem !important;
  }
  .camera-slot-active .camera-slot-num-label {
    font-size: 0.58rem !important;
    letter-spacing: 0 !important;
    line-height: 1 !important;
  }
  .camera-slot-empty .camera-slot-num-text {
    font-size: 0.8rem !important;
    line-height: 1 !important;
  }
  .camera-slot-empty .camera-slot-num-sub {
    font-size: 0.58rem !important;
    line-height: 1 !important;
  }
  .camera-slot-badge {
    font-size: 0.62rem !important;
    padding: 0.1rem 0.3rem !important;
    top: 0.2rem !important;
    left: 0.2rem !important;
  }
  .camera-slot-retake span {
    font-size: 0.75rem !important;
    line-height: 1.1 !important;
  }
  .camera-action-box {
    grid-area: action !important;
    margin-top: auto !important;
    padding-top: 0.25rem !important;
    gap: 0.25rem !important;
    width: 100% !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }
  .camera-capture-btn {
    padding: 0.5rem 0.65rem !important;
    font-size: 0.75rem !important;
    font-weight: 700 !important;
    border-radius: 0.6rem !important;
    width: 100% !important;
    gap: 0.35rem !important;
    white-space: nowrap !important;
  }
  .camera-capture-btn svg {
    width: 1rem !important;
    height: 1rem !important;
    flex-shrink: 0 !important;
  }
  .camera-capture-btn .btn-text-full {
    display: none !important;
  }
  .camera-capture-btn .btn-text-short {
    display: inline !important;
  }
  .camera-cancel-retake-btn {
    padding: 0.5rem 0.65rem !important;
    font-size: 0.75rem !important;
    border-radius: 0.6rem !important;
  }
  .camera-cancel-retake-btn .btn-text-full {
    display: none !important;
  }
  .camera-cancel-retake-btn .btn-text-short {
    display: inline !important;
  }
  .camera-secondary-actions {
    display: flex !important;
    flex-direction: row !important;
    justify-content: space-between !important;
    align-items: center !important;
    gap: 0.35rem !important;
    width: 100% !important;
    padding-top: 0.15rem !important;
  }
  .camera-btn-retake-last {
    font-size: 0.65rem !important;
    line-height: 1 !important;
  }
  .camera-btn-retake-last svg {
    width: 0.8rem !important;
    height: 0.8rem !important;
  }
  .camera-btn-retake-last .btn-text-full {
    display: none !important;
  }
  .camera-btn-retake-last .btn-text-short {
    display: inline !important;
  }
  .camera-btn-reset {
    font-size: 0.65rem !important;
    line-height: 1 !important;
  }
  .camera-btn-reset .btn-text-full {
    display: none !important;
  }
  .camera-btn-reset .btn-text-short {
    display: inline !important;
  }
}
</style>
