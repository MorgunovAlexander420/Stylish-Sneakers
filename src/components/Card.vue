<script setup>
import { ref, inject, computed } from 'vue'

const addToCart = inject('addToCart')
const favorites = inject('favorites')
const removeFromFavorites = inject('removeFromFavorites')
const addToFavorites = inject('addToFavorites')

const props = defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean
})

const favoriteState = computed(() => {
  return favorites.value.some((fav) => fav.title === props.title)
})

const toggleFavorite = () => {
  const item = { title: props.title, imageUrl: props.imageUrl, price: props.price }

  if (favoriteState.value) {
    removeFromFavorites(item)
  } else {
    addToFavorites(item)
  }
}

const addToCartHandler = () => {
  const item = { title: props.title, imageUrl: props.imageUrl, price: props.price }
  addToCart(item)
}
</script>

<template>
  <div
    class="relative bg-white border border-slate-200 rounded-3xl p-8 mt-2 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl transition flex flex-col justify-between h-full"
  >
    <img
      :src="favoriteState ? '/like-2.svg' : '/like-1.svg'"
      alt="like"
      class="like-icon absolute border border-gray-200 rounded-xl top-8 left-8"
      @click="toggleFavorite"
    />
    <img :src="imageUrl" alt="sneaker" class="sneaker-img" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5 mb-3">
      <div class="flex flex-col">
        <span class="text-slate-400 text-price">Цена:</span>
        <span class="text-lg font-bold">{{ price }} руб.</span>
      </div>

      <button
        class="plus bg-gray-200 text-white mt-3 w-8 h-8 rounded-xl flex items-center justify-center text-xl hover:bg-gray-300 active:bg-gray-400 transition"
        @click="addToCartHandler"
      >
        <p class="mb-1">+</p>
      </button>
    </div>
  </div>
</template>
<style scoped>
/* Карточка адаптивна */
.card {
  padding: 12px;
}

.sneaker-img {
  max-height: 150px;
  object-fit: contain; /* Предотвращаем обрезание изображения */
}

.text-price {
  font-size: 14px;
}

@media (max-width: 540px) {
  .relative {
    padding: 8px; /* Уменьшаем отступы */
  }

  .text-lg {
    font-size: 14px; /* Уменьшаем размер текста */
  }

  .sneaker-img {
    max-height: 120px; /* Пропорционально уменьшаем изображение */
  }

  button {
    width: 35px;
    height: 35px;
  }

  .like-icon {
    width: 30px;
    left: 17px;
    top: 17px;
  }

  .plus {
    height: 30px;
    width: 30px;
  }
}
</style>
