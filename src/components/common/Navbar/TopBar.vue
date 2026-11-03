<script setup>
const container =
  'w-full mx-auto px-3 min-[36rem]:max-w-[540px] md:max-w-[720px] min-[62rem]:max-w-[960px] min-[75rem]:max-w-[1140px] min-[87.5rem]:max-w-[1320px]'
</script>

<template>
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
</template>
