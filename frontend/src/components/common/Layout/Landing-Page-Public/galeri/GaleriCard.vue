<script setup>
defineProps(['gambar', 'judul', 'deskripsi'])
</script>

<template>
  <figure
    class="group h-full overflow-hidden rounded-[1.25rem] border border-[#dce8e2] bg-white p-2 shadow-[0_2px_10px_rgba(21,58,43,0.04)]"
  >
    <img
      :src="gambar"
      :alt="judul"
      class="h-64 w-full rounded-[0.9rem] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      loading="lazy"
    />
    <figcaption class="px-2 pt-3 pb-2">
      <h3 class="text-[0.98rem] font-bold text-[#153A2B]">
        {{ judul }}
      </h3>
      <p class="mt-0.5 text-[0.82rem] text-[#5b6b64]">
        {{ deskripsi }}
      </p>
    </figcaption>
  </figure>
</template>
