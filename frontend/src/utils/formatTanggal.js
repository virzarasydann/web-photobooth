// format tanggal: 29 Okt 2026, 19:42
export function ubahFormatTanggal(tanggal) {
    const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']

    const tanggalDanJam = tanggal.split(' ')
    const bagian = tanggalDanJam[0].split('-')

    const tahun = bagian[0]
    const bulan = namaBulan[Number(bagian[1]) - 1]
    const hari = Number(bagian[2])
    const jam = tanggalDanJam[1]

    return hari + ' ' + bulan + ' ' + tahun + ', ' + jam
}