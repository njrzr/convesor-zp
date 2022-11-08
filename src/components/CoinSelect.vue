<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
const props = defineProps(['coinVal', 'coinFormat'])

let selected = ref<string>('')
let input = ref<number>(0)
let number = ref<number>(0)

interface CurrencySelect {
  [currency_name: string]: [string, string, number, number][]
}

interface CoinSelect {
  [currency_name: string]: [string, string, string, number, number][]
}

const currencySelect = computed((): CurrencySelect => {
  return {
    'Bolívar': [
      ['es-VE', 'VES', 2, input.value]
    ],
    'Dólar': [
      ['en-US', 'USD', 2, input.value]
    ],
    'Peso': [
      ['es-CO', 'COP', 2, input.value]
    ],
    'Peso Chileno': [
      ['es-CL', 'CLP', 2, input.value]
    ],
    'Sol': [
      ['es-PE', 'PEN', 2, input.value]
    ],
    'Bitcoin': [
      ['en-US', 'BTC', 8, input.value]
    ],
    'Ether': [
      ['en-US', 'ETH', 8, input.value]
    ],
    'Litecoin': [
      ['en-US', 'LTC', 8, input.value]
    ]
  }
})

const coinSelect = computed((): CoinSelect => {
  return {
    'Bolívar': [
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["ves_usd"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["ves_usd"] / props.coinVal["ves_eur"]))],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] / props.coinVal["ves_usd"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] / props.coinVal["ves_usd"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] / props.coinVal["ves_usd"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["ves_usd"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["ves_usd"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["ves_usd"] * props.coinVal["usd_ltc"]))],
    ],
    'Dólar': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * props.coinVal["ves_usd"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["era_eur"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * props.coinVal["era_cop"])],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * props.coinVal["era_clp"])],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * props.coinVal["era_pen"])],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / props.coinVal["usd_btc"])],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / props.coinVal["usd_eth"])],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / props.coinVal["usd_ltc"])]
    ],
    'Peso': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] / props.coinVal["era_cop"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_cop"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_clp"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_cop"] / props.coinVal["era_pen"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))]
    ],
    'Peso Chileno': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] / props.coinVal["era_clp"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_clp"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_cop"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value / (props.coinVal["era_clp"] / props.coinVal["era_pen"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))]
    ],
    'Sol': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] / props.coinVal["era_pen"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value / props.coinVal["era_pen"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_eur"]))],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_cop"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value / (props.coinVal["era_pen"] / props.coinVal["era_clp"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value / (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))]
    ],
    'Bitcoin': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] * props.coinVal["usd_btc"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_btc"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_btc"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_btc"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_btc"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_eth"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_btc"] / props.coinVal["usd_ltc"]))]
    ],
    'Ether': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] * props.coinVal["usd_eth"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_eth"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_eth"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_eth"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_eth"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_eth"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_btc"]))],
      ['Conversión a Litecoin', 'en-US', 'LTC', 8, (input.value * (props.coinVal["usd_eth"] / props.coinVal["usd_ltc"]))]
    ],
    'Litecoin': [
      ['Conversión a Bolívares', 'es-VE', 'VES', 2, (input.value * (props.coinVal["ves_usd"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Dólares', 'en-US', 'USD', 2, (input.value * props.coinVal["usd_ltc"])],
      ['Conversión a Euros', 'en-EU', 'EUR', 2, (input.value * props.coinVal["eur_ltc"])],
      ['Conversión a Pesos', 'es-CO', 'COP', 2, (input.value * (props.coinVal["era_cop"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Pesos Chilenos', 'es-CL', 'CLP', 2, (input.value * (props.coinVal["era_clp"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Soles', 'es-PE', 'PEN', 2, (input.value * (props.coinVal["era_pen"] * props.coinVal["usd_ltc"]))],
      ['Conversión a Bitcoin', 'en-US', 'BTC', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_btc"]))],
      ['Conversión a Ether', 'en-US', 'ETH', 8, (input.value * (props.coinVal["usd_ltc"] / props.coinVal["usd_eth"]))]
    ]
  }
})

function clearInput(el: any) {
  el.target.value = ''
}
</script>

<template>
  <div class="relative flex justify-around items-center gap-2 mt-1 p-2 bg-royal rounded-lg">
    <select class="appearance-none w-1/4 text-2xl p-1 bg-arrow bg-no-repeat bg-contain bg-right" v-model="selected">
      <option disabled value="">Elige moneda</option>
      <option>Bolívar</option>
      <option>Dólar</option>
      <option>Peso</option>
      <option>Peso Chileno</option>
      <option>Sol</option>
      <option>Bitcoin</option>
      <option>Ether</option>
      <option>Litecoin</option>
    </select>
    <input class="w-3/4 text-2xl text-center p-1" type="number" inputmode="numeric" pattern="[0-9]*" :step="number"
      placeholder="Ingrese monto a calcular" @focus="clearInput" title="Solo ingresar números" autocomplete="off"
      required v-model="input" />
  </div>

  <div class="relative grid grid-cols-4 gap-1 w-full mx-auto mt-1" v-if="selected != ''">
    <div class="col-span-4 bg-royal rounded-lg p-1">
      <p class="p-1 text-white text-center text-3xl font-semibold">{{ coinFormat(currencySelect[selected][0]) }}
        equivalen a
      </p>
    </div>
    <div class="bg-royal rounded-lg py-1 px-2" v-for="coin of coinSelect[selected]">
      <p class="text-white font-semibold">{{ coin[0] }}</p>
      <p class="text-white text-right text-xl selection:bg-white selection:text-royal select-text">{{
          coinFormat([coin[1], coin[2], coin[3], coin[4]])
      }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
