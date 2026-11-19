<template>
  <section
    class="min-h-0 lg:h-full flex flex-col justify-between py-1"
  >
    <div
      class="template-header flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[#DCE7E8] shrink-0"
    >
      <div>
        <h2
          class="template-title font-bold text-base md:text-lg text-[#1C2B22]"
        >
          Desain Strip Foto
        </h2>
        <p class="template-subtitle text-[11px] md:text-xs text-gray-500">
          {{ template?.name || 'Template Desain' }} •
          {{ template?.slot || 4 }} Slot Foto
        </p>
      </div>

      <button
        type="button"
        @click="modalTemplate = true"
        class="template-btn-change inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#2F523E] bg-white border border-[#DCE7E8] hover:bg-[#2F523E] hover:text-white transition-all cursor-pointer shadow-2xs active:scale-95"
      >
        <svg
          class="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
          />
        </svg>
        <span>Ganti Template</span>
      </button>
    </div>

    <div
      ref="canvasWrapperRef"
      class="template-canvas-wrapper flex-1 min-h-[260px] lg:min-h-0 w-full flex justify-center items-center py-2 overflow-hidden my-1"
    >
      <div
        ref="containerRef"
        class="drop-shadow-2xl flex items-center justify-center transition-transform"
      ></div>
    </div>

    <div
      class="template-action-footer flex flex-col gap-1.5 pt-2 border-t border-[#DCE7E8] shrink-0"
    >
      <div
        v-if="daftarFoto.length > 0"
        class="flex flex-col sm:flex-row items-center gap-2"
      >
        <button
          type="button"
          @click="unduhFoto"
          class="template-btn-action w-full sm:flex-1 py-2 sm:py-2.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-[#CD692C] hover:bg-[#B85820] transition-all cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:scale-98"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          <span>Unduh Strip Foto (.PNG)</span>
        </button>

        <button
          type="button"
          @click="cetakFoto"
          class="template-btn-action w-full sm:w-auto py-2 sm:py-2.5 px-3.5 rounded-xl text-xs font-semibold text-[#2F523E] bg-white border border-[#DCE7E8] hover:bg-gray-50 transition-all cursor-pointer shadow-2xs flex items-center justify-center gap-1.5 active:scale-98"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
          <span>Cetak</span>
        </button>
      </div>

      <p
        class="template-helper-text text-[10px] md:text-[11px] text-gray-500 text-center"
      >
        {{
          daftarFoto.length > 0
            ? 'Format Strip Foto HD siap disimpan atau dicetak'
            : 'Tekan Ambil Foto (atau Spasi) pada kamera untuk mengisi slot'
        }}
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
    default: () => [],
  },
  templateAktif: {
    type: Object,
    default: null,
  },
  retakeIndex: {
    type: Number,
    default: null,
  },
})

const emit = defineEmits([
  'pilihTemplate',
  'reset',
  'pilihSlot',
])

const modalTemplate = ref(false)
const containerRef = ref(null)
const canvasWrapperRef = ref(null)
const template = ref(
  props.templateAktif || TemplateJson[0] || null,
)

let stage = null
let layer = null
let resizeObserver = null
let renderId = 0 // penanda render terbaru
let skalaSekarang = 1 // skala tampilan, dipakai saat unduh/cetak

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
    height: cropHeight,
  }
}

// Template lama (atau template yang belum punya slotsConfig)
// tidak punya posisi slot. Untuk itu slot disusun otomatis:
//  - gambar cukup lebar  -> 2 kolom (contoh 2x2 atau 2x3)
//  - gambar sempit       -> 1 kolom ke bawah (strip klasik)
const buatSlotOtomatis = (jumlah, lebar, tinggi) => {
  const kolom =
    lebar / tinggi >= 0.65 && jumlah >= 4 ? 2 : 1
  const baris = Math.ceil(jumlah / kolom)
  const jarak = lebar * 0.04
  const tepi = lebar * 0.08
  const lebarSlot =
    (lebar - tepi * 2 - jarak * (kolom - 1)) / kolom
  const tinggiSlot =
    (tinggi - tepi * 2 - jarak * (baris - 1)) / baris

  const hasil = []
  for (let i = 0; i < jumlah; i++) {
    hasil.push({
      slotIndex: i + 1,
      shape: 'rect',
      x: Math.round(
        tepi + (i % kolom) * (lebarSlot + jarak),
      ),
      y: Math.round(
        tepi + Math.floor(i / kolom) * (tinggiSlot + jarak),
      ),
      width: Math.round(lebarSlot),
      height: Math.round(tinggiSlot),
    })
  }
  return hasil
}

// Ambil daftar slot: pakai slotsConfig kalau ada, kalau tidak buat otomatis
const ambilDaftarSlot = (tmpl, lebar, tinggi) => {
  if (
    Array.isArray(tmpl.slotsConfig) &&
    tmpl.slotsConfig.length > 0
  ) {
    return tmpl.slotsConfig
  }
  return buatSlotOtomatis(tmpl.slot || 4, lebar, tinggi)
}

const renderCanvas = async () => {
  if (!containerRef.value || !template.value) return

  const currentTemplate = template.value
  const myRenderId = ++renderId

  let bgImgObj
  try {
    bgImgObj = await loadImage(
      currentTemplate.backgroundUrl,
    )
  } catch (e) {
    console.error('Gagal memuat background template:', e)
    return
  }
  // Kalau sudah ada render yang lebih baru, hentikan yang ini
  if (myRenderId !== renderId) return

  const nativeWidth = bgImgObj.width || 320
  const nativeHeight = bgImgObj.height || 960

  const wrapper =
    canvasWrapperRef.value ||
    containerRef.value?.parentElement
  const availWidth = Math.max(
    60,
    (wrapper?.clientWidth || 260) - 16,
  )
  const availHeight = Math.max(
    80,
    (wrapper?.clientHeight || 360) - 16,
  )

  const widthScale = availWidth / nativeWidth
  const heightScale = availHeight / nativeHeight
  const scale = Math.min(widthScale, heightScale, 2.0)
  skalaSekarang = scale

  if (!stage) {
    stage = new Konva.Stage({
      container: containerRef.value,
      width: nativeWidth * scale,
      height: nativeHeight * scale,
    })
    layer = new Konva.Layer()
    stage.add(layer)
  } else {
    stage.width(nativeWidth * scale)
    stage.height(nativeHeight * scale)
    layer.destroyChildren()
  }

  stage.scale({ x: scale, y: scale })

  const isOverlay = currentTemplate.isOverlay === true

  const konvaBg = new Konva.Image({
    image: bgImgObj,
    x: 0,
    y: 0,
    width: nativeWidth,
    height: nativeHeight,
  })

  // Jika bukan overlay (background solid), gambar template di dasar/bawah
  if (!isOverlay) {
    layer.add(konvaBg)
  }

  const daftarSlot = ambilDaftarSlot(
    currentTemplate,
    nativeWidth,
    nativeHeight,
  )

  for (let i = 0; i < daftarSlot.length; i++) {
    const slot = daftarSlot[i]
    const nomor = slot.slotIndex || i + 1
    const bulat = slot.shape === 'circle'
    const photoUrl = props.daftarFoto[i]
    const tengahX = slot.x + slot.width / 2
    const tengahY = slot.y + slot.height / 2
    const radius = Math.min(slot.width, slot.height) / 2

    // Skala tipografi dan garis proporsional terhadap ukuran slot (cocok untuk HD dan LD)
    const fontSize = Math.max(12, Math.round(slot.height * 0.08))
    const strokeWidth = Math.max(1.5, Math.round(slot.width * 0.008))
    const dashLen = Math.max(4, Math.round(slot.width * 0.02))

    if (photoUrl) {
      try {
        const photoImgObj = await loadImage(photoUrl)
        if (myRenderId !== renderId) return

        // Untuk template overlay transparan, beri sedikit bleed (2-4px) ke bawah bingkai agar tidak ada celah garis putih
        const bleed = isOverlay ? Math.max(2, Math.round(slot.width * 0.01)) : 0
        const photoX = slot.x - bleed
        const photoY = slot.y - bleed
        const photoW = slot.width + bleed * 2
        const photoH = slot.height + bleed * 2

        const konvaPhoto = new Konva.Image({
          image: photoImgObj,
          x: photoX,
          y: photoY,
          width: photoW,
          height: photoH,
          crop: hitungCrop(
            photoImgObj,
            photoW,
            photoH,
          ),
        })

        if (bulat) {
          // Slot bulat: foto dipotong membentuk lingkaran
          const grup = new Konva.Group({
            clipFunc: (ctx) => {
              ctx.arc(
                tengahX,
                tengahY,
                radius + (isOverlay ? bleed : 0),
                0,
                Math.PI * 2,
                false,
              )
            },
          })
          grup.add(konvaPhoto)
          layer.add(grup)
        } else {
          layer.add(konvaPhoto)
        }
      } catch (err) {
        console.error(
          `Gagal render foto ke slot ${nomor}:`,
          err,
        )
      }
    } else {
      // Slot kosong: kotak atau lingkaran putus-putus
      const penanda = bulat
        ? new Konva.Circle({
            x: tengahX,
            y: tengahY,
            radius: radius,
            fill: '#F4F7F7',
            stroke: '#D3E0E1',
            strokeWidth: strokeWidth,
            dash: [dashLen, dashLen],
          })
        : new Konva.Rect({
            x: slot.x,
            y: slot.y,
            width: slot.width,
            height: slot.height,
            fill: '#F4F7F7',
            stroke: '#D3E0E1',
            strokeWidth: strokeWidth,
            dash: [dashLen, dashLen],
          })
      layer.add(penanda)

      const slotText = new Konva.Text({
        x: slot.x,
        y: Math.round(tengahY - fontSize / 2),
        width: slot.width,
        text: `Slot ${nomor}`,
        fontSize: fontSize,
        fontFamily: 'sans-serif',
        fontStyle: 'bold',
        fill: '#94A3B8',
        align: 'center',
      })
      layer.add(slotText)
    }
  }

  // Jika overlay (PNG dengan lubang transparan), gambar bingkai DI ATAS foto
  // sehingga stiker, ornamen, dan lengkungan bingkai template menutupi pinggir foto dengan rapi
  if (isOverlay) {
    layer.add(konvaBg)
  }

  layer.batchDraw()
}

const gantiTemplate = (obj) => {
  template.value = obj
  emit('pilihTemplate', obj)
}

const unduhFoto = () => {
  if (!stage) return
  const pr = Math.min(4, Math.max(0.5, skalaSekarang > 0 ? 1 / skalaSekarang : 1))
  const dataURL = stage.toDataURL({
    pixelRatio: pr,
  })
  const link = document.createElement('a')
  link.download = `photobooth-strip-${Date.now()}.png`
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const cetakFoto = () => {
  if (!stage) return
  const pr = Math.min(4, Math.max(0.5, skalaSekarang > 0 ? 1 / skalaSekarang : 1))
  const dataURL = stage.toDataURL({
    pixelRatio: pr,
  })
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
  },
)

watch(
  () => [props.daftarFoto, template.value],
  () => {
    renderCanvas()
  },
  { deep: true },
)

let resizeTimer = null

onMounted(() => {
  renderCanvas()

  const targetEl =
    canvasWrapperRef.value || containerRef.value
  if (targetEl) {
    resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        renderCanvas()
      }, 50)
    })
    resizeObserver.observe(targetEl)
  }
})

onUnmounted(() => {
  if (resizeTimer) {
    clearTimeout(resizeTimer)
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
  if (stage) {
    stage.destroy()
  }
})
</script>

<style scoped>
@media (orientation: landscape) and (max-height: 520px) {
  .template-header {
    padding-bottom: 0.2rem !important;
  }
  .template-title {
    font-size: 0.8rem !important;
  }
  .template-subtitle {
    font-size: 0.65rem !important;
  }
  .template-btn-change {
    padding: 0.15rem 0.45rem !important;
    font-size: 0.65rem !important;
  }
  .template-canvas-wrapper {
    min-height: 110px !important;
    max-height: 220px !important;
    padding: 0.15rem 0 !important;
    margin: 0 !important;
  }
  .template-action-footer {
    padding-top: 0.15rem !important;
    gap: 0.15rem !important;
  }
  .template-btn-action {
    padding-top: 0.35rem !important;
    padding-bottom: 0.35rem !important;
    font-size: 0.7rem !important;
    border-radius: 0.5rem !important;
  }
  .template-helper-text {
    display: none !important;
  }
}
</style>
