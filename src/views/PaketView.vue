<script setup>
import TopBarV2 from '@/components/common/Navbar/TopBarV2.vue'
import BottomarMobile from '@/components/common/Navbar/BottomarMobile.vue'
// import AppButton from '@/components/common/button/AppButton.vue'
import PaketTabs from '@/components/common/Layout/PaketView/KategoriPaketView.vue'
import PaketCard from '@/components/common/Layout/PaketView/PaketCardView.vue'
import PaketFitur from '@/components/common/Layout/PaketView/PaketFitur.vue'
import FooterSection from '@/components/common/Layout/Landing-Page-Public/FooterSection.vue'
import { container } from '@/utils/container.js'
</script>

<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />

  <div
    class="min-h-screen bg-[linear-gradient(180deg,#e5eeee_0%,#ffffff_100%)] bg-fixed font-sans leading-normal text-[#212529]"
  >
    <TopBarV2 />
    <BottomarMobile />

    <section class="pt-10 pb-14 md:pt-14 md:pb-20">
      <div :class="container">
        <div class="mx-auto max-w-[42rem] text-center">
          <span
            class="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[0.78rem] font-medium text-[#153A2B] shadow-[0_2px_8px_rgba(21,58,43,0.08)]"
          >
            <span
              class="h-2 w-2 rounded-full bg-[#FCC046]"
            ></span>
            Pilihan Paket &amp; Sesi Foto
          </span>
          <h1
            class="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] font-extrabold text-[#153A2B]"
          >
            Paket Photobooth Hangat untuk Setiap Momen
            Spesial
          </h1>
          <p
            class="mx-auto max-w-[32rem] text-[0.95rem] leading-relaxed text-[#5b6b64]"
          >
            Dari sesi santai berdua hingga sewa bilik fisik
            photobooth untuk pesta dan pernikahan.
            Transparan, tanpa biaya tersembunyi, dengan
            cetakan instan tak terbatas.
          </p>
        </div>

        <PaketTabs />

        <div
          class="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch"
        >
          <PaketCard
            populer
            ikon="kamera"
            label="Sesi Mandiri"
            nama="Paket Kopli & Nostalgia"
            deskripsi="Cocok untuk foto solo bernuansa retro atau kilas memori santai harian."
            harga="Rp 35.000"
            satuan="/ sesi"
            catatan="Web Kios Reguler"
            tombol="Mulai Sesi Sekarang"
            href="/photobooth/guest"
          >
            <PaketFitur>
              <strong>4 kali jepretan</strong>
              foto studio berpemandu
            </PaketFitur>
            <PaketFitur>
              <strong>2 rangkap photostrip</strong>
              cetak fisik (2×6 inch)
            </PaketFitur>
            <PaketFitur>
              Bebas pilih frame klasik &amp; filter grain
            </PaketFitur>
            <PaketFitur>
              Unduh digital
              <strong>300 DPI</strong>
              + GIF animasi via QR code instan
            </PaketFitur>
          </PaketCard>

          <PaketCard
            ikon="berdua"
            label="Double Joy"
            nama="Paket Berdua / Sahabat"
            deskripsi="Pilihan manis untuk pasangan, sahabat karib, atau kencan akhir pekan."
            harga="Rp 60.000"
            satuan="/ 2 sesi"
            catatan="Hemat Rp 10.000"
            tombol="Pilih Paket Ini"
            href="#"
          >
            <PaketFitur>
              Bebas pilih
              <strong>2×2 Kolase</strong>
              atau
              <strong>1×3 Vertikal</strong>
            </PaketFitur>
            <PaketFitur>
              <strong>4 strip cetak fisik</strong>
              laminasi matte tahan air
            </PaketFitur>
            <PaketFitur>
              Custom stempel tanggal &amp; nama vintage
            </PaketFitur>
            <PaketFitur>
              Akses cloud album Sleepy Ruben selama 30 hari
            </PaketFitur>
          </PaketCard>

          <PaketCard
            ikon="ramai"
            label="Community Booth"
            nama="Paket Pesta & Komunitas"
            deskripsi="Seru-seruan bareng circle, kumpul keluarga, atau traktiran wisuda."
            harga="Rp 120.000"
            satuan="/ multi-sesi"
            catatan="4 Sesi Sekaligus"
            tombol="Pilih Paket Ini"
            href="#"
          >
            <PaketFitur>
              <strong>4 sesi photobooth</strong>
              fleksibel bebas waktu
            </PaketFitur>
            <PaketFitur>
              <strong>8 photostrip fisik</strong>
              kualitas arsip foto
            </PaketFitur>
            <PaketFitur>
              Custom layout border acara komunitas
            </PaketFitur>
            <PaketFitur>
              Prioritas cetak cepat di antrean kios
            </PaketFitur>
          </PaketCard>
        </div>
      </div>
    </section>

    <section class="pb-14 md:pb-20">
      <div :class="container">
        <div
          class="overflow-hidden rounded-[1.75rem] border border-[#dce8e2] bg-white px-6 py-10 md:px-12 md:py-14"
        >
          <div
            class="grid grid-cols-1 items-center gap-10 min-[62rem]:grid-cols-2 min-[62rem]:gap-12"
          >
            <div>
              <span
                class="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E6F0EB] px-4 py-1.5 text-[0.78rem] font-medium text-[#153A2B]"
              >
                ✦ Kualitas Kertas Seni Analogue
              </span>
              <h2
                class="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold text-[#153A2B]"
              >
                Setiap Jepretan Dicetak Dengan Rasa &amp;
                Cerita
              </h2>
              <p
                class="text-[0.95rem] leading-relaxed text-[#5b6b64]"
              >
                Kami menggunakan teknologi pencetak termal
                dye-sublimation resolusi tinggi. Hasil cetak
                langsung kering dalam 12 detik, tahan
                percikan air, serta tidak pudar hingga 20
                tahun ke depan.
              </p>

              <div
                class="mt-6 grid grid-cols-1 gap-4 min-[36rem]:grid-cols-2"
              >
                <div
                  class="rounded-xl border border-[#dce8e2] bg-[#F3FAF6] p-4"
                >
                  <h3
                    class="mb-1 text-[0.95rem] font-bold text-[#153A2B]"
                  >
                    Matte Lamination
                  </h3>
                  <p
                    class="text-[0.82rem] leading-relaxed text-[#5b6b64]"
                  >
                    Bebas sidik jari dan tahan basah.
                  </p>
                </div>
                <div
                  class="rounded-xl border border-[#dce8e2] bg-[#F3FAF6] p-4"
                >
                  <h3
                    class="mb-1 text-[0.95rem] font-bold text-[#153A2B]"
                  >
                    Scan &amp; Share
                  </h3>
                  <p
                    class="text-[0.82rem] leading-relaxed text-[#5b6b64]"
                  >
                    Akses file HD dan GIF animasi dalam 5
                    detik.
                  </p>
                </div>
              </div>
            </div>

            <div
              class="flex items-center justify-center gap-4"
            >
              <figure
                class="w-[48%] max-w-[15rem] -rotate-3 rounded-2xl bg-white p-3 shadow-[0_10px_24px_rgba(21,58,43,0.15)]"
              >
                <img
                  src="@/assets/img/img-public-page-V2/img-ilustration-party.png"
                  alt="Contoh photostrip Midnight Party"
                  class="h-64 w-full rounded-xl object-cover"
                />
                <figcaption
                  class="pt-3 text-center text-[0.6rem] font-bold tracking-wider text-[#153A2B] uppercase"
                >
                  Sleepy Ruben Nostalgia Strip • #082
                </figcaption>
              </figure>
              <figure
                class="mt-10 w-[48%] max-w-[15rem] rotate-3 rounded-2xl bg-white p-3 shadow-[0_10px_24px_rgba(21,58,43,0.15)]"
              >
                <img
                  src="@/assets/img/img-public-page-V2/img-ilustration-partner.png"
                  alt="Contoh photostrip Classic Monochrome"
                  class="h-64 w-full rounded-xl object-cover"
                />
                <figcaption
                  class="pt-3 text-center text-[0.6rem] font-bold tracking-wider text-[#153A2B] uppercase"
                >
                  Sleepy Ruben Kotabaru Kiosk • 2024
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- tabel perbandinan fitur tabel-->
    <section class="pb-14 md:pb-20">
      <div :class="container">
        <div class="mx-auto mb-8 max-w-[42rem] text-center">
          <h2
            class="mb-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.15] font-extrabold text-[#153A2B]"
          >
            Komparasi Fitur Paket
          </h2>
          <p class="text-[0.9rem] text-[#5b6b64]">
            Pilih tingkat kenyamanan yang paling sesuai
            dengan kebutuhan acaramu.
          </p>
        </div>

        <div
          class="overflow-x-auto rounded-2xl border border-[#dce8e2] bg-white"
        >
          <table
            class="w-full min-w-[42rem] border-collapse text-left text-[0.85rem]"
          >
            <thead>
              <tr class="bg-[#F3FAF6] text-[#153A2B]">
                <th class="px-5 py-4 font-semibold">
                  Fitur &amp; Layanan
                </th>
                <th
                  class="px-5 py-4 text-center font-semibold"
                >
                  Kopli &amp; Nostalgia
                </th>
                <th
                  class="px-5 py-4 text-center font-semibold"
                >
                  Berdua / Sahabat
                </th>
                <th
                  class="px-5 py-4 text-center font-semibold"
                >
                  Pesta Komunitas
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t border-[#eef2f0]">
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  Format &amp; Ukuran Cetak
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  2×6" Vertikal Strip
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  2×6" atau 2×2" Kolase
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  Semua Format Klasik
                </td>
              </tr>

              <tr class="border-t border-[#eef2f0]">
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  Jumlah Cetak Fisik
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  2 Rangkap Strip
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  4 Rangkap Strip
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  8 Rangkap Strip
                </td>
              </tr>
              <tr class="border-t border-[#eef2f0]">
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  Kertas Dye-Sublimation Matte
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
              </tr>
              <tr class="border-t border-[#eef2f0]">
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  Berkas Digital HD &amp; Animasi GIF
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  ✓
                </td>
              </tr>
              <tr class="border-t border-[#eef2f0]">
                <td
                  class="px-5 py-4 font-medium text-[#153A2B]"
                >
                  Kustomisasi Watermark / Border Event
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  -
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  Stempel Tanggal
                </td>
                <td
                  class="px-5 py-4 text-center text-[#5b6b64]"
                >
                  Pilihan Frame Tema
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <FooterSection />
  </div>
</template>
