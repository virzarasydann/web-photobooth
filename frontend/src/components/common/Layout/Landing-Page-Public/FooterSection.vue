<script setup>
import { container } from '@/utils/container.js'

function scrollKe(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const linkClass =
  'text-[#E3EDE7] no-underline transition-colors duration-200 hover:text-[#FCC046]'

const headingClass =
  'mb-4 text-[0.8rem] font-semibold tracking-[0.12em] text-[#FCC046] uppercase'
</script>

<template>
  <footer
    class="relative rounded-t-[2rem] bg-[#153A2B] text-white max-md:pb-2"
  >
    <div :class="[container, 'pt-12 pb-6']">
      <div
        class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-[1.6fr_1fr_1fr] md:gap-12"
      >
        <div class="col-span-2 md:col-span-1">
          <img
            src="@/assets/img/logo.png"
            alt="Logo Photobooth"
            class="mb-4 block h-12 w-auto"
          />
          <p
            class="max-w-[24rem] text-[0.9rem] leading-[1.7] text-[#C9DBD1]"
          >
            Ruang kecil untuk tawa besar. Pilih tema, jepret
            pose favoritmu, dan simpan kenangan yang bisa
            kamu lihat kembali kapan saja.
          </p>
        </div>

        <div>
          <h3 :class="headingClass">Menu</h3>
          <ul
            class="m-0 flex list-none flex-col gap-3 p-0 text-[0.9rem]"
          >
            <li>
              <RouterLink to="/" :class="linkClass">
                Beranda
              </RouterLink>
            </li>
            <li>
              <a
                href="#cara-kerja-section"
                :class="linkClass"
                @click.prevent="
                  scrollKe('cara-kerja-section')
                "
              >
                Cara Kerja
              </a>
            </li>
            <li>
              <a
                href="#galeri"
                :class="linkClass"
                @click.prevent="scrollKe('galeri')"
              >
                Galeri
              </a>
            </li>
            <li>
              <RouterLink to="/login" :class="linkClass">
                Masuk
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/register" :class="linkClass">
                Daftar
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 :class="headingClass">Kontak</h3>
          <ul
            class="m-0 flex list-none flex-col gap-3 p-0 text-[0.9rem] text-[#E3EDE7]"
          >
            <li>Telkom University</li>
            <li>
              <a
                href="mailto:halo@photobooth.id"
                :class="linkClass"
              >
                halo@photobooth.id
              </a>
            </li>
            <li>@photobooth.id</li>
          </ul>
        </div>
      </div>
      <div
        class="mt-10 border-t border-white/15 pt-5 text-center text-[0.8rem] text-[#9DB8AA]"
      >
        &copy; 2026 Photobooth. Tugas Besar Pengembangan
        Web.
      </div>
    </div>
  </footer>
</template>
