<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['tutup'])

// Ukuran asli gambar, dipakai untuk menghitung posisi kotak slot
const lebarAsli = ref(0)
const tinggiAsli = ref(0)
const gambarGagal = ref(false)

// Setelah gambar tampil, ambil ukuran aslinya
// supaya posisi kotak slot bisa dihitung dengan benar
const gambarSelesaiDimuat = (e) => {
  lebarAsli.value = e.target.naturalWidth
  tinggiAsli.value = e.target.naturalHeight
}

// Fokus pindah ke tombol Tutup saat popup terbuka,
// dan kembali ke tombol Preview saat popup ditutup
const tombolTutup = ref(null)
let elemenSebelumnya = null

onMounted(() => {
  elemenSebelumnya = document.activeElement
  tombolTutup.value.focus()
})

onBeforeUnmount(() => {
  if (elemenSebelumnya) elemenSebelumnya.focus()
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    @click.self="emit('tutup')"
    @keydown.esc="emit('tutup')"
  >
    <!-- Hanya ada satu tombol di sini, jadi Tab tidak boleh keluar popup -->
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="judul-preview"
      class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border-2 border-[#153A2B] bg-white p-5 shadow-[6px_6px_0_#153A2B]"
      @keydown.tab.prevent
    >
      <div
        class="mb-3 flex items-start justify-between gap-3"
      >
        <div>
          <h3 id="judul-preview" class="font-bold">
            {{ item.name }}
          </h3>
          <p class="text-xs text-[#5b6b64]">
            {{ item.description }} · {{ item.slot }} slot
          </p>
        </div>
        <button
          ref="tombolTutup"
          type="button"
          class="cursor-pointer text-sm font-semibold text-[#B42318] hover:underline"
          @click="emit('tutup')"
        >
          Tutup
        </button>
      </div>

      <!-- Gambar template, kotak slot ditumpuk di atasnya -->
      <div class="relative mx-auto w-fit">
        <img
          :src="item.backgroundUrl"
          :alt="item.name"
          class="block max-h-[65vh] w-auto rounded border border-[#dce8e2]"
          @load="gambarSelesaiDimuat"
          @error="gambarGagal = true"
        />

        <div v-if="lebarAsli > 0" aria-hidden="true">
          <div
            v-for="(s, i) in item.slotsConfig"
            :key="i"
            class="absolute flex items-center justify-center border-2 border-[#153A2B] bg-[#FCC046]/50 text-xs font-bold"
            :class="
              s.shape === 'circle' ? 'rounded-full' : ''
            "
            :style="{
              left: (s.x / lebarAsli) * 100 + '%',
              top: (s.y / tinggiAsli) * 100 + '%',
              width: (s.width / lebarAsli) * 100 + '%',
              height: (s.height / tinggiAsli) * 100 + '%',
            }"
          >
            {{ s.slotIndex }}
          </div>
        </div>
      </div>

      <p
        v-if="gambarGagal"
        role="alert"
        class="mt-3 text-center text-xs font-semibold text-[#B42318]"
      >
        Gambar template tidak bisa dimuat.
      </p>
      <p
        v-else-if="!item.slotsConfig"
        class="mt-3 text-center text-xs text-[#5b6b64] italic"
      >
        Template ini belum punya data posisi slot.
      </p>
    </div>
  </div>
</template>
