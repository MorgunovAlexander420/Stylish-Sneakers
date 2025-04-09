<script setup>
const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header
    class="bg-black text-white w-full h-20 fixed top-0 left-1/2 flex justify-between px-8 px-20 px-60"
  >
    <router-link to="/">
      <div class="logotype flex items-center mt-[10px] gap-4">
        <img src="/logoK2.png" alt="logo" class="w-14" />
        <div>
          <h2 class="text-2xl font-extrabold uppercase custom-h2">Stylish-Sneakers</h2>
          <p class="text-slate-300 text-sm custom-podp">Магазин люксовых кроссовк</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-6 md:gap-10 lg:gap-14">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-2 md:gap-3 cursor-pointer text-sm md:text-lg text-white-600S hover:text-slate-400"
      >
        <img src="/Корзина.svg" alt="Корзина" class="w-9" />
        <span class="text-xl">Корзина</span>
      </li>

      <router-link to="/favorites">
        <li
          class="flex items-center gap-2 md:gap-3 cursor-pointer text-sm md:text-lg text-white-600 font-medium hover:text-slate-400"
        >
          <img src="/Закладки.svg" alt="Закладки" class="w-8" />
          <span class="text-xl">Закладки</span>
        </li>
      </router-link>

      <router-link to="/profile">
        <li
          class="flex items-center gap-2 md:gap-3 cursor-pointer text-sm md:text-lg text-white-600 font-medium hover:text-slate-400"
        >
          <img src="/Профиль.svg" alt="Профиль" class="w-8" />
          <span class="text-xl">Профиль</span>
        </li>
      </router-link>
    </ul>
  </header>
</template>
<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%; /* Занимает всю ширину экрана */
  z-index: 1;
}

@media (max-width: 1120px) {
  header {
    position: absolute;
    width: 100%;
  }
  ul {
    gap: 30px;
  }
}
@media (max-width: 885px) {
  header {
    padding-left: 25px;
    padding-right: 25px;
  }
  header .logotype {
    width: 45px;
    gap: 13px;
  }

  header .custom-h2 {
    font-size: 19px;
    white-space: nowrap;
  }

  header .custom-podp {
    font-size: 13px;
    white-space: nowrap;
  }
  ul {
    gap: 15px;
  }
  ul img {
    width: 25px;
  }
}
@media (max-width: 700px) {
  ul li b,
  ul li span {
    display: none;
  }

  ul img {
    width: 30px;
  }
  ul {
    gap: 30px;
    margin-left: -3px;
  }
  header .logotype {
    width: 40px;
    gap: 13px;
    margin-left: 6px;
  }

  header .custom-h2 {
    font-size: 15px;
    white-space: nowrap;
  }

  header .custom-podp {
    font-size: 11px;
    white-space: nowrap;
  }
}
@media (max-width: 480px) {
  header {
    padding-left: 10px;
    padding-right: 10px;
  }
  ul img {
    width: 22px;
  }
  ul {
    gap: 20px;
    margin-left: -3px;
  }
  header .logotype {
    width: 35px;
    gap: 8px;
    margin-left: 6px;
  }

  header .custom-h2 {
    font-size: 13px;
    white-space: nowrap;
  }

  header .custom-podp {
    font-size: 10px;
    white-space: nowrap;
  }
}
</style>
