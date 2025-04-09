<script setup>
import Card from './Card.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      title="Adidas originals Samba OG Cloud White Core Black"
      image-url="/sneakers/Samba.webp"
      :price="8700"
    />
    <Card title="Asics Gel-Contend 4 Grey Black" image-url="/sneakers/Asics.webp" :price="10000" />
    <Card
      title="Adidas Originals Ozweego Chalk Pearl"
      image-url="/sneakers/Ozweego.webp"
      :price="11000"
    />
    <Card
      title="PEAK Parker Seven Basketball Shoes Men Low-Top Black White"
      image-url="/sneakers/Basketball.webp"
      :price="9000"
    />
    <Card title="New Balance 9060 Sea Salt" image-url="/sneakers/9060.webp" :price="12000" />
    <Card title="Nike Dunk Low 'Panda Black White" image-url="/sneakers/Dunk.webp" :price="8000" />
    <Card
      title="New Balance 2002R Protection Pack Rain Cloud"
      image-url="/sneakers/2002R.webp"
      :price="13990"
    />
    <Card title="UGG Lowmel Sand" image-url="/sneakers/UGG.webp" :price="16990" />
    <Card
      title="WARRIOR High Street Cool Gray Chunky Sneaker Men Swag"
      image-url="/sneakers/WARRIOR.webp"
      :price="5000"
    />
    <Card title="JORDAN 1 Mid Oakland" image-url="/sneakers/Oakland.webp" :price="13499" />
    <Card
      title="Nike Dunk Low Chinese New Year Firecracker 2021"
      image-url="/sneakers/Firecracker.webp"
      :price="20000"
    />
    <Card title="Puma Suede Black White" image-url="/sneakers/Suede.webp" :price="9000" />
    <Card
      title="Ocai 001 RETRO Skateboard Shoes Unisex Low-Top Vintage White"
      image-url="/sneakers/Ocai.webp"
      :price="12000"
    />
    <Card
      title="Nike Dunk Low Essential Paisley Pack Green"
      image-url="/sneakers/DunkGreen.webp"
      :price="9000"
    />
    <Card
      title="Puma Suede 'Archive Remastered'"
      image-url="/sneakers/PumaGreen.webp"
      :price="7000"
    />
    <Card
      title="Nike Air Force 1 Low '07 'Triple White'"
      image-url="/sneakers/Force.webp"
      :price="10000"
    />
  </div>
</template>
<style scoped>
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
    grid-template-columns: repeat(2, 1fr); /* 2 колонки для узких экранов */
    gap: 12px; /* Уменьшаем зазоры между карточками */
  }
}

@media (max-width: 540px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Всегда 2 колонки даже на маленьких экранах */
    gap: 8px; /* Делаем ещё меньшее расстояние для компактного отображения */
  }
}
</style>
