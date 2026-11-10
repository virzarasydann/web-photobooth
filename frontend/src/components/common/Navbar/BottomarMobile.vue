<script setup></script>

<template>
  <nav
    class="fixed inset-x-0 bottom-0 z-50 border-t border-[#E6F0EB] bg-white md:hidden"
    aria-label="Navigasi utama"
  >
    <ul
      class="mx-auto m-0 flex max-w-[28rem] list-none flex-row items-center gap-1 p-2"
    >
      <li class="flex-1">
        <RouterLink
          to="/landing-v2"
          class="flex flex-col items-center gap-1 rounded-[50rem] px-3 py-1.5 text-[#153A2B] no-underline [&.router-link-exact-active]:bg-[#D8E1E3]"
        >
          <!-- Ikon rumah -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M3.5 10.5 12 3.5l8.5 7" />
            <path
              d="M5.5 9.5V19a1.5 1.5 0 0 0 1.5 1.5h3v-5h4v5h3a1.5 1.5 0 0 0 1.5-1.5V9.5"
            />
          </svg>
          <span class="text-[0.68rem] font-medium">
            Beranda
          </span>
        </RouterLink>
      </li>

      <li class="flex-1">
        <RouterLink
          to="/photobooth/guest"
          class="flex flex-col items-center gap-1 rounded-[50rem] px-3 py-1.5 text-[#153A2B] no-underline [&.router-link-exact-active]:bg-[#D8E1E3]"
        >
          <!-- Ikon kamera -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M9.8 5.5h4.4c.4 0 .8.2 1.05.55l.7 1h2.05A2.5 2.5 0 0 1 20.5 9.55v6.95a2.5 2.5 0 0 1-2.5 2.5H6a2.5 2.5 0 0 1-2.5-2.5V9.55A2.5 2.5 0 0 1 6 7.05h2.05l.7-1c.25-.35.65-.55 1.05-.55Z"
            />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
          <span class="text-[0.68rem] font-medium">
            Mulai
          </span>
        </RouterLink>
      </li>

      <li class="flex-1">
        <RouterLink
          to="/login"
          class="flex flex-col items-center gap-1 rounded-[50rem] px-3 py-1.5 text-[#153A2B] no-underline [&.router-link-exact-active]:bg-[#D8E1E3]"
        >
          <!-- Ikon masuk -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M14.5 4h3A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-3"
            />
            <path d="m10 16 4-4-4-4" />
            <path d="M14 12H4" />
          </svg>
          <span class="text-[0.68rem] font-medium">
            Masuk
          </span>
        </RouterLink>
      </li>

      <li class="flex-1">
        <RouterLink
          to="/register"
          class="flex flex-col items-center gap-1 rounded-[50rem] px-3 py-1.5 text-[#153A2B] no-underline [&.router-link-exact-active]:bg-[#D8E1E3]"
        >
          <!-- Ikon orang +-->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M14.5 20v-1.2a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20"
            />
            <circle cx="8.5" cy="7.5" r="3.5" />
            <path d="M18.5 8v6" />
            <path d="M21.5 11h-6" />
          </svg>
          <span class="text-[0.68rem] font-medium">
            Daftar
          </span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
