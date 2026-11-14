<script setup>
import TopBarV2 from '@/components/common/Navbar/TopBarV2.vue'
import BottomarMobile from '@/components/common/Navbar/BottomarMobile.vue'
import HeroSection from '@/components/common/Layout/Landing-Page-Public/hero/HeroSection.vue'
import CaraKerjaSection from '@/components/common/Layout/Landing-Page-Public/cara-kerja/CaraKerjaSection.vue'
import FooterSection from '@/components/common/Layout/Landing-Page-Public/footer/FooterSection.vue'
import GaleriSection from '@/components/common/Layout/Landing-Page-Public/galeri/GaleriSection.vue'
import CtaSection from '@/components/common/Layout/Landing-Page-Public/cta/CtaSection.vue'
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
      <HeroSection />
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
