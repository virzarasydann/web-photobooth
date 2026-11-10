<template>
  <div
    class="mx-auto flex max-w-7xl flex-col gap-6 p-6 font-sans text-[#153A2B]"
  >
    <!-- Judul halaman -->
    <div>
      <p
        class="mb-1 text-xs font-semibold tracking-[0.15em] text-[#7E3300] uppercase"
      >
        Studio Template
      </p>
      <h1 class="text-2xl font-extrabold md:text-3xl">
        Editor Template Photostrip
      </h1>
      <p class="mt-1 text-sm text-[#5b6b64]">
        Pilih gambar bingkai, lalu atur posisi slot foto
        dengan cara digeser (drag and drop).
      </p>
    </div>

    <!-- Toolbar -->
    <div
      class="flex flex-wrap items-center gap-3 rounded-xl border-2 border-[#153A2B] bg-white p-3 shadow-[4px_4px_0_#153A2B]"
    >
      <label
        class="cursor-pointer rounded-lg bg-[#153A2B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2D5141]"
      >
        Pilih Gambar Template
        <input
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleImageUpload"
        />
      </label>

      <div
        class="flex items-center gap-2 border-l-2 border-[#153A2B]/15 pl-3"
      >
        <span
          class="text-xs font-semibold text-[#5b6b64] uppercase"
        >
          Tambah slot
        </span>

        <!-- Tombol slot kotak -->
        <button
          type="button"
          @click="addSlot('kotak')"
          :disabled="!isBackgroundLoaded"
          class="flex items-center gap-2 rounded-lg border-2 border-[#153A2B] bg-white px-3 py-1.5 text-sm font-semibold hover:bg-[#FCC046] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <rect
              x="4"
              y="4"
              width="16"
              height="16"
              rx="2"
            />
          </svg>
          Kotak
        </button>

        <!-- Tombol slot bulat -->
        <button
          type="button"
          @click="addSlot('bulat')"
          :disabled="!isBackgroundLoaded"
          class="flex items-center gap-2 rounded-lg border-2 border-[#153A2B] bg-white px-3 py-1.5 text-sm font-semibold hover:bg-[#FCC046] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <circle cx="12" cy="12" r="8" />
          </svg>
          Bulat
        </button>
      </div>

      <div class="ml-auto flex items-center gap-2">
        <!-- Cadangan: unduh JSON lalu pasang manual -->
        <button
          type="button"
          @click="saveAndDownloadJson"
          :disabled="slots.length === 0"
          class="rounded-lg border-2 border-[#153A2B] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#E6F0EB] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
        >
          Unduh JSON
        </button>

        <!-- Simpan otomatis ke folder proyek -->
        <button
          type="button"
          @click="simpanTemplate"
          :disabled="slots.length === 0 || sedangMenyimpan"
          class="rounded-lg border-2 border-[#153A2B] bg-[#FCC046] px-4 py-2 text-sm font-bold hover:bg-[#f5b52f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#FCC046]"
        >
          {{
            sedangMenyimpan
              ? 'Menyimpan...'
              : 'Simpan Template'
          }}
        </button>
      </div>
    </div>

    <!-- Pesan hasil simpan -->
    <p
      v-if="pesanSimpan"
      class="rounded-lg border-2 px-4 py-2 text-sm font-semibold"
      :class="
        simpanBerhasil
          ? 'border-[#153A2B] bg-[#E6F0EB]'
          : 'border-[#B42318] bg-[#FDECEA] text-[#B42318]'
      "
    >
      {{ pesanSimpan }}
    </p>

    <!-- Area kerja -->
    <div
      class="grid grid-cols-1 items-start gap-6 lg:grid-cols-3"
    >
      <!-- Canvas (kiri) -->
      <div
        class="flex max-h-[85vh] min-h-[500px] overflow-auto rounded-xl border-2 border-[#153A2B] bg-[#FBF7EC] bg-[radial-gradient(#d8d0b8_1px,transparent_1px)] bg-[length:16px_16px] p-4 shadow-[4px_4px_0_#153A2B] lg:col-span-2"
      >
        <div
          v-show="isBackgroundLoaded"
          id="canvas-container"
          class="m-auto bg-white shadow-[0_4px_16px_rgba(21,58,43,0.25)]"
        ></div>

        <div
          v-if="!isBackgroundLoaded"
          class="m-auto rounded-lg border-2 border-dashed border-[#153A2B]/40 bg-white/70 px-8 py-6 text-center text-sm text-[#5b6b64]"
        >
          Belum ada gambar. Klik
          <b class="text-[#153A2B]">
            Pilih Gambar Template
          </b>
          untuk mulai.
        </div>
      </div>

      <!-- Daftar slot (kanan) -->
      <div
        class="flex flex-col gap-4 rounded-xl border-2 border-[#153A2B] bg-white p-5 shadow-[4px_4px_0_#153A2B]"
      >
        <!-- Data template baru -->
        <div class="flex flex-col gap-3">
          <label class="text-xs font-semibold">
            Nama Template
            <input
              v-model="templateName"
              type="text"
              placeholder="Contoh: Midnight Party"
              class="mt-1 w-full rounded-lg border-2 border-[#dce8e2] px-3 py-2 text-sm font-normal outline-none focus:border-[#153A2B]"
            />
          </label>
          <label class="text-xs font-semibold">
            Deskripsi
            <input
              v-model="templateDescription"
              type="text"
              placeholder="Contoh: Strip 4 foto bertema pesta"
              class="mt-1 w-full rounded-lg border-2 border-[#dce8e2] px-3 py-2 text-sm font-normal outline-none focus:border-[#153A2B]"
            />
          </label>
        </div>

        <h2
          class="border-b-2 border-[#153A2B]/15 pb-2 font-bold"
        >
          Slot Foto ({{ slots.length }})
        </h2>

        <p
          v-if="slots.length === 0"
          class="text-xs text-[#5b6b64]"
        >
          Belum ada slot. Pilih gambar dulu, lalu klik
          tombol Kotak atau Bulat di atas.
        </p>

        <div
          class="flex max-h-[320px] flex-col gap-2 overflow-y-auto"
        >
          <div
            v-for="(slotItem, index) in slots"
            :key="slotItem.id"
            @click="pilihSlot(slotItem.id)"
            class="cursor-pointer rounded-lg border-2 p-3 text-xs"
            :class="
              slotItem.id === slotTerpilih
                ? 'border-[#153A2B] bg-[#FFF3D6]'
                : 'border-[#dce8e2] bg-white hover:border-[#153A2B]/50'
            "
          >
            <div class="flex items-center justify-between">
              <span class="font-bold">
                Slot {{ index + 1 }} ·
                {{
                  slotItem.bentuk === 'bulat'
                    ? 'Bulat'
                    : 'Kotak'
                }}
              </span>
              <button
                type="button"
                @click.stop="removeSlot(index)"
                class="font-semibold text-[#B42318] hover:underline"
              >
                Hapus
              </button>
            </div>
            <p class="mt-1 font-mono text-[#5b6b64]">
              x {{ slotItem.x }} · y {{ slotItem.y }} ·
              {{ slotItem.width }}×{{ slotItem.height }}
            </p>
          </div>
        </div>

        <!-- Hasil JSON, dilipat supaya tidak memenuhi layar -->
        <details class="text-xs">
          <summary class="cursor-pointer font-semibold">
            Lihat JSON template baru
          </summary>
          <pre
            class="mt-2 max-h-[220px] overflow-auto rounded-lg border-2 border-[#dce8e2] bg-[#F3FAF6] p-3 font-mono text-[11px]"
            >{{
              JSON.stringify(buatTemplateBaru(), null, 2)
            }}</pre>
        </details>
      </div>
    </div>

    <!-- Daftar Template (data dari template-photo.json) -->
    <div
      class="rounded-xl border-2 border-[#153A2B] bg-white p-5 shadow-[4px_4px_0_#153A2B]"
    >
      <h2
        class="mb-4 border-b-2 border-[#153A2B]/15 pb-2 font-bold"
      >
        Daftar Template ({{ daftarTemplate.length }})
      </h2>

      <div class="overflow-x-auto">
        <table
          class="w-full min-w-[36rem] text-left text-sm"
        >
          <thead>
            <tr class="bg-[#E6F0EB]">
              <th class="px-4 py-3 font-semibold">No</th>
              <th class="px-4 py-3 font-semibold">
                Gambar
              </th>
              <th class="px-4 py-3 font-semibold">Nama</th>
              <th class="px-4 py-3 font-semibold">
                Deskripsi
              </th>
              <th
                class="px-4 py-3 text-center font-semibold"
              >
                Jumlah Slot
              </th>
              <th
                class="px-4 py-3 text-center font-semibold"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in daftarTemplate"
              :key="index"
              class="border-t border-[#dce8e2]"
            >
              <td class="px-4 py-3">{{ index + 1 }}</td>
              <td class="px-4 py-3">
                <img
                  :src="item.backgroundUrl"
                  :alt="item.name"
                  class="h-14 w-10 rounded border border-[#dce8e2] object-cover"
                />
              </td>
              <td class="px-4 py-3 font-semibold">
                {{ item.name }}
              </td>
              <td class="px-4 py-3 text-[#5b6b64]">
                {{ item.description }}
              </td>
              <td class="px-4 py-3 text-center">
                {{ item.slot }}
              </td>
              <td class="px-4 py-3 text-center">
                <button
                  type="button"
                  @click="bukaPreview(item)"
                  class="rounded-lg border-2 border-[#153A2B] px-3 py-1.5 text-xs font-semibold hover:bg-[#FCC046]"
                >
                  Preview
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Popup Preview Template -->
    <div
      v-if="templateDipilih"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="tutupPreview"
    >
      <div
        class="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border-2 border-[#153A2B] bg-white p-5 shadow-[6px_6px_0_#153A2B]"
      >
        <div
          class="mb-3 flex items-start justify-between gap-3"
        >
          <div>
            <h3 class="font-bold">
              {{ templateDipilih.name }}
            </h3>
            <p class="text-xs text-[#5b6b64]">
              {{ templateDipilih.description }} ·
              {{ templateDipilih.slot }} slot
            </p>
          </div>
          <button
            type="button"
            @click="tutupPreview"
            class="text-sm font-semibold text-[#B42318] hover:underline"
          >
            Tutup
          </button>
        </div>

        <!-- Gambar template, kotak slot ditumpuk di atasnya -->
        <div class="relative mx-auto w-fit">
          <img
            :src="templateDipilih.backgroundUrl"
            :alt="templateDipilih.name"
            class="block max-h-[65vh] w-auto rounded border border-[#dce8e2]"
            @load="gambarSelesaiDimuat"
          />

          <div v-if="lebarAsli > 0">
            <div
              v-for="(s, i) in templateDipilih.slotsConfig"
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
          v-if="!templateDipilih.slotsConfig"
          class="mt-3 text-center text-xs text-[#5b6b64] italic"
        >
          Template ini belum punya data posisi slot.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Konva from 'konva'
// Data template yang sudah ada
import daftarTemplate from '@/config/DataSource/template-photo.json'

const isBackgroundLoaded = ref(false)
const templateName = ref('')
const templateDescription = ref('')
const backgroundFileName = ref('template-1.png')

// File gambar yang dipilih, dan status proses simpan
let fileGambar = null
// Folder proyek yang dipilih lewat jendela pilih folder
let folderProyek = null
const sedangMenyimpan = ref(false)
const pesanSimpan = ref('')
const simpanBerhasil = ref(false)

// Data slot yang tampil di panel kanan
const slots = ref([])
// id slot yang sedang dipilih
const slotTerpilih = ref(null)

let stage = null
let layer = null
let transformer = null
// Menyimpan objek Konva tiap slot, kuncinya adalah id slot
let daftarNode = {}

// Data untuk popup preview template
const templateDipilih = ref(null)
const lebarAsli = ref(0)
const tinggiAsli = ref(0)

// Buka popup preview
const bukaPreview = (item) => {
  lebarAsli.value = 0
  tinggiAsli.value = 0
  templateDipilih.value = item
}

// Tutup popup preview
const tutupPreview = () => {
  templateDipilih.value = null
}

// Setelah gambar tampil, ambil ukuran aslinya
// supaya posisi kotak slot bisa dihitung dengan benar
const gambarSelesaiDimuat = (e) => {
  lebarAsli.value = e.target.naturalWidth
  tinggiAsli.value = e.target.naturalHeight
}

// 1. Handle Upload Gambar Background
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  fileGambar = file
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
  daftarNode = {}
  slotTerpilih.value = null

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

  // Transformer untuk mengubah ukuran slot
  transformer = new Konva.Transformer({
    rotateEnabled: false,
    keepRatio: false,
    boundBoxFunc: (oldBox, newBox) => {
      if (newBox.width < 30 || newBox.height < 30)
        return oldBox
      return newBox
    },
  })
  layer.add(transformer)

  // Batalkan pilihan saat klik background kosong
  stage.on('click tap', (e) => {
    if (e.target === bgKonva) {
      transformer.nodes([])
      slotTerpilih.value = null
      layer.batchDraw()
    }
  })

  isBackgroundLoaded.value = true
  layer.batchDraw()
}

// 3. Pilih satu slot (dari klik di canvas atau di daftar kanan)
const pilihSlot = (slotId) => {
  const item = slots.value.find((s) => s.id === slotId)
  const node = daftarNode[slotId]
  if (!item || !node) return

  if (item.bentuk === 'bulat') {
    // Lingkaran: ukuran harus tetap bulat, jadi hanya pojok yang aktif
    transformer.keepRatio(true)
    transformer.enabledAnchors([
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
    ])
  } else {
    // Kotak: bebas diubah lebar dan tingginya
    transformer.keepRatio(false)
    transformer.enabledAnchors([
      'top-left',
      'top-center',
      'top-right',
      'middle-left',
      'middle-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ])
  }

  transformer.nodes([node])
  slotTerpilih.value = slotId
  layer.batchDraw()
}

// 4. Tambah slot baru, bentuknya 'kotak' atau 'bulat'
const addSlot = (bentuk) => {
  if (!layer) return

  const slotId = Date.now()
  const geser = slots.value.length * 20
  let node = null

  if (bentuk === 'bulat') {
    // Lingkaran: x dan y adalah titik tengahnya
    node = new Konva.Circle({
      x: 130 + geser,
      y: 130 + geser,
      radius: 80,
      fill: 'rgba(252, 192, 70, 0.45)',
      stroke: '#153A2B',
      strokeWidth: 2,
      dash: [8, 4],
      draggable: true,
    })
  } else {
    // Kotak: x dan y adalah pojok kiri atas
    node = new Konva.Rect({
      x: 50 + geser,
      y: 50 + geser,
      width: 150,
      height: 200,
      fill: 'rgba(252, 192, 70, 0.45)',
      stroke: '#153A2B',
      strokeWidth: 2,
      dash: [8, 4],
      draggable: true,
    })
  }

  // Klik atau mulai geser = pilih slot ini
  node.on('click tap', () => pilihSlot(slotId))
  node.on('dragstart', () => pilihSlot(slotId))

  // Selesai digeser: catat posisi barunya
  node.on('dragend', () => updateSlotState(slotId))

  // Selesai diubah ukurannya: catat ukuran barunya
  node.on('transformend', () => {
    if (bentuk === 'bulat') {
      const radiusBaru = node.radius() * node.scaleX()
      node.radius(Math.round(Math.max(15, radiusBaru)))
    } else {
      const lebarBaru = node.width() * node.scaleX()
      const tinggiBaru = node.height() * node.scaleY()
      node.width(Math.round(Math.max(30, lebarBaru)))
      node.height(Math.round(Math.max(30, tinggiBaru)))
    }
    // Kembalikan skala ke 1 supaya ukuran tersimpan apa adanya
    node.scaleX(1)
    node.scaleY(1)
    updateSlotState(slotId)
  })

  layer.add(node)
  daftarNode[slotId] = node

  // Simpan ke data Vue, angka x, y, width, height diisi oleh updateSlotState
  slots.value.push({
    id: slotId,
    bentuk: bentuk,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  updateSlotState(slotId)
  pilihSlot(slotId)
}

// Salin posisi dan ukuran dari objek Konva ke data Vue
const updateSlotState = (slotId) => {
  const item = slots.value.find((s) => s.id === slotId)
  const node = daftarNode[slotId]
  if (!item || !node) return

  if (item.bentuk === 'bulat') {
    // Titik tengah diubah menjadi pojok kiri atas
    const radius = node.radius()
    item.x = Math.round(node.x() - radius)
    item.y = Math.round(node.y() - radius)
    item.width = Math.round(radius * 2)
    item.height = Math.round(radius * 2)
  } else {
    item.x = Math.round(node.x())
    item.y = Math.round(node.y())
    item.width = Math.round(node.width())
    item.height = Math.round(node.height())
  }
}

// Hapus Slot
const removeSlot = (index) => {
  const target = slots.value[index]
  if (!target) return

  daftarNode[target.id].destroy()
  delete daftarNode[target.id]
  transformer.nodes([])
  slotTerpilih.value = null
  slots.value.splice(index, 1)
  layer.batchDraw()
}

// Susun data satu template baru dari yang sedang diedit
const buatTemplateBaru = (
  daftarLama = daftarTemplate,
  namaGambar = backgroundFileName.value,
) => {
  // Cari id paling besar di template lama, id baru = id terbesar + 1
  let idTerbesar = 0
  for (const item of daftarLama) {
    if (item.id > idTerbesar) idTerbesar = item.id
  }

  return {
    id: idTerbesar + 1,
    name: templateName.value || 'Template Baru',
    description: templateDescription.value,
    backgroundUrl: `/template/${namaGambar}`,
    slot: slots.value.length,
    slotsConfig: slots.value.map((s, idx) => ({
      slotIndex: idx + 1,
      shape: s.bentuk === 'bulat' ? 'circle' : 'rect',
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
    })),
  }
}

// Isi file JSON yang diunduh = semua template lama + template baru.
// Jadi saat file ini dipakai menggantikan template-photo.json,
// template lama tidak hilang.
const generateJsonOutput = () => {
  return [...daftarTemplate, buatTemplateBaru()]
}

// 5. Unduh File JSON (cadangan)
const saveAndDownloadJson = () => {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(
      JSON.stringify(generateJsonOutput(), null, 2),
    )
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute(
    'download',
    'template-photo.json',
  )
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

// 6. Simpan langsung ke folder proyek (Chrome / Edge)
//    - gambar  -> public/template/
//    - data    -> src/config/DataSource/template-photo.json
const simpanTemplate = async () => {
  if (!fileGambar || slots.value.length === 0) return

  // Fitur ini tidak ada di Firefox / Safari
  if (!window.showDirectoryPicker) {
    simpanBerhasil.value = false
    pesanSimpan.value =
      'Browser ini belum mendukung simpan langsung. Gunakan Chrome atau Edge, atau pakai tombol Unduh JSON.'
    return
  }

  sedangMenyimpan.value = true
  pesanSimpan.value = ''

  try {
    // Pilih folder proyek (hanya ditanya kalau belum dipilih)
    if (!folderProyek) {
      folderProyek = await window.showDirectoryPicker({
        mode: 'readwrite',
      })
    }

    // Masuk ke folder-folder tujuan
    const folderSrc =
      await folderProyek.getDirectoryHandle('src')
    const folderConfig =
      await folderSrc.getDirectoryHandle('config')
    const folderData =
      await folderConfig.getDirectoryHandle('DataSource')
    const fileJson = await folderData.getFileHandle(
      'template-photo.json',
    )
    const folderPublic =
      await folderProyek.getDirectoryHandle('public')
    const folderTemplate =
      await folderPublic.getDirectoryHandle('template', {
        create: true,
      })

    // Baca isi JSON yang sekarang
    const fileLama = await fileJson.getFile()
    const daftar = JSON.parse(await fileLama.text())

    // Kalau nama gambar sudah dipakai, tambahkan angka supaya tidak menimpa
    let namaGambar = fileGambar.name
    try {
      await folderTemplate.getFileHandle(namaGambar)
      namaGambar = Date.now() + '-' + namaGambar
    } catch {
      // belum ada file dengan nama itu, aman dipakai
    }

    // Simpan gambar
    const fileGambarBaru =
      await folderTemplate.getFileHandle(namaGambar, {
        create: true,
      })
    const tulisGambar =
      await fileGambarBaru.createWritable()
    await tulisGambar.write(fileGambar)
    await tulisGambar.close()

    // Tambahkan template baru ke JSON, lalu simpan
    const templateBaru = buatTemplateBaru(
      daftar,
      namaGambar,
    )
    daftar.push(templateBaru)
    const tulisJson = await fileJson.createWritable()
    await tulisJson.write(
      JSON.stringify(daftar, null, 2) + '\n',
    )
    await tulisJson.close()

    simpanBerhasil.value = true
    pesanSimpan.value = `Template tersimpan (id ${templateBaru.id}), gambar ada di ${templateBaru.backgroundUrl}`

    // Setelah file JSON berubah, halaman otomatis dimuat ulang oleh Vite.
    // Pesan disimpan dulu supaya masih bisa ditampilkan sesudahnya.
    sessionStorage.setItem('pesanSimpan', pesanSimpan.value)
  } catch (error) {
    simpanBerhasil.value = false
    if (error.name === 'AbortError') {
      pesanSimpan.value = 'Pemilihan folder dibatalkan.'
    } else if (error.name === 'NotFoundError') {
      folderProyek = null
      pesanSimpan.value =
        'Folder yang dipilih bukan folder proyek. Pilih folder web-photobooth (yang berisi src dan public).'
    } else {
      pesanSimpan.value = `Gagal menyimpan: ${error.message}`
    }
  }

  sedangMenyimpan.value = false
}

// Tampilkan pesan simpan yang tertinggal sebelum halaman dimuat ulang
onMounted(() => {
  const pesanLama = sessionStorage.getItem('pesanSimpan')
  if (pesanLama) {
    simpanBerhasil.value = true
    pesanSimpan.value = pesanLama
    sessionStorage.removeItem('pesanSimpan')
  }
})

onUnmounted(() => {
  if (stage) stage.destroy()
})
</script>
