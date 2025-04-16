<template>
  <footer class="footer bg-gray-300 w-full h-[80px] border border-t-stone-200">
    <div class="flex items-center justify-center h-full">
      <div class="flex gap-1">
        <img src="/copyright.svg" alt="" class="cop" />
        <p class="text-slate-600">2015–2024 Stylish-Sneakers — магазин брендовой обуви</p>
      </div>

      <div class="flex gap-3 ml-10 cursor-pointer">
        <img
          src="/logo_Inst.svg"
          class="inst w-9 hover:scale-[1.15] hover:transition-transform duration-200"
        />
        <img
          src="/logo_telegram.svg"
          class="tg w-8 hover:scale-[1.15] hover:transition-transform duration-200"
        />
        <img
          src="/logo_whatsapp.svg"
          class="wa w-8 hover:scale-[1.15] hover:transition-transform duration-200"
        />
      </div>
    </div>
  </footer>
</template>
<style scoped>
@media (max-width: 1120px) {
  .cop {
    width: 13px;
  }
  p {
    font-size: 14px;
  }
  .inst {
    width: 28px;
  }
  .tg {
    width: 26px;
  }
  .wa {
    width: 26px;
  }
}
@media (max-width: 660px) {
  footer .flex {
    flex-direction: column;
    align-items: center;
  }

  footer .flex.gap-1 {
    flex-direction: row;
    align-items: center;
    gap: 8px;
  }

  footer .flex.gap-3 {
    margin-top: 10px;
    flex-direction: row;
    justify-content: center;
  }

  footer .inst,
  footer .tg,
  footer .wa {
    width: 24px;
  }
}
@media (max-width: 480px) {
  .footer {
    padding-top: 30px;
    height: auto;
  }

  footer .flex {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }
  @media (max-width: 480px) {
    .footer {
      padding-top: 30px;
      height: auto;
    }

    footer .flex {
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
    }

    footer .flex.gap-1 {
      flex-direction: row;
      gap: 5px;
      align-items: baseline;
    }

    footer p {
      white-space: normal;
      word-wrap: break-word;
      width: calc(100% - 20px);
    }

    footer .flex.gap-3 {
      margin-top: 20px;
      width: calc(100% - 20px);
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    footer .inst,
    footer .tg,
    footer .wa {
      width: 22px;
      margin-right: 10px;
      margin-top: 5px;
    }
  }

  footer .flex.gap-1 {
    flex-direction: row;
    gap: 5px;
    align-items: baseline;
  }

  footer p {
    white-space: normal;
    word-wrap: break-word;
    width: calc(100% - 20px);
  }

  footer .flex.gap-3 {
    margin-top: 10px;
    width: calc(100% - 20px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  footer .inst,
  footer .tg,
  footer .wa {
    width: 22px;
    margin-right: 10px;
    margin-bottom: 15px;
  }
}
</style>
