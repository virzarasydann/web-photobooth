<template>
  <li
    class="flex items-start gap-3 text-[0.85rem] leading-snug text-[#3f4d46]"
  >
    <span
      class="mt-0.5 flex h-[1.1rem] w-[1.1rem] shrink-0 items-center justify-center rounded-full bg-[#2D5141] text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-2.5 w-2.5"
        aria-hidden="true"
      >
        <path d="m5 12 5 5 9-10" />
      </svg>
    </span>
    <span
      class="[&_strong]:font-bold [&_strong]:text-[#153A2B]"
    >
      <slot />
    </span>
  </li>
</template>
