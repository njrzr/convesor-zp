new Vue ({
  el: '#main-container',
  data: {
    dolarToday: 'https://s3.amazonaws.com/dolartoday/data.json',
    exchange: 'https://openexchangerates.org/api/latest.json?app_id=ae86587758744760bca3f3f4107b2369&show_alternative=1&symbols=COP,EUR,VEF_BLKMKT,PEN,CLP',
    crypto: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DAI,LTC&tsyms=USD,EUR,COP,VES,CLP,PEN&api_key={4a8910b13d689849c08919735481e44ff67190790f102938ee30e1a95169ae70}',
    input: '',
    selected: '',
    number: 0,
    ves_usd: null,
    ves_eur: null,
    era_cop: null,
    era_eur: null,
    era_pen: null,
    era_clp: null,
    usd_btc: null,
    usd_ltc: null,
    usd_eth: null,
    eur_btc: null,
    eut_eth: null,
    eur_ltc: null,
    isActive: false,
    loading: true,
    error: false
  },
  watch: {
    selected() {
      if(this.selected == 'Bolívar') {
      this.number = 100000.00
      }
      else if(this.selected == 'Dólar') {
      this.number = 10.00
      }
      else if(this.selected == 'Peso') {
      this.number = 10000.00
      }
      else if(this.selected == 'Peso Chileno') {
      this.number = 100.00
      }
      else if(this.selected == 'Sol') {
      this.number = 1.00
      }
      else if(this.selected == 'Bitcoin') {
      this.number = 0.001
      }
      else if(this.selected == 'Ether') {
      this.number = 0.10
      }
      else if(this.selected == 'Litecoin') {
      this.number = 0.10
      }
    }
  },
  methods: {
    coinFormat([lang, currency, digits, value]) {
    if (isNaN(value)) {
      switch (currency) {
        case 'VES':
          return 'Bs.S 0,00';
          break;
        case 'COP':
          return '$ 0,00';
          break;
        case 'USD':
          return '$0.00';
          break;
        case 'PEN':
          return 'S/ 0.00';
          break;
        case 'CLP':
          return '$ 0.00';
          break;
        case 'BTC':
          return 'BTC 0.00000000';
          break;
        case 'LTC':
          return 'LTC 0.00000000';
          break;
        case 'ETH':
          return 'ETH 0.00000000';
          break;
      }
    }
    else {
    return Intl.NumberFormat(lang, {style: 'currency', currency: currency, minimumFractionDigits: digits}).format(value);
    }
    },
    showNotes() {
      this.isActive = true
      setTimeout(() => {
        this.isActive = false
      }, 5000);
    }
  },
  computed: {
    coins() {
      return {
        'vesToUsd': ['es-VE', 'VES', 2, this.ves_usd],
        'vesToEur': ['es-VE', 'VES', 2, this.ves_eur],
        'usdToBtc': ['en-US', 'USD', 2, this.usd_btc],
        'usdToEth': ['en-US', 'USD', 2, this.usd_eth],
        'usdToLtc': ['en-US', 'USD', 2, this.usd_ltc],
        'copToUsd': ['es-CO', 'COP', 2, this.era_cop],
        'vesToCop': ['es-VE', 'VES', 2, (this.ves_usd / this.era_cop)],
        'vesToPen': ['es-VE', 'VES', 2, (this.ves_usd / this.era_pen)],
        'copToVes': ['es-CO', 'COP', 4, (this.era_cop / this.ves_usd)],
        'vesToClp': ['es-VE', 'VES', 2, (this.ves_usd / this.era_clp)]
      }
    },
    coinSelect() {
      return {
        'Bolívar': [
          ['es-VE', 'VES', 2, this.input],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input / this.ves_usd)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input / this.ves_eur)]],
          ['Conversión a Pesos', ['es-CO', 'COP', 2, (this.input * (this.era_cop / this.ves_usd))]],
          ['Conversión a Pesos Chilenos',['es-CL', 'CLP', 2, (this.input * (this.era_clp / this.ves_usd))]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input * (this.era_pen / this.ves_usd))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input / (this.ves_usd * this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input / (this.ves_usd * this.usd_eth))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input / (this.ves_usd * this.usd_ltc))]]
        ],
        'Dólar': [
          ['en-US', 'USD', 2, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * this.ves_usd)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input * this.era_eur)]],
          ['Conversión a Pesos', ['es-CO', 'COP', 2, (this.input * this.era_cop)]],
          ['Conversión a Pesos Chilenos' ,['es-CL', 'CLP', 2, (this.input * this.era_clp)]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input * this.era_pen)]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input / this.usd_btc)]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input / this.usd_eth)]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input / this.usd_ltc)]]
        ],
        'Peso': [
          ['es-CO', 'COP', 2, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd / this.era_cop))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input / this.era_cop)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input / (this.era_cop / this.era_eur))]],
          ['Conversión a Pesos Chilenos' ,['es-CL', 'CLP', 2, (this.input / (this.era_cop / this.era_clp))]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input / (this.era_cop / this.era_pen))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input / (this.era_cop * this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input / (this.era_cop * this.usd_eth))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input / (this.era_cop * this.usd_ltc))]]
        ],
        'Peso Chileno': [
          ['es-CL', 'CLP', 2, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd / this.era_clp))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input / this.era_clp)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input / (this.era_clp / this.era_eur))]],
          ['Conversión a Pesos' ,['es-CO', 'COP', 2, (this.input / (this.era_clp / this.era_cop))]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input / (this.era_clp / this.era_pen))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input / (this.era_clp * this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input / (this.era_clp * this.usd_eth))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input / (this.era_clp * this.usd_ltc))]]
        ],
        'Sol': [
          ['es-PE', 'PEN', 2, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd / this.era_pen))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input / this.era_pen)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input / (this.era_pen / this.era_eur))]],
          ['Conversión a Pesos' ,['es-CO', 'COP', 2, (this.input / (this.era_pen / this.era_cop))]],
          ['Conversión a Pesos Chilenos' ,['es-CL', 'CLP', 2, (this.input / (this.era_pen / this.era_clp))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input / (this.era_pen * this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input / (this.era_pen * this.usd_eth))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input / (this.era_pen * this.usd_ltc))]]
        ],
        'Bitcoin': [
          ['en-US', 'BTC', 8, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd * this.usd_btc))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input * this.usd_btc)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input * this.eur_btc)]],
          ['Conversión a Pesos', ['es-CO', 'COP', 2, (this.input * (this.era_cop * this.usd_btc))]],
          ['Conversión a Pesos Chilenos' ,['es-CL', 'CLP', 2, (this.input * (this.era_clp * this.usd_btc))]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input * (this.era_pen * this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input * (this.usd_btc / this.usd_eth))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input * (this.usd_btc / this.usd_ltc))]]
        ],
        'Ether': [
          ['en-US', 'ETH', 8, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd * this.usd_eth))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input * this.usd_eth)]],
          ['Conversión a Euros' ,['en-EU', 'EUR', 2, (this.input * this.eur_eth)]],
          ['Conversión a Pesos' ,['es-CO', 'COP', 2, (this.input * (this.era_cop * this.usd_eth))]],
          ['Conversión a Pesos Chilenos', ['es-CL', 'CLP', 2, (this.input * (this.era_clp * this.usd_eth))]],
          ['Conversión a Soles', ['es-PE', 'PEN', 2, (this.input * (this.era_pen * this.usd_eth))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input * (this.usd_eth / this.usd_btc))]],
          ['Conversión a Litecoin', ['en-US', 'LTC', 8, (this.input * (this.usd_eth / this.usd_ltc))]]
        ],
        'Litecoin': [
          ['en-US', 'LTC', 8, this.input],
          ['Conversión a Bolívares', ['es-VE', 'VES', 2, (this.input * (this.ves_usd * this.usd_ltc))]],
          ['Conversión a Dólares', ['en-US', 'USD', 2, (this.input * this.usd_ltc)]],
          ['Conversión a Euros', ['en-EU', 'EUR', 2, (this.input * this.eur_ltc)]],
          ['Conversión a Pesos', ['es-CO', 'COP', 2, (this.input * (this.era_cop * this.usd_ltc))]],
          ['Conversión a Pesos Chilenos' ,['es-CL', 'CLP', 2, (this.input * (this.era_clp * this.usd_ltc))]],
          ['Conversión a Soles' ,['es-PE', 'PEN', 2, (this.input * (this.era_pen * this.usd_ltc))]],
          ['Conversión a Bitcoin', ['en-US', 'BTC', 8, (this.input * (this.usd_ltc / this.usd_btc))]],
          ['Conversión a Ether', ['en-US', 'ETH', 8, (this.input * (this.usd_ltc / this.usd_eth))]]
        ]
      }
    },
    selectCoin() {
      return {
        select: this.selected
      }
    }
  },
  mounted() {
    axios
      .all([axios.get(this.dolarToday), axios.get(this.exchange), axios.get(this.crypto)])
      .then(axios.spread((dolarTodayGet, exchangeGet, cryptoGet) => {
        this.ves_usd = dolarTodayGet.data.USD.promedio
        this.ves_eur = dolarTodayGet.data.EUR.promedio
        this.era_cop = exchangeGet.data.rates.COP
        this.era_eur = exchangeGet.data.rates.EUR
        this.era_pen = exchangeGet.data.rates.PEN
        this.era_clp = exchangeGet.data.rates.CLP
        this.usd_btc = cryptoGet.data.BTC.USD
        this.eur_btc = cryptoGet.data.BTC.EUR
        this.eur_eth = cryptoGet.data.ETH.EUR
        this.eur_ltc = cryptoGet.data.LTC.EUR
        this.usd_ltc = cryptoGet.data.LTC.USD
        this.usd_eth = cryptoGet.data.ETH.USD
      }))
      .catch(error => {
        console.log(error)
        this.error = true
      })
      .finally(() => this.loading = false)
  }
})
