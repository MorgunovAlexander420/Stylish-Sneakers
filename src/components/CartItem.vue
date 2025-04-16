<template>
  <div class="flex items-center gap-5 p-2 border border-slate-200 rounded-xl min-h-[150px] relative">
    <img :src="imageUrl" class="max-w-[120px] h-auto object-contain" />

    <div class="flex flex-col flex-grow pr-10">
      <p class="text-base">{{ title }}</p>
      <div class="flex items-center justify-between mt-2">
        <p class="font-bold">{{ price }} руб.</p>
      </div>
    </div>

    <img
      class="absolute w-8 h-8 transition transform -translate-y-1/2 cursor-pointer top-1/2 right-10 opacity-60 hover:opacity-100 delete"
      src="/close.svg"
      alt="Удалить"
      @click="removeItem"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  imageUrl: String,
  price: Number,
  itemId: Number,  
})

const emit = defineEmits(['remove'])  

const removeItem = () => {
  emit('remove') 
}
</script>