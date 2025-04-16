<template>
  <div @click="props.closeDrawer" class="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-70"></div>
  <div class="fixed top-0 right-0 z-20 flex flex-col w-1/4 h-full p-8 bg-white">
    <div class="flex items-center gap-5 mb-10">
      <h2 class="text-3xl font-bold">Корзина</h2>
    </div>

    <div v-if="isLoading" class="flex items-center justify-center h-full">
      <Loading></Loading>
    </div>

    <div v-else-if="sneakers.length > 0" class="flex flex-col flex-grow gap-4 overflow-y-auto custom-scroll">
      <div v-for="item in sneakers" :key="item.id">
        <CartItem
          :title="item.title"
          :price="item.price"
          :image-url="item.image"
          :item-id="item.id"
          @remove="removeItemFromCart(item.id)"
        />
      </div>
      <div class="mb-5 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <span>{{ totalPrice }} руб.</span>
        </div>
        <button
          @click="handleCheckout"
          class="w-full py-4 text-lg font-bold text-white transition bg-slate-800 rounded-xl mt-7 hover:bg-slate-600 active:bg-slate-700"
        >
          Оформить заказ
        </button>
      </div>
    </div>

    <div v-else-if="isOrderComplete" class="flex flex-col items-center justify-center h-full text-lg text-center text-gray-600">
      <img src="/order.png" class="mb-4 w-28" />
      <p>Заказ успешно оформлен</p>
      <button
        @click="props.closeDrawer"
        class="w-full py-4 text-lg font-bold text-white transition bg-slate-800 rounded-xl mt-7 hover:bg-slate-600 active:bg-slate-700"
      >
        Вернуться назад
      </button>
    </div>

    <div v-else class="flex flex-col items-center justify-center h-full text-lg text-center text-gray-600">
      <img src="/box.png" class="mb-4 w-28" />
      <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
      <button
        @click="props.closeDrawer"
        class="w-full py-4 text-lg font-bold text-white transition bg-slate-800 rounded-xl mt-7 hover:bg-slate-600 active:bg-slate-700"
      >
        Вернуться назад
      </button>
    </div>
  </div>
  <Toast :message="errorMessage" />
</template>

<script setup>
import { ref, computed, onMounted, defineProps, provide } from 'vue'
import instance from '@/services/axiosInstance'
import CartItem from './CartItem.vue'
import Loading from './Loading.vue'

const props = defineProps({
  closeDrawer: Function
})

const sneakers = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const isOrderComplete = ref(false)

const totalPrice = computed(() => {
  return sneakers.value.reduce((total, item) => total + item.price, 0)
})

const getUserCartItems = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''
    const response = await instance.get('http://127.0.0.1:8000/api/cart/items')

    if (response.status === 200) {
      sneakers.value = response.data
    } else {
      throw new Error('Ошибка получения данных')
    }
  } catch (error) {
    errorMessage.value = 'Ошибка: ' + (error.response?.data?.error || error.message)
  } finally {
    isLoading.value = false
  }
}

const handleCheckout = async () => {
  try {
    isLoading.value = true
    const response = await instance.post(`http://127.0.0.1:8000/api/cart/order`)
    
    if (response.status === 200) {
      isOrderComplete.value = true
      sneakers.value = []
    } else {
      throw new Error('Ошибка при удалении товара')
    }
  } catch (error) {
    errorMessage.value = 'Ошибка: ' + (error.response?.data?.error || error.message)
  } finally {
    isLoading.value = false
  }
}

const removeItemFromCart = async (itemId) => {
  try {
    const response = await instance.delete(`http://127.0.0.1:8000/api/cart/remove/${itemId}`)
    
    if (response.status === 200) {
      sneakers.value = sneakers.value.filter(item => item.id !== itemId)
    } else {
      throw new Error('Ошибка при удалении товара')
    }
  } catch (error) {
    errorMessage.value = 'Ошибка: ' + (error.response?.data?.error || error.message)
  } 
}

provide('totalPrice', totalPrice)

onMounted(() => {
  getUserCartItems()
})
</script>

<style scoped>
.bg-white {
  width: 25%; 
  height: 100%;
}

button {
  font-size: 1rem;
}

@media (max-width: 1360px) {
  .bg-white {
    width: 35%; 
  }
}

@media (max-width: 950px) {
  .bg-white {
    width: 55%; 
  }

  h2 {
    font-size: 1.5rem; 
  }

  button {
    font-size: 0.9rem; 
    padding: 10px;
  }
}

@media (max-width: 600px) {
  .bg-white {
    width: 100%;
    padding: 16px; 
  }

  h2 {
    font-size: 1.25rem;
  }

  button {
    font-size: 0.85rem;
  }
}
</style>
