<script setup>
const container =
  'w-full mx-auto px-3 min-[36rem]:max-w-[540px] md:max-w-[720px] min-[62rem]:max-w-[960px] min-[75rem]:max-w-[1140px] min-[87.5rem]:max-w-[1320px]'
</script>

<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
    rel="stylesheet"
  />
  <div
    class="min-h-screen bg-[linear-gradient(180deg,#e5eeee_0%,#ffffff_100%)] bg-fixed font-sans text-[#212529] leading-normal max-md:pb-24"
  >
    <div class="flex min-h-svh flex-col">
      <nav
        class="fixed inset-x-0 bottom-0 z-50 p-3 md:hidden"
        aria-label="Navigasi utama"
      >
        <div
          class="mx-auto flex max-w-[28rem] items-center gap-1 rounded-[50rem] bg-[#2f5440] p-1.5 text-[0.9rem] text-white shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
        >
          <RouterLink
            to="/"
            class="flex-1 rounded-[50rem] px-4 py-2 text-center text-white no-underline [&.router-link-exact-active]:bg-white [&.router-link-exact-active]:text-black"
          >
            Beranda
          </RouterLink>
          <RouterLink
            to="/login"
            class="rounded-[50rem] px-4 py-2 text-white no-underline [&.router-link-exact-active]:bg-white [&.router-link-exact-active]:text-black"
          >
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="rounded-[50rem] px-4 py-2 text-white no-underline [&.router-link-exact-active]:bg-white [&.router-link-exact-active]:text-black"
          >
            Register
          </RouterLink>
        </div>
      </nav>

      <header :class="[container, 'hidden py-4 md:block']">
        <div class="flex items-center gap-4">
          <nav
            class="relative flex min-h-[50px] grow items-center rounded-[50rem] bg-[#2f5440] py-2 text-white"
          >
            <ul
              class="m-0 flex w-full list-none flex-row justify-center gap-6 p-0"
            >
              <li>
                <RouterLink
                  to="/"
                  aria-current="page"
                  class="block rounded-[50rem] bg-white px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] text-black no-underline"
                >
                  Beranda
                </RouterLink>
              </li>
              <li>
                <a
                  href="#showcase"
                  class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] text-white no-underline hover:bg-white/15"
                >
                  Template
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  class="block rounded-[50rem] px-2 py-[0.35rem] text-[0.9rem] tracking-[0.3px] text-white no-underline hover:bg-white/15"
                >
                  Tentang
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <RouterLink
              to="/login"
              class="flex h-[50px] min-w-[100px] items-center justify-center rounded-[50rem] bg-[#2f5440] px-5 font-medium text-white no-underline"
            >
              Login
            </RouterLink>
            <RouterLink
              to="/register"
              class="flex h-[50px] min-w-[100px] items-center justify-center rounded-[50rem] border-2 border-[#2f5440] px-5 font-medium text-[#2f5440] no-underline transition-colors duration-200 hover:bg-[#2f5440] hover:text-white"
            >
              Register
            </RouterLink>
          </div>
        </div>
      </header>

      <main
        class="flex flex-1 items-center pt-8 pb-6 md:pt-16 md:pb-8"
      >
        <div :class="[container, 'w-full']">
          <div
            class="grid grid-cols-1 items-center gap-6 md:grid-cols-2 min-[62rem]:gap-12"
          >
            <div class="text-center md:text-start">
              <h1
                class="mb-2 text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-black"
              >
                Jepret Pose
                <br />
                Favoritmu!
              </h1>
              <p
                class="mx-auto mt-4 mb-8 max-w-[22rem] text-base leading-[1.35] text-[#111] md:mx-0"
              >
                Tunjukkan gayamu, abadikan momen seru
                bersama teman, keluarga, atau orang
                tersayang, dan buat kenangan yang bisa kamu
                lihat kembali kapan saja.
              </p>
              <!-- FR-02: tombol Mulai mengarah ke modul capture foto -->
              <RouterLink
                to="/photobooth"
                class="inline-flex h-[50px] min-w-[220px] items-center justify-center rounded-[50rem] bg-[#2f5440] px-8 text-[1.4rem] font-bold text-white no-underline shadow-[0_6px_12px_rgba(0,0,0,0.25)] transition-[translate,box-shadow] duration-200 ease-[ease] hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(0,0,0,0.3)]"
              >
                Mulai
              </RouterLink>
            </div>
            <div class="text-center">
              <img
                src="@/assets/img/banner.png"
                alt="Anak tersenyum memegang papan SMILE dengan strip foto"
                class="inline h-auto max-h-[480px] w-auto max-w-full align-middle"
              />
            </div>
          </div>
        </div>
      </main>
    </div>

    <section
      id="showcase"
      class="relative z-2 mt-8 min-h-[120vh] w-full border-0 border-solid pt-24 pb-28 [--wave-bottom:7.639vw] [--wave-top:4.861vw] [border-image-repeat:stretch] [border-image-slice:70_0_110_0_fill] [border-image-source:url(@/assets/img/background-wave.png)] [border-image-width:var(--wave-top)_0_var(--wave-bottom)_0] md:pt-16 md:pb-28"
    >
      <div :class="container">
        <div class="text-center">
          <p class="mt-[4.25rem] mb-1 text-[1.85rem]">
            Pilih Gayamu!
          </p>
          <h2
            class="mb-0 text-[clamp(1.6rem,4.5vw,2.5rem)] leading-normal font-semibold"
          >
            Pengalaman Foto
            <br />
            Terbaik
            <em class="font-normal">Untuk Anda</em>
          </h2>
        </div>

        <div
          class="mt-2 grid grid-cols-1 items-center gap-6 pt-6 md:grid-cols-2 min-[62rem]:gap-12 min-[62rem]:pt-12"
        >
          <div>
            <div
              class="grid grid-cols-1 gap-4 min-[36rem]:grid-cols-2"
            >
              <div
                class="h-full rounded-xl bg-[#dcdcdc] p-4 text-center text-[#111] shadow-[0_4px_10px_rgba(0,0,0,0.2)] md:px-4 md:py-5"
              >
                <h3
                  class="mb-2 text-[0.95rem] leading-[1.2] font-semibold min-[62rem]:text-[1.05rem]"
                >
                  Tema Foto Beragam
                </h3>
                <p
                  class="mb-0 text-[0.8rem] leading-[1.4] min-[62rem]:text-[0.9rem]"
                >
                  latar belakang unik dan interaktif untuk
                  setiap kesempatan.
                </p>
              </div>
              <div
                class="h-full rounded-xl bg-[#2f5440] p-4 text-center text-white shadow-[0_4px_10px_rgba(0,0,0,0.2)] md:px-4 md:py-5"
              >
                <h3
                  class="mb-2 text-[0.95rem] leading-[1.2] font-semibold min-[62rem]:text-[1.05rem]"
                >
                  Cetakan instan
                </h3>
                <p
                  class="mb-0 text-[0.8rem] leading-[1.4] min-[62rem]:text-[0.9rem]"
                >
                  cetakan bisa dalam berbagai hal dari fisik
                  dan digital
                </p>
              </div>
            </div>

            <div class="mt-6 text-center md:mt-12">
              <RouterLink
                to="/photobooth"
                class="inline-block rounded-[0.6rem] bg-[#c96a28] px-[1.6rem] py-2 text-[0.85rem] font-semibold text-white no-underline shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-[translate] duration-200 ease-[ease] hover:-translate-y-0.5"
              >
                Mulai Coba
              </RouterLink>
            </div>
          </div>

          <div class="text-center">
            <img
              src="@/assets/img/banner-3.png"
              alt="Anak membawa kamera di depan strip foto"
              class="inline h-auto max-h-[340px] w-auto max-w-full align-middle"
            />
          </div>
        </div>

        <div
          id="tentang"
          class="mt-12 grid grid-cols-1 items-center gap-6 md:grid-cols-2 min-[62rem]:gap-12"
        >
          <div class="text-center">
            <img
              src="@/assets/img/banner-2.png"
              alt="Anak berkacamata hitam di depan tirai merah dengan strip foto"
              class="inline h-auto max-h-[340px] w-auto max-w-full align-middle"
            />
          </div>
          <div>
            <blockquote
              class="m-0 text-base leading-[1.8] text-justify text-[#1a1a1a] italic md:text-[1.1rem] min-[62rem]:pr-8 min-[62rem]:text-[1.25rem]"
            >
              "Keindahan sebuah momen bukan terletak pada
              berapa lama ia berlangsung, tapi pada
              bagaimana satu jepretan mampu menangkap
              perasaan dari setiap pose yang kamu bagi. Satu
              jepretan mungkin hanya memakan waktu satu
              detik, namun pose yang kamu nikmati di
              dalamnya akan hidup selamanya."
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <section
      class="relative z-[1] mt-[calc(-1.2*var(--booth-top))] w-full border-0 border-solid bg-[#00423c] pt-[calc(1.4*var(--booth-top))] pb-[var(--booth-bottom)] text-white [--booth-top:20.833vw] [--booth-bottom:20.486vw] [border-image-repeat:stretch] [border-image-slice:300_0_295_0_fill] [border-image-source:url(@/assets/img/bg-zigzag.png)] [border-image-width:var(--booth-top)_0_var(--booth-bottom)_0]"
    >
      <div
        class="mx-auto flex max-w-[1140px] items-center justify-between gap-6 px-6 py-8 max-[30rem]:flex-col max-[30rem]:gap-8 max-[30rem]:text-center"
      >
        <div
          class="max-w-[34rem] flex-[1_1_55%] max-[30rem]:flex-none"
        >
          <p
            class="mb-2 text-[0.75rem] font-medium tracking-[0.08em] text-[#f5a623] uppercase md:text-[clamp(0.75rem,1.6vw,0.95rem)]"
          >
            Lebih dari sekadar foto
          </p>
          <h2
            class="mb-3 text-[1.75rem] leading-[1.2] font-bold text-white md:text-[clamp(1.5rem,4vw,2.75rem)]"
          >
            Masuklah ke dunia
            <br />
            <em class="font-semibold italic">
              penuh kejutan
            </em>
          </h2>
          <p
            class="max-w-[26rem] text-[0.875rem] leading-normal text-white/85 max-[30rem]:mx-auto md:text-[clamp(0.875rem,1.4vw,1rem)]"
          >
            Sebuah ruang kecil untuk tawa besar. Datang apa
            adanya, pilih duniamu, lalu pulang membawa
            cerita.
          </p>
        </div>

        <div
          class="w-[clamp(7rem,22vw,18rem)] flex-initial max-[30rem]:w-[55vw] max-[30rem]:max-w-[14rem]"
        >
          <img
            src="@/assets/img/banner-4.png"
            alt="Bilik photobooth dengan tirai ungu dan bintang"
            class="block h-auto w-full"
          />
        </div>
      </div>
    </section>

    <footer
      class="relative bg-[#be513c] text-white max-md:pb-28"
    >
      <div :class="[container, 'pt-4 pb-6']">
        <div
          class="grid grid-cols-1 gap-8 text-center md:grid-cols-[1.4fr_1fr_1fr] md:gap-12 md:text-start"
        >
          <div>
            <img
              src="@/assets/img/logo.png"
              alt="Logo Photobooth"
              class="mx-auto mb-3 block h-12 w-auto md:mx-0"
            />
            <p
              class="mx-auto max-w-[22rem] text-[0.875rem] leading-[1.6] text-white/85 md:mx-0"
            >
              Ruang kecil untuk tawa besar. Pilih tema,
              jepret pose favoritmu, dan simpan kenangan
              yang bisa kamu lihat kembali kapan saja.
            </p>
            <RouterLink
              to="/photobooth"
              class="mt-5 inline-flex h-11 items-center justify-center rounded-[50rem] bg-[#fcc453] px-6 text-[0.9rem] font-bold text-[#3b2a12] no-underline shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-[translate] duration-200 ease-[ease] hover:-translate-y-0.5"
            >
              Mulai Jepret
            </RouterLink>
          </div>

          <div>
            <h3
              class="mb-3 text-[0.8rem] font-semibold tracking-[0.08em] text-[#fcc453] uppercase"
            >
              Menu
            </h3>
            <ul
              class="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem]"
            >
              <li>
                <RouterLink
                  to="/"
                  class="text-white/90 no-underline hover:text-[#fcc453]"
                >
                  Beranda
                </RouterLink>
              </li>
              <li>
                <a
                  href="#showcase"
                  class="text-white/90 no-underline hover:text-[#fcc453]"
                >
                  Template
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  class="text-white/90 no-underline hover:text-[#fcc453]"
                >
                  Tentang
                </a>
              </li>
              <li>
                <RouterLink
                  to="/login"
                  class="text-white/90 no-underline hover:text-[#fcc453]"
                >
                  Login
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/register"
                  class="text-white/90 no-underline hover:text-[#fcc453]"
                >
                  Register
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3
              class="mb-3 text-[0.8rem] font-semibold tracking-[0.08em] text-[#fcc453] uppercase"
            >
              Kontak
            </h3>
            <ul
              class="m-0 flex list-none flex-col gap-2 p-0 text-[0.9rem] text-white/90"
            >
              <li>Telkom University</li>
              <li>halo@photobooth.id</li>
              <li>@photobooth.id</li>
            </ul>
          </div>
        </div>

        <div
          class="mt-8 border-t border-white/25 pt-4 text-center text-[0.8rem] text-white/75"
        >
          &copy; 2026 Photobooth. Tugas Besar Pengembangan
          Web.
        </div>
      </div>
    </footer>
  </div>
</template>
