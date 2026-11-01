<template>
  <section class="bg-white rounded-2xl max-h-max">
    <div class="mx-3.5 pb-2">
      <div class="mt-2 flex items-center">
        <h1 class="font-semibold text-2xl">PILIH TEMPLATE DESAIN</h1>
      </div>

      <div
        class="mt-3 bg-[#2F523E] text-center p-2 rounded-2xl cursor-pointer"
        data-section="button-modal"
      >
        <button
          type="button"
          @click="isOpenModal = true"
          class="cursor-pointer text-[#FFFFFF] font-semibold"
        >
          Tekan untuk menampilkan seluruh template
        </button>
      </div>

      <ListTemplateModal
        v-model:is-open="isOpenModal"
        @onSelectTemplate="parsingObject"
      ></ListTemplateModal>
    </div>

   
    <div class="flex justify-center p-4 overflow-auto">
      <div ref="containerRef"></div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import ListTemplateModal from './ListTemplateModal.vue'

import Konva from 'konva'

const props = defineProps({
  captured: {
    type: Array,
    default: () => []
  }
})

const isOpenModal = ref(false)
const containerRef = ref(null)
const objectTemplate = ref(null)

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

const renderCanvas = async () => {
  if (!containerRef.value || !objectTemplate.value) return

  const template = objectTemplate.value

  let bgImgObj
  try {
    bgImgObj = await loadImage(template.backgroundUrl)
  } catch (e) {
    console.error('Gagal memuat background template:', e)
    return
  }

  
  const nativeWidth = bgImgObj.width
  const nativeHeight = bgImgObj.height

  
  const containerWidth = containerRef.value.offsetWidth || nativeWidth
  
  
  const scale = Math.min(containerWidth / nativeWidth, 1)

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

  
  if (template.slotsConfig && Array.isArray(template.slotsConfig)) {
    for (let i = 0; i < template.slotsConfig.length; i++) {
      const slot = template.slotsConfig[i]
      const photoUrl = props.captured[i]

      if (photoUrl) {
        try {
          const photoImgObj = await loadImage(photoUrl)
          const konvaPhoto = new Konva.Image({
            image: photoImgObj,
            x: slot.x,
            y: slot.y,
            width: slot.width,
            height: slot.height
          })
          layer.add(konvaPhoto)
        } catch (err) {
          console.error(`Gagal render foto ke slot ${slot.slotIndex}:`, err)
        }
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

const parsingObject = (object) => {
  objectTemplate.value = object
}

watch(
  () => [props.captured, objectTemplate.value],
  () => {
    renderCanvas()
  },
  { deep: true }
)

onMounted(() => {
  renderCanvas()

  if (containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      renderCanvas()
    })
    resizeObserver.observe(containerRef.value)
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