<script setup lang="ts">
const props = defineProps(['coinVal', 'coinFormat'])

interface Coins {
  [coin: string]: [country: string, bill: string, offset: number, value: number]
}

interface Format {
  [bill: string]: string
}

let multiply: number = 1000

const coins: Coins = {
  vesToUsd: ['es-VE', 'VES', 2, props.coinVal["ves_usd"]],
  vesToEur: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["ves_eur"])],
  usdToBtc: ['en-US', 'USD', 2, props.coinVal["usd_btc"]],
  usdToEth: ['en-US', 'USD', 2, props.coinVal["usd_eth"]],
  usdToLtc: ['en-US', 'USD', 2, props.coinVal["usd_ltc"]],
  copToUsd: ['es-CO', 'COP', 2, props.coinVal["era_cop"]],
  vesToCop: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["era_cop"]) * multiply],
  vesToPen: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["era_pen"])],
  copToVes: ['es-CO', 'COP', 2, (props.coinVal["era_cop"] / props.coinVal["ves_usd"])],
  vesToClp: ['es-VE', 'VES', 2, (props.coinVal["ves_usd"] / props.coinVal["era_clp"]) * multiply]
}

const format: Format = {
  vesToUsd: 'Bolivares por Dolar',
  vesToEur: 'Bolivares por Euro',
  usdToBtc: 'Dolares por Bitcoin',
  usdToEth: 'Dolares por Ether',
  usdToLtc: 'Dolares por Litecoin',
  copToUsd: 'Pesos por Dolar',
  vesToCop: 'Bolivares por ' + multiply + ' Pesos',
  vesToPen: 'Bolivares por Sol',
  vesToClp: 'Bolivares por ' + multiply + ' CLP',
  copToVes: 'Pesos por Bolivar'
}
</script>

<template>
  <div class="relative grid grid-cols-4 gap-1 w-full mx-auto mt-1">
    <div v-for="coin, index in coins" key="index" class="bg-royal rounded-lg py-1 px-2">
      <p class="text-white font-semibold">{{ format[index] }}</p>
      <p class="text-white text-right text-xl selection:bg-white selection:text-royal select-text">{{ coinFormat(coin)
      }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
