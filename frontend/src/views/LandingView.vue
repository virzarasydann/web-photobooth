<script setup>
import TopBarV2 from '@/components/common/Navbar/TopBarV2.vue'
import BottomarMobile from '@/components/common/Navbar/BottomarMobile.vue'
import AppButton from '@/components/common/button/AppButton.vue'
import CaraKerjaSection from '@/components/common/Layout/Landing-Page-Public/CaraKerjaSection.vue'
import FooterSection from '@/components/common/Layout/Landing-Page-Public/FooterSection.vue'
import GaleriSection from '@/components/common/Layout/Landing-Page-Public/GaleriSection.vue'
import CtaSection from '@/components/common/Layout/Landing-Page-Public/CtaSection.vue'

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
    <TopBarV2 />
    <BottomarMobile />
    <div class="flex min-h-svh flex-col">
      <main
        class="flex flex-1 items-center pt-8 pb-6 md:pt-16 md:pb-8"
      >
        <div :class="[container, 'w-full']">
          <div
            class="grid grid-cols-1 items-center gap-6 md:grid-cols-2 min-[62rem]:gap-12"
          >
            <div class="text-center md:text-start">
              <h1
                class="mb-4 text-[clamp(2.4rem,6vw,4rem)] leading-[1.06] font-extrabold tracking-[-0.02em] text-[#153A2B]"
              >
                Sentuhan Hangat di Tiap
                <span
                  class="relative inline-block text-[#7E3300]"
                >
                  Potongan Strip
                  <svg
                    viewBox="0 0 220 12"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                    class="absolute -bottom-1 left-0 h-2.5 w-full text-[#7E3300]"
                  >
                    <path
                      d="M3 8 Q 15 2 27 8 T 51 8 T 75 8 T 99 8 T 123 8 T 147 8 T 171 8 T 195 8 T 217 8"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
                Kenangan.
              </h1>
              <p
                class="mx-auto mt-4 mb-8 max-w-[22rem] text-base leading-[1.35] text-[#111] md:mx-0"
              >
                Tunjukkan gayamu, abadikan momen seru
                bersama teman, keluarga, atau orang
                tersayang, dan buat kenangan yang bisa kamu
                lihat kembali kapan saja.
              </p>

              <div
                class="flex flex-wrap items-center justify-center gap-3 md:justify-start"
              >
                <AppButton
                  variant="primary"
                  to="/photobooth/guest"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-[1.15rem] w-[1.15rem]"
                    aria-hidden="true"
                  >
                    <path
                      d="M9.4 4.5c.2-.5.7-.8 1.2-.8h2.8c.5 0 .9.3 1.2.8l.6 1.1H18a3 3 0 0 1 3 3V16a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8.6a3 3 0 0 1 3-3h2.8l.6-1.1ZM12 9.2A3.3 3.3 0 1 0 12 15.8 3.3 3.3 0 0 0 12 9.2Z"
                    />
                  </svg>
                  Mulai
                </AppButton>
                <AppButton variant="outline" to="/login">
                  Masuk
                </AppButton>
                <AppButton variant="soft" to="/register">
                  Daftar
                </AppButton>
              </div>
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
      class="relative z-2 mt-8 min-h-[120vh] w-full border-0 border-solid pt-6 pb-9 [--wave-bottom:7.639vw] [--wave-top:4.861vw] [border-image-repeat:stretch] [border-image-slice:70_0_110_0_fill] [border-image-source:url(@/assets/img/background-wave.png)] [border-image-width:var(--wave-top)_0_var(--wave-bottom)_0] md:pt-16 md:pb-28"
    >
      <CaraKerjaSection />
    </section>

    <section>
      <GaleriSection />
    </section>
    <CtaSection />
    <FooterSection />
  </div>
</template>
