new Vue ({
	el: '#main-container',
	data: {
		dolarToday: 'https://s3.amazonaws.com/dolartoday/data.json',
		exchange: 'https://openexchangerates.org/api/latest.json?app_id=ae86587758744760bca3f3f4107b2369&show_alternative=1&symbols=COP,EUR,VEF_BLKMKT',
		crypto: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DAI,USDC,DASH&tsyms=USD,EUR,COP,VES&api_key={4a8910b13d689849c08919735481e44ff67190790f102938ee30e1a95169ae70}',
		input: '',
		selected: '',
		number: 0,
		ves_usd: null,
		ves_eur: null,
		era_cop: null,
		era_eur: null,
		usd_btc: null,
		eur_btc: null,
		cop_btc: null,
		loading: true,
		error: false
	},
	watch: {
		selected() {
			if(this.selected == 'Bolívar') {
				this.number = 100000.00
			}
			else if(this.selected == 'Peso') {
				this.number = 10000.00
			}
			else if(this.selected == 'Dólar') {
				this.number = 10.00
			}
			else if(this.selected == 'Bitcoin') {
				this.number = 0.10
			}
		}
	},
	methods: {
		coinFormat(lang, currency, digits, value) {
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
					case 'EUR':
						return '€0.00';
						break;
					case 'BTC':
						return 'BTC 0.00000000';
						break;
					}
			}
			else {
				return Intl.NumberFormat(lang, {style: 'currency', currency: currency, minimumFractionDigits: digits}).format(value);
			}
		},
		showNotes(index) {
			let from = document.getElementsByClassName('notes')[index]
			let hide = document.getElementsByClassName('super')[index]
			from.classList.toggle('show-notes')
			hide.style.visibility = 'hidden'
			setTimeout(() => {
				from.classList.toggle('show-notes');
				hide.style.visibility = 'visible';
			}, 4000);
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
					this.usd_btc = cryptoGet.data.BTC.USD
					this.eur_btc = cryptoGet.data.BTC.EUR
					this.cop_btc = cryptoGet.data.BTC.COP
				}
			))
			.catch(error => {
				console.log(error)
				this.error = true
      })
      .finally(() => this.loading = false)
	}
})
