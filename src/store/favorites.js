import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([]) // Список товаров в закладках

  // Добавить товар в закладки
  const addToFavorites = (item) => {
    if (!favorites.value.find((fav) => fav.title === item.title)) {
      favorites.value.push(item)
    }
  }

  // Удалить товар из закладок
  const removeFromFavorites = (item) => {
    favorites.value = favorites.value.filter((fav) => fav.title !== item.title)
  }

  // Проверить, есть ли товар в закладках
  const isInFavorites = (item) => {
    return favorites.value.some((fav) => fav.title === item.title)
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isInFavorites
  }
})
