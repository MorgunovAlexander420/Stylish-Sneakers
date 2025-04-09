<script setup>
import { ref, provide, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Footer from './components/Footer.vue'

const drawerOpen = ref(false)
const cart = ref([])

const openDrawer = () => {
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
}

provide('cart', {
  cart,
  closeDrawer,
  openDrawer
})

// Функция для добавления товара в корзину
const addToCart = (item) => {
  cart.value.push(item)
  console.log('Updated cart:', cart.value) // Добавьте логирование, чтобы убедиться, что данные записываются в localStorage
  localStorage.setItem('cart', JSON.stringify(cart.value))
}

// Функция для удаления товара из корзины
const removeFromCart = (item) => {
  const index = cart.value.findIndex((cartItem) => cartItem.title === item.title)

  if (index !== -1) {
    if (cart.value[index].quantity > 1) {
      // Если товар больше одного, уменьшаем его количество
      cart.value[index].quantity--
    } else {
      // Если товар один, удаляем его
      cart.value.splice(index, 1)
    }
  }

  localStorage.setItem('cart', JSON.stringify(cart.value)) // Обновляем localStorage
}
// Загрузка корзины из localStorage
onMounted(() => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart) // Восстанавливаем корзину из localStorage
  }
})
provide('addToCart', addToCart)
provide('removeFromCart', removeFromCart)

// Загружаем данные о товарах в избранном из localStorage
const savedFavorites = localStorage.getItem('favorites')
const favorites = ref(savedFavorites ? JSON.parse(savedFavorites) : [])

// Функция для добавления товара в избранное
const addToFavorites = (item) => {
  if (!favorites.value.some((fav) => fav.title === item.title)) {
    favorites.value.push(item)
    localStorage.setItem('favorites', JSON.stringify(favorites.value)) // Сохраняем в localStorage
  }
}

// Функция для удаления товара из избранного
const removeFromFavorites = (item) => {
  favorites.value = favorites.value.filter((fav) => fav.title !== item.title)
  localStorage.setItem('favorites', JSON.stringify(favorites.value)) // Обновляем localStorage
}

// Предоставляем данные для дочерних компонентов
provide('favorites', favorites)
provide('addToFavorites', addToFavorites)
provide('removeFromFavorites', removeFromFavorites)

const route = useRoute()
</script>

<template>
  <div class="page-container">
    <Drawer v-if="drawerOpen" />

    <div v-if="route.name === 'Home'" class="image relative mt-8 mb-8 w-full shadow-2xl">
      <img src="/Интерьер.jpg" class="w-full h-[700px] object-cover" />
      <div class="absolute inset-0 bg-black bg-opacity-60"></div>
      <div class="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h2 class="text-white text-6xl font-bold drop-shadow-lg">Ощути комфорт на каждом шаге!</h2>
        <p class="ab1 text-white text-4xl mt-4">Более 1000 оригинальных кроссовок</p>
        <p class="ab2 text-white text-3xl mt-2">Доставка в любую точку России</p>
      </div>
    </div>
    <Header @open-drawer="openDrawer" />
    <div
      :class="{
        'bg-zinc-300': route.name === 'Profile',
        'bg-slate-100': route.name !== 'Profile'
      }"
      class="content-container m-auto mt-[90px] shadow-3xl shadow-black rounded-3xl content"
    >
      <div class="catalog p-8">
        <router-view></router-view>
      </div>
    </div>

    <Footer />
  </div>
</template>

<style scoped>
.content-container {
  width: 90%;
  max-width: 1200px;
}

header {
  max-width: 100vw;
  z-index: 1;
}

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
}

.content-container {
  flex: 1;
}

footer {
  width: 100%;
  max-width: 100vw;
  margin-top: 30px;
  z-index: 1;
}

@media (max-width: 1200px) {
  .image h2 {
    font-size: 55px;
  }
}
@media (max-width: 992px) {
  .image h2 {
    font-size: 45px;
  }
  .image .ab1 {
    font-size: 31px;
  }
  .image .ab2 {
    font-size: 25px;
  }
}
@media (max-width: 780px) {
  .image h2 {
    font-size: 32px;
  }
  .image .ab1 {
    font-size: 26px;
  }
  .image .ab2 {
    font-size: 22px;
  }
}

@media (max-width: 580px) {
  .catalog {
    padding: 16px;
  }
  .image h2 {
    font-size: 26px;
  }
  .image .ab1 {
    font-size: 21px;
  }
  .image .ab2 {
    font-size: 19px;
  }
}
@media (max-width: 465px) {
  .image h2 {
    font-size: 23px;
  }
  .image .ab1 {
    font-size: 20px;
  }
  .image .ab2 {
    font-size: 17px;
  }
}
</style>
