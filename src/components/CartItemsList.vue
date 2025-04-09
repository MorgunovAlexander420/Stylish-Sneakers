<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart } = inject('cart')
</script>

<template>
  <div class="flex flex-col gap-4 overflow-y-auto flex-grow custom-scroll">
    <CartItem
      v-for="item in cart"
      :key="item.title"
      :id="item.id"
      :title="item.title"
      :price="item.price"
      :image-url="item.imageUrl"
    />
  </div>
</template>
