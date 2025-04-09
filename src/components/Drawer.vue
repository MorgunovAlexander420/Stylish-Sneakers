<script setup>
import { ref, provide, inject, computed } from 'vue'
import CartItemsList from './CartItemsList.vue'

const { cart, closeDrawer } = inject('cart')

// Вычисляемая переменная для подсчета общей стоимости товаров в корзине
const totalPrice = computed(() => {
  return cart.value.reduce((total, item) => total + item.price * (item.quantity || 1), 0)
})

provide('totalPrice', totalPrice)

// Реактивное состояние для отслеживания оплаты
const isPaid = ref(false)

// Метод для обработки нажатия на кнопку "Оформить заказ"
const handleCheckout = () => {
  cart.value = [] // Очищаем корзину
  isPaid.value = true // Устанавливаем статус "оплачено"
}
</script>

<template>
  <div class="fixed bg-black top-0 left-0 h-full w-full z-10 opacity-70"></div>
  <div class="bg-white w-1/4 h-full right-0 top-0 fixed z-20 p-8 flex flex-col">
    <div class="flex items-center gap-5 mb-10">
      <svg
        @click="() => closeDrawer()"
        class="rotate-180 opacity-40 cursor-pointer hover:opacity-100 transition"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <h2 class="text-3xl font-bold">Корзина</h2>
    </div>

    <!-- Условие для отображения сообщения о пустой корзине или успешной оплате -->
    <div
      v-if="cart.length === 0 && !isPaid"
      class="flex flex-col items-center justify-center text-center text-lg text-gray-600 h-full"
    >
      <img src="/package-icon.png" class="w-28 mb-4" />
      <p>Ваша корзина пуста</p>
    </div>

    <!-- Условие для отображения сообщения о завершении оплаты -->
    <div
      v-if="isPaid"
      class="flex flex-col items-center justify-center text-center text-lg text-gray-600 h-full"
    >
      <img src="/tick.ico" class="w-24 mb-4" />
      <p>Товар успешно оплачен</p>
    </div>

    <!-- Список товаров в корзине -->
    <CartItemsList v-else />

    <!-- Итог и кнопка оформления заказа -->
    <div v-if="cart.length > 0 && !isPaid" class="mb-5 mt-7">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <span>{{ totalPrice }} руб.</span>
      </div>
      <button
        @click="handleCheckout"
        class="bg-lime-500 text-white font-bold text-lg w-full rounded-xl py-4 mt-7 hover:bg-lime-600 active:bg-lime-700 transition"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>
<style scoped>
/* Боковая панель корзины */
.bg-white {
  width: 25%; /* Ширина по умолчанию */
  height: 100%;
}

/* Стиль кнопки "Оформить заказ" */
button {
  font-size: 1rem;
}

@media (max-width: 1360px) {
  .bg-white {
    width: 35%; /* Уменьшаем ширину корзины на планшетах */
  }
}

@media (max-width: 950px) {
  .bg-white {
    width: 55%; /* Уменьшаем ширину корзины на небольших экранах */
  }

  h2 {
    font-size: 1.5rem; /* Уменьшаем размер заголовка */
  }

  button {
    font-size: 0.9rem; /* Уменьшаем размер текста на кнопке */
    padding: 10px; /* Сужаем высоту кнопки */
  }
}

@media (max-width: 600px) {
  .bg-white {
    width: 100%; /* Почти весь экран на очень маленьких экранах */
    padding: 16px; /* Уменьшаем внутренние отступы */
  }

  h2 {
    font-size: 1.25rem; /* Еще меньше заголовок */
  }

  button {
    font-size: 0.85rem;
  }
}
</style>
