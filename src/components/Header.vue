<template>
  <header class="fixed top-0 left-0 right-0 z-10 flex items-center justify-between w-full h-20 px-8 text-white bg-gray-300">
    <router-link to="/" class="logotype-container">
      <div class="logotype flex items-center mt-[10px] gap-4">
        <img src="/logo.png" alt="logo" class="w-14" />
        <div>
          <h2 class="text-2xl font-extrabold uppercase text-slate-800 custom-h2">Stylish-Sneakers</h2>
          <p class="text-sm font-semibold text-white custom-podp">Магазин люксовых кроссовок</p>
        </div>
      </div>
    </router-link>

    <ul class="flex items-center gap-6 md:gap-10 lg:gap-14">
      <li @click="() => emit('openDrawer')" class="menu-item">
        <img class="w-11 basket-icon" src="/basket_icon.svg" alt="Корзина" />
        <span class="hidden menu-text md:block">Корзина</span>
      </li>
      
      <router-link to="/profile" class="menu-item">
        <img class="w-10 profile-icon" src="/profile_icon.svg" alt="Профиль" />
        <span class="hidden menu-text md:block">Профиль</span>
      </router-link>
    </ul>
  </header>
</template>

<script setup>
    const emit = defineEmits(['openDrawer'])
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-text {
  font-weight: 600; 
}

.menu-item:hover .menu-text {
  color: #000000; 
}

.menu-item:hover .profile-icon {
  content: url('/profile_icon_hover.svg'); 
}

.menu-item:hover .basket-icon {
  content: url('/basket_icon_hover.svg'); 
}

.menu-item:hover .favorite-icon {
  content: url('/favorite_icon_hover.svg'); 
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

