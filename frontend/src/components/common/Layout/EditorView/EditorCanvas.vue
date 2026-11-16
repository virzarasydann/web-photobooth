<script setup>
import KartuEditor from './KartuEditor.vue'

const props = defineProps({
  idKanvas: {
    type: String,
    default: 'canvas-container',
  },
  gambarSiap: Boolean,
  adaSlotTerpilih: Boolean,
})

const emit = defineEmits(['geser'])

// Tombol panah menggeser slot yang dipilih (Shift = 10 titik)
const handleKeydown = (e) => {
  if (!props.adaSlotTerpilih) return

  const arah = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  }[e.key]
  if (!arah) return

  e.preventDefault()
  const langkah = e.shiftKey ? 10 : 1
  emit('geser', arah[0] * langkah, arah[1] * langkah)
}
</script>

<template>
  <KartuEditor
    tabindex="0"
    role="group"
    aria-label="Area canvas template"
    aria-describedby="petunjuk-canvas"
    class="flex max-h-[85vh] min-h-[500px] overflow-auto bg-[#FBF7EC] bg-[radial-gradient(#d8d0b8_1px,transparent_1px)] bg-[length:16px_16px] p-4 lg:col-span-2"
    @keydown="handleKeydown"
  >
    <p id="petunjuk-canvas" class="sr-only">
      Pilih slot, lalu geser dengan tombol panah. Tahan
      Shift untuk geser lebih jauh.
    </p>

    <div
      v-show="gambarSiap"
      :id="idKanvas"
      class="m-auto bg-white shadow-[0_4px_16px_rgba(21,58,43,0.25)]"
    ></div>

    <div
      v-if="!gambarSiap"
      class="m-auto rounded-lg border-2 border-dashed border-[#153A2B]/40 bg-white/70 px-8 py-6 text-center text-sm text-[#5b6b64]"
    >
      Belum ada gambar. Klik
      <b class="text-[#153A2B]">Pilih Gambar Template</b>
      untuk mulai.
    </div>
  </KartuEditor>
</template>
