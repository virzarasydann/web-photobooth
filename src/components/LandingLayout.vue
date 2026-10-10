<template>
  <nav
    class="fixed inset-x-0 bottom-14 md:top-0 md:bottom-auto p-4"
  >
    <div
      class="flex flex-row max-w-2xs md:flex-row md:max-w-4xl w-full mx-auto bg-[#2F523E] rounded-2xl items-center mt-4 p-4 gap-4"
    >
      <div
        class="bg-white p-1 px-4 rounded-2xl w-full md:w-auto text-center"
      >
        <RouterLink
          to="/login"
          class="text-gray-800 font-semibold"
        >
          Beranda
        </RouterLink>
      </div>

      <div class="flex gap-4 text-white">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </div>
  </nav>

  <main
    class="bg-blue-200 min-h-screen pt-28 pb-32 md:pb-8 overflow-x-hidden"
  >
    <section class="max-w-7xl mx-auto">
      <div
        class="flex flex-col md:flex-row items-center gap-8 md:gap-52"
      >
        <div class="text-center md:text-justify md:pl-28">
          <h1 class="text-5xl md:text-7xl font-extrabold">
            Jepret Pose
          </h1>
          <h1
            class="text-5xl md:text-7xl font-extrabold mb-4"
          >
            Favoritmu!
          </h1>
          <p>
            Tunjukkan gayamu, abadikan momen seru bersama
            teman, keluarga, atau orang tersayang, dan buat
            kenangan yang bisa kamu lihat kembali kapan
            saja.
          </p>
          <RouterLink
            to="/login"
            class="bg-[#2F523E] w-1/2 text-white m-4 rounded-2xl py-3 px-6 inline-block no-underline hover:bg-green-900 text-center font-bold text-2xl"
          >
            Start
          </RouterLink>
        </div>

        <div class="w-full">
          <img
            src="@/assets/first-image.png"
            alt="First"
            width="w-full"
            
          />
        </div>
      </div>
    </section>
    <section
      class="py-48 bg-[url(@/assets/wave.png)] flex max-w-8xl mx-auto justify-center overflow-hidden md:bg-cover  bg-repeat-round" 
    >
      <div class="flex flex-row w-full mx-auto gap-8">
        <div class="text-center bg-amber-600 w-1/6">
          <img 
            src="@/assets/gorden.png"
            alt=""
            class="block w-full  h-auto"
          />
        </div>

        <div class="text-center bg-black w-full">
          <h2
            class="text-2xl md:text-4xl font-bold text-white"
          >
            Teks di Tengah Wave
          </h2>
          <p class="text-white">Deskripsi di sini</p>
        </div>
      </div>
    </section>

    <section class="w-full overflow-hidden">
      <img
        src="@/assets/background-footer.png"
        alt=""
        class="block w-full max-w-full h-auto"
      />
    </section>

    
  </main>
</template>
