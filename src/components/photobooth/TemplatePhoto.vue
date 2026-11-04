<template>
  <section class="h-full min-h-0 flex flex-col justify-between py-1">
    <div class="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#DCE7E8] shrink-0">
      <div>
        <h2 class="font-bold text-base md:text-lg text-[#1C2B22]">Desain Strip Foto</h2>
        <p class="text-[11px] md:text-xs text-gray-500">
          {{ template?.name || 'Template Desain' }} • {{ template?.slot || 4 }} Slot Foto
        </p>
      </div>

      <button
        type="button"
        @click="modalTemplate = true"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#2F523E] bg-white border border-[#DCE7E8] hover:bg-[#2F523E] hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95"
      >
        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
        </svg>
        <span>Ganti Template</span>
      </button>
    </div>

    <div
      ref="canvasWrapperRef"
      class="flex-1 min-h-0 w-full flex justify-center items-center py-2 overflow-hidden my-1"
    >
      <div ref="containerRef" class="drop-shadow-2xl flex items-center justify-center transition-transform"></div>
    </div>

    <div class="flex flex-col gap-1.5 pt-2 border-t border-[#DCE7E8] shrink-0">
      <div v-if="daftarFoto.length > 0" class="flex flex-col sm:flex-row items-center gap-2">
        <button
          type="button"
          @click="unduhFoto"
          class="w-full sm:flex-1 py-2 sm:py-2.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#CD692C] hover:bg-[#B85820] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          <span>Unduh Strip Foto (.PNG)</span>
        </button>

        <button
          type="button"
          @click="cetakFoto"
          class="w-full sm:w-auto py-2 sm:py-2.5 px-3.5 rounded-xl text-xs font-semibold text-[#2F523E] bg-white border border-[#DCE7E8] hover:bg-gray-50 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 active:scale-98"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
          </svg>
          <span>Cetak</span>
        </button>
      </div>

      <p class="text-[10px] md:text-[11px] text-gray-500 text-center">
        {{ daftarFoto.length > 0 ? 'Format Strip Foto HD siap disimpan atau dicetak' : 'Tekan Ambil Foto (atau Spasi) pada kamera untuk mengisi slot' }}
      </p>
    </div>

    <ListTemplateModal
      v-model:is-open="modalTemplate"
      :templateAktif="template"
      @pilihTemplate="gantiTemplate"
    />
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import TemplateJson from '@/config/DataSource/template-photo.json'
import ListTemplateModal from './ListTemplateModal.vue'
import Konva from 'konva'

const props = defineProps({
  daftarFoto: {
    type: Array,
    default: () => []
  },
  templateAktif: {
    type: Object,
    default: null
  },
  retakeIndex: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['pilihTemplate', 'reset', 'pilihSlot'])

const modalTemplate = ref(false)
const containerRef = ref(null)
const canvasWrapperRef = ref(null)
const template = ref(props.templateAktif || TemplateJson[0] || null)

let stage = null
let layer = null
let resizeObserver = null

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = src
  })
}

const hitungCrop = (image, targetWidth, targetHeight) => {
  const imgWidth = image.naturalWidth || image.width
  const imgHeight = image.naturalHeight || image.height
  const imageAspect = imgWidth / imgHeight
  const targetAspect = targetWidth / targetHeight

  let cropWidth = imgWidth
  let cropHeight = imgHeight
  let cropX = 0
  let cropY = 0

  if (imageAspect > targetAspect) {
    cropWidth = imgHeight * targetAspect
    cropX = (imgWidth - cropWidth) / 2
  } else {
    cropHeight = imgWidth / targetAspect
    cropY = (imgHeight - cropHeight) / 2
  }

  return {
    x: cropX,
    y: cropY,
    width: cropWidth,
    height: cropHeight
  }
}

const renderCanvas = async () => {
  if (!containerRef.value || !template.value) return

  const currentTemplate = template.value

  let bgImgObj
  try {
    bgImgObj = await loadImage(currentTemplate.backgroundUrl)
  } catch (e) {
    console.error('Gagal memuat background template:', e)
    return
  }

  const nativeWidth = bgImgObj.width || 320
  const nativeHeight = bgImgObj.height || 960

  const wrapper = canvasWrapperRef.value || containerRef.value?.parentElement
  const availWidth = Math.max(120, (wrapper?.clientWidth || 260) - 16)
  const availHeight = Math.max(160, (wrapper?.clientHeight || 360) - 16)

  const widthScale = availWidth / nativeWidth
  const heightScale = availHeight / nativeHeight
  const scale = Math.min(widthScale, heightScale, 2.0)

  if (!stage) {
    stage = new Konva.Stage({
      container: containerRef.value,
      width: nativeWidth * scale,
      height: nativeHeight * scale
    })
    layer = new Konva.Layer()
    stage.add(layer)
  } else {
    stage.width(nativeWidth * scale)
    stage.height(nativeHeight * scale)
    layer.destroyChildren()
  }

  stage.scale({ x: scale, y: scale })

  if (currentTemplate.slotsConfig && Array.isArray(currentTemplate.slotsConfig)) {
    for (let i = 0; i < currentTemplate.slotsConfig.length; i++) {
      const slot = currentTemplate.slotsConfig[i]
      const photoUrl = props.daftarFoto[i]

      if (photoUrl) {
        try {
          const photoImgObj = await loadImage(photoUrl)
          const konvaPhoto = new Konva.Image({
            image: photoImgObj,
            x: slot.x,
            y: slot.y,
            width: slot.width,
            height: slot.height,
            crop: hitungCrop(photoImgObj, slot.width, slot.height)
          })
          layer.add(konvaPhoto)
        } catch (err) {
          console.error(`Gagal render foto ke slot ${slot.slotIndex}:`, err)
        }
      } else {
        const emptyRect = new Konva.Rect({
          x: slot.x,
          y: slot.y,
          width: slot.width,
          height: slot.height,
          fill: '#F4F7F7',
          stroke: '#D3E0E1',
          strokeWidth: 1,
          dash: [4, 4]
        })
        layer.add(emptyRect)

        const slotText = new Konva.Text({
          x: slot.x,
          y: slot.y + slot.height / 2 - 8,
          width: slot.width,
          text: `Slot ${slot.slotIndex || i + 1}`,
          fontSize: 12,
          fontFamily: 'sans-serif',
          fill: '#94A3B8',
          align: 'center'
        })
        layer.add(slotText)
      }
    }
  }

  const konvaBg = new Konva.Image({
    image: bgImgObj,
    x: 0,
    y: 0,
    width: nativeWidth,
    height: nativeHeight
  })
  layer.add(konvaBg)

  layer.batchDraw()
}

const gantiTemplate = (obj) => {
  template.value = obj
  emit('pilihTemplate', obj)
}

const unduhFoto = () => {
  if (!stage) return
  const dataURL = stage.toDataURL({ pixelRatio: 2 })
  const link = document.createElement('a')
  link.download = `photobooth-strip-${Date.now()}.png`
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const cetakFoto = () => {
  if (!stage) return
  const dataURL = stage.toDataURL({ pixelRatio: 2 })
  const win = window.open('', '_blank')
  if (win) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Cetak Strip Foto</title>
          <style>
            @page { margin: 0; size: auto; }
            body { margin: 0; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #fff; }
            img { max-height: 96vh; width: auto; object-fit: contain; }
          </style>
        </head>
        <body>
          <img src="${dataURL}" onload="window.print(); window.close();" />
        </body>
      </html>
    `)
    win.document.close()
  }
}

watch(
  () => props.templateAktif,
  (val) => {
    if (val) template.value = val
  }
)

watch(
  () => [props.daftarFoto, template.value],
  () => {
    renderCanvas()
  },
  { deep: true }
)

onMounted(() => {
  renderCanvas()

  const targetEl = canvasWrapperRef.value || containerRef.value
  if (targetEl) {
    resizeObserver = new ResizeObserver(() => {
      renderCanvas()
    })
    resizeObserver.observe(targetEl)
  }
})

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (stage) {
    stage.destroy()
  }
})
</script>
