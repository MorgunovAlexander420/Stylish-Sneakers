<script setup>
import { inject } from 'vue'

const removeFromCart = inject('removeFromCart')

const props = defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  quantity: Number
})

const removeItem = () => {
  removeFromCart({ title: props.title, imageUrl: props.imageUrl, price: props.price })
}
</script>

<template>
  <div class="flex items-center border border-slate-200 p-2 rounded-xl gap-5">
    <img class="w-24 h-24" :src="imageUrl" />
    <div class="flex flex-col flex-grow mr-2">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <p class="font-bold">{{ price }} руб.</p>
        <img
          class="delete w-10 h-10 cursor-pointer transition opacity-60 hover:opacity-100"
          src="/close.svg"
          alt="Удалить"
          @click="removeItem"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 1600px) {
  .delete {
    height: 35px;
    width: 35px;
  }
}
</style>
