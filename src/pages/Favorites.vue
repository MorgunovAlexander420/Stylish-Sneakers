<script setup>
import { inject } from 'vue'

const addToCart = inject('addToCart') // Подключение функции добавления в корзину
const removeFromFavorites = inject('removeFromFavorites')
const favorites = inject('favorites')

// Удаление товара из избранного
const removeFavoriteItem = (item) => {
  removeFromFavorites(item)
}

// Добавление товара в корзину
const addToCartHandler = (item) => {
  addToCart(item)
}
</script>

<template>
  <div>
    <h2 class="text-4xl font-bold mb-8">Закладки</h2>

    <!-- Проверка на наличие избранных товаров -->
    <div v-if="favorites.length > 0">
      <div class="grid grid-cols-4 gap-4">
        <!-- Перебор всех товаров в избранных -->
        <div
          v-for="item in favorites"
          :key="item.title"
          class="relative bg-white border border-slate-200 rounded-3xl p-8 mt-2 cursor-pointer shadow-lg hover:-translate-y-2 hover:shadow-2xl transition flex flex-col justify-between h-full"
        >
          <!-- Лайк-кнопка для удаления товара из избранного -->
          <img
            src="/like-2.svg"
            alt="like"
            class="like-icon absolute border border-gray-200 rounded-xl top-8 left-8"
            @click="removeFavoriteItem(item)"
          />
          <!-- Изображение товара -->
          <img :src="item.imageUrl" alt="sneaker" class="sneaker-img" />
          <p class="mt-2">{{ item.title }}</p>

          <div class="flex justify-between mt-5">
            <div class="flex flex-col">
              <span class="text-slate-400 text-price">Цена:</span>
              <span class="text-lg font-bold">{{ item.price }} руб.</span>
            </div>

            <!-- Кнопка добавления в корзину -->
            <button
              class="plus bg-gray-200 text-white mt-3 w-8 h-8 rounded-xl flex items-center justify-center text-xl hover:bg-gray-300 active:bg-gray-400 transition"
              @click="addToCartHandler(item)"
            >
              <p class="mb-1">+</p>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Сообщение, если нет избранных товаров -->
    <p v-else class="text-2xl mb-8 flex justify-center items-center h-64">Нет избранных товаров.</p>
  </div>
</template>
<style scoped>
/* Сетка товаров */
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* По умолчанию — 4 колонки */
  gap: 16px;
}

@media (max-width: 1120px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 колонки на средних экранах */
  }
}

@media (max-width: 810px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 колонки на узких экранах */
    gap: 12px; /* Уменьшаем расстояние между карточками */
  }
}

@media (max-width: 540px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Всегда 2 колонки на маленьких экранах */
    gap: 8px; /* Минимальное расстояние */
  }
}

/* Карточка товара */
.relative {
  padding: 12px;
}

.sneaker-img {
  max-height: 150px;
  object-fit: contain;
}

.text-price {
  font-size: 14px;
}

@media (max-width: 540px) {
  .relative {
    padding: 8px; /* Уменьшаем отступы */
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

  .sneaker-img {
    max-height: 120px; /* Пропорционально уменьшаем изображение */
  }

  .text-lg {
    font-size: 14px; /* Уменьшаем размер текста */
  }

  button {
    width: 35px;
    height: 35px;
  }
}
</style>
