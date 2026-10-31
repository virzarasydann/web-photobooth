<template>
    <div class="p-6 max-w-7xl mx-auto flex flex-col gap-6 font-sans">
      <!-- Header Control Bar -->
      <div class="bg-white border border-[#2F523E]/20 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div class="flex items-center gap-3">
          <!-- Input Upload Background -->
          <label class="bg-[#2F523E] hover:bg-[#233f2f] text-white text-sm font-medium px-4 py-2.5 rounded-xl cursor-pointer transition-colors flex items-center gap-2">
            <span>📁 Import Template Gambar</span>
            <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
          </label>
  
          <!-- Button Tambah Slot -->
          <button
            type="button"
            @click="addSlot"
            :disabled="!isBackgroundLoaded"
            class="bg-[#DCE7E8] hover:bg-[#c2d5d7] text-[#2F523E] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
          >
            + Tambah Slot Foto
          </button>
        </div>
  
        <!-- Action Save / Export -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            @click="saveAndDownloadJson"
            :disabled="slots.length === 0"
            class="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            💾 Simpan & Download JSON
          </button>
        </div>
      </div>
  
      <!-- Main Workspace -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <!-- Canvas Area (Kiri) -->
        <div class="lg:col-span-2 bg-gray-100 border border-gray-300 rounded-2xl p-4 min-h-[500px] flex justify-center items-center overflow-auto shadow-inner">
          <div v-show="isBackgroundLoaded" id="canvas-container" class="border border-dashed border-gray-400 bg-white shadow-lg"></div>
          <div v-if="!isBackgroundLoaded" class="text-gray-400 text-sm text-center">
            Silakan klik <b>Import Template Gambar</b> untuk memulai pengaturan slot.
          </div>
        </div>
  
        <!-- Live Inspector & Preview JSON (Kanan) -->
        <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
          <h3 class="font-bold text-[#2F523E] text-base border-b pb-2">Detail Slot Foto ({{ slots.length }})</h3>
          
          <div v-if="slots.length === 0" class="text-xs text-gray-400 italic">
            Belum ada slot. Klik tombol "Tambah Slot Foto" di atas.
          </div>
  
          <div class="max-h-[300px] overflow-y-auto flex flex-col gap-2">
            <div
              v-for="(slotItem, index) in slots"
              :key="slotItem.id"
              class="border border-gray-200 p-3 rounded-xl bg-gray-50 text-xs flex flex-col gap-1"
            >
              <div class="flex justify-between font-semibold text-[#2F523E]">
                <span>Slot #{{ index + 1 }}</span>
                <button @click="removeSlot(index)" class="text-red-500 hover:underline">Hapus</button>
              </div>
              <div class="grid grid-cols-2 gap-1 text-gray-600 mt-1">
                <span>X: {{ Math.round(slotItem.x) }}px</span>
                <span>Y: {{ Math.round(slotItem.y) }}px</span>
                <span>W: {{ Math.round(slotItem.width) }}px</span>
                <span>H: {{ Math.round(slotItem.height) }}px</span>
              </div>
            </div>
          </div>
  
          <!-- Json Output Preview -->
          <div class="mt-2">
            <label class="text-xs font-semibold text-gray-700 block mb-1">Preview JSON Output:</label>
            <pre class="bg-slate-900 text-emerald-400 p-3 rounded-xl text-[11px] max-h-[200px] overflow-auto font-mono">{{ JSON.stringify(generateJsonOutput(), null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onUnmounted } from 'vue'
  import Konva from 'konva'
  
  const isBackgroundLoaded = ref(false)
  const templateName = ref('Custom Template')
  const templateDescription = ref('Photobooth Template')
  const backgroundFileName = ref('template-1.png')
  
  const slots = ref([])
  
  let stage = null
  let layer = null
  let transformer = null
  
  // 1. Handle Upload Gambar Background
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
  
    backgroundFileName.value = file.name
    const url = URL.createObjectURL(file)
    const imgObj = new Image()
  
    imgObj.src = url
    imgObj.onload = () => {
      initKonvaStage(imgObj)
    }
  }
  
  // 2. Inisialisasi Canvas Konva
  const initKonvaStage = (bgImg) => {
    // Bersihkan canvas lama jika ada
    if (stage) stage.destroy()
    slots.value = []
  
    const container = document.getElementById('canvas-container')
    const width = bgImg.naturalWidth || 600
    const height = bgImg.naturalHeight || 800
  
    // Buat Stage & Layer
    stage = new Konva.Stage({
      container: 'canvas-container',
      width: width,
      height: height,
    })
  
    layer = new Konva.Layer()
    stage.add(layer)
  
    // Tambah Gambar Background
    const bgKonva = new Konva.Image({
      x: 0,
      y: 0,
      image: bgImg,
      width: width,
      height: height,
    })
    layer.add(bgKonva)
  
    // Buat Transformer untuk Resize & Rotate
    transformer = new Konva.Transformer({
      rotateEnabled: false,
      keepRatio: false,
      boundBoxFunc: (oldBox, newBox) => {
        if (newBox.width < 30 || newBox.height < 30) return oldBox
        return newBox
      },
    })
    layer.add(transformer)
  
    // Unselect saat klik background kosong
    stage.on('click tap', (e) => {
      if (e.target === bgKonva) {
        transformer.nodes([])
        layer.batchDraw()
      }
    })
  
    isBackgroundLoaded.value = true
    layer.batchDraw()
  }
  
  // 3. Tambahkan Slot Kotak Baru
  const addSlot = () => {
    if (!layer) return
  
    const slotId = Date.now()
    const rect = new Konva.Rect({
      x: 50 + slots.value.length * 20,
      y: 50 + slots.value.length * 20,
      width: 150,
      height: 200,
      fill: 'rgba(47, 82, 62, 0.4)',
      stroke: '#2F523E',
      strokeWidth: 2,
      draggable: true,
      name: `slot-${slotId}`,
    })
  
    // Event Klik untuk Mengaktifkan Transformer
    rect.on('click tap', () => {
      transformer.nodes([rect])
      layer.batchDraw()
    })
  
    // Update data koordinat saat selesai Drag
    rect.on('dragend', () => {
      updateSlotState(slotId, rect)
    })
  
    // Update data koordinat saat selesai Resize
    rect.on('transformend', () => {
      const scaleX = rect.scaleX()
      const scaleY = rect.scaleY()
  
      // Reset scale agar width & height bernilai absolut
      rect.scaleX(1)
      rect.scaleY(1)
      rect.width(Math.round(Math.max(30, rect.width() * scaleX)))
      rect.height(Math.round(Math.max(30, rect.height() * scaleY)))
  
      updateSlotState(slotId, rect)
    })
  
    layer.add(rect)
    transformer.nodes([rect])
    layer.batchDraw()
  
    // Simpan ke state Vue
    slots.value.push({
      id: slotId,
      x: rect.x(),
      y: rect.y(),
      width: rect.width(),
      height: rect.height(),
      node: rect,
    })
  }
  
  // Update State Vue dari Node Konva
  const updateSlotState = (id, rectNode) => {
    const item = slots.value.find((s) => s.id === id)
    if (item) {
      item.x = Math.round(rectNode.x())
      item.y = Math.round(rectNode.y())
      item.width = Math.round(rectNode.width())
      item.height = Math.round(rectNode.height())
    }
  }
  
  // Hapus Slot
  const removeSlot = (index) => {
    const target = slots.value[index]
    if (target && target.node) {
      target.node.destroy()
      transformer.nodes([])
      slots.value.splice(index, 1)
      layer.batchDraw()
    }
  }
  
  // Format Struktur JSON Output
  const generateJsonOutput = () => {
    return [
      {
        id: 1,
        name: templateName.value,
        description: templateDescription.value,
        backgroundUrl: `/photobooth/${backgroundFileName.value}`,
        slot: slots.value.length,
        slotsConfig: slots.value.map((s, idx) => ({
          slotIndex: idx + 1,
          x: s.x,
          y: s.y,
          width: s.width,
          height: s.height,
        })),
      },
    ]
  }
  
  // 4. Simpan & Unduh File JSON
  const saveAndDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(generateJsonOutput(), null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'template-photo.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }
  
  onUnmounted(() => {
    if (stage) stage.destroy()
  })
  </script>