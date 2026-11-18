import { ref, onUnmounted } from 'vue'
import Konva from 'konva'

// Semua urusan canvas Konva (stage, slot, transformer)
// dikumpulkan di sini supaya EditorView tidak penuh kode.
// idKanvas = id elemen tempat canvas digambar
export function useKonvaEditor(idKanvas) {
  // Data yang dibaca oleh tampilan
  const gambarSiap = ref(false)
  const slots = ref([])
  const slotTerpilih = ref(null)

  // Objek Konva tidak perlu reaktif
  let stage = null
  let layer = null
  let transformer = null
  // Menyimpan objek Konva tiap slot, kuncinya adalah id slot
  let daftarNode = {}

  // Baca file gambar jadi objek Image.
  // Kalau gambar rusak, promise ditolak dengan pesan error.
  const bacaGambar = (file) => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const gambar = new Image()

      gambar.onload = () => {
        URL.revokeObjectURL(url)
        resolve(gambar)
      }
      gambar.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('Gambar tidak bisa dibaca.'))
      }
      gambar.src = url
    })
  }

  // 1. Pilih gambar background, lalu siapkan canvas
  const bukaGambar = async (file) => {
    const gambar = await bacaGambar(file)
    buatStage(gambar)
  }

  // 2. Inisialisasi Canvas Konva
  const buatStage = (bgImg) => {
    // Bersihkan canvas lama jika ada
    if (stage) stage.destroy()
    slots.value = []
    daftarNode = {}
    slotTerpilih.value = null

    const width = bgImg.naturalWidth || 600
    const height = bgImg.naturalHeight || 800

    // Buat Stage & Layer
    stage = new Konva.Stage({
      container: idKanvas,
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

    gambarSiap.value = true
    layer.batchDraw()
  }

  // 3. Pilih satu slot (dari klik di canvas atau di daftar)
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

  // 4. Tambah slot baru, bentuknya 'kotak' atau 'bulat'
  const tambahSlot = (bentuk) => {
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

  // 5. Hapus slot
  const hapusSlot = (index) => {
    const target = slots.value[index]
    if (!target) return

    daftarNode[target.id].destroy()
    delete daftarNode[target.id]
    transformer.nodes([])
    slotTerpilih.value = null
    slots.value.splice(index, 1)
    layer.batchDraw()
  }

  // 6. Geser slot yang dipilih lewat keyboard (tombol panah)
  const geserSlotTerpilih = (kiriKanan, atasBawah) => {
    const node = daftarNode[slotTerpilih.value]
    if (!node) return

    node.x(node.x() + kiriKanan)
    node.y(node.y() + atasBawah)
    updateSlotState(slotTerpilih.value)
    layer.batchDraw()
  }

  onUnmounted(() => {
    if (stage) stage.destroy()
  })

  return {
    gambarSiap,
    slots,
    slotTerpilih,
    bukaGambar,
    pilihSlot,
    tambahSlot,
    hapusSlot,
    geserSlotTerpilih,
  }
}
