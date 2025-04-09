<script setup>
import CardList from '../components/CardList.vue'
</script>

<template>
  <div class="flex justify-between">
    <h2 class="text-4xl font-bold mb-8">Каталог товаров</h2>
    <div class="relative">
      <img class="absolute left-3 top-3" src="/search.svg" />
      <input
        class="border border-slate-300 p-2 rounded-lg pl-9 pr-2 outline-none focus:border-slate-400"
        type="text"
        placeholder="Поиск кроссовок"
      />
    </div>
  </div>

  <CardList />
</template>
<style scoped>
@media (max-width: 740px) {
  h2 {
    font-size: 30px;
  }

  input {
    font-size: 14px;
  }
}
@media (max-width: 540px) {
  .flex {
    flex-direction: column;
    align-items: center;
  }

  h2 {
    margin-bottom: 4px;
    text-align: center; /* Центрируем заголовок */
  }

  input {
    width: 100%;
    margin: 12px 0 12px 0;
    font-size: 16px; /* Увеличиваем текст для удобства */
  }

  img {
    margin-top: 12px;
  }
}
</style>
