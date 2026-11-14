<script setup>
import TopBarV2 from '@/components/common/Navbar/TopBarV2.vue'
import BottomarMobile from '@/components/common/Navbar/BottomarMobile.vue'
import DaftarPaketSection from '@/components/common/Layout/PaketView/DaftarPaketSection.vue'
import KualitasCetakSection from '@/components/common/Layout/PaketView/KualitasCetakSection.vue'
import KomparasiPaketSection from '@/components/common/Layout/PaketView/KomparasiPaketSection.vue'
import FooterSection from '@/components/common/Layout/Landing-Page-Public/footer/FooterSection.vue'
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

    <DaftarPaketSection />
    <KualitasCetakSection />
    <KomparasiPaketSection />

    <FooterSection />
  </div>
</template>
