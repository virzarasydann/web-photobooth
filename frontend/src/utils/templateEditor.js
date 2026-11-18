// Fungsi bantu Editor yang tidak berhubungan dengan tampilan:
// menyusun data template, unduh JSON, dan simpan ke folder proyek.

// Susun data satu template baru dari yang sedang diedit.
// daftarLama = template yang sudah ada (untuk menentukan id baru)
// isi = { nama, deskripsi, namaGambar, slots }
export function buatTemplateBaru(daftarLama, isi) {
  // Cari id paling besar di template lama, id baru = id terbesar + 1
  let idTerbesar = 0
  for (const item of daftarLama) {
    if (item.id > idTerbesar) idTerbesar = item.id
  }

  return {
    id: idTerbesar + 1,
    name: isi.nama || 'Template Baru',
    description: isi.deskripsi,
    backgroundUrl: `/template/${isi.namaGambar}`,
    slot: isi.slots.length,
    status: 'Aktif',
    slotsConfig: isi.slots.map((s, idx) => ({
      slotIndex: idx + 1,
      shape: s.bentuk === 'bulat' ? 'circle' : 'rect',
      x: s.x,
      y: s.y,
      width: s.width,
      height: s.height,
    })),
  }
}

// Unduh data sebagai file JSON (cadangan kalau simpan langsung tidak bisa)
export function unduhJson(data, namaFile) {
  const dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(data, null, 2))

  const link = document.createElement('a')
  link.setAttribute('href', dataStr)
  link.setAttribute('download', namaFile)
  document.body.appendChild(link)
  link.click()
  link.remove()
}

// Simpan langsung ke folder proyek (Chrome / Edge)
//   - gambar -> public/template/
//   - data   -> public/DataSource/template-photo.json
// folderProyek = folder frontend yang dipilih lewat showDirectoryPicker
// Hasilnya: data template baru yang sudah tersimpan
export async function simpanKeProyek(
  folderProyek,
  fileGambar,
  isi,
) {
  // Masuk ke folder-folder tujuan
  const folderPublic =
    await folderProyek.getDirectoryHandle('public')
  const folderData =
    await folderPublic.getDirectoryHandle('DataSource')
  const fileJson = await folderData.getFileHandle(
    'template-photo.json',
  )
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
  const fileGambarBaru = await folderTemplate.getFileHandle(
    namaGambar,
    { create: true },
  )
  const tulisGambar = await fileGambarBaru.createWritable()
  await tulisGambar.write(fileGambar)
  await tulisGambar.close()

  // Tambahkan template baru ke JSON, lalu simpan
  const templateBaru = buatTemplateBaru(daftar, {
    ...isi,
    namaGambar: namaGambar,
  })
  daftar.push(templateBaru)
  const tulisJson = await fileJson.createWritable()
  await tulisJson.write(
    JSON.stringify(daftar, null, 2) + '\n',
  )
  await tulisJson.close()

  return templateBaru
}
