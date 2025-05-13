<script lang="ts">
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import type { Weather } from '$lib/types/weather';
	interface Props {
		weather: Weather;
	}
	let { weather }: Props = $props();
	let viikonPaivat = [
		'Sunnuntai',
		'Maanantai',
		'Tiistai',
		'Keskiviikko',
		'Torstai',
		'Perjantai',
		'Lauantai'
	];
</script>

<button
	class:active={weather.Date.getDate() === weatherGlobal.selectedDay}
	onclick={() => {
		weatherGlobal.selectedDay = weather.Date.getDate();
		if (
			weatherGlobal.saatietoTaulukko[0].Date.getDay() === weather.Date.getDay() &&
			weatherGlobal.saatietoTaulukko[0].Date.getHours() > weatherGlobal.selectedHour
		) {
			// Jos valittu päivä on eka päivä ja eka saatavilla oleva tunti on enemmän kuin tämän hetkinen valittu tunti, asettaa valituksi tunniksi ensimmäisen saatavilla olevan tunnin.
			weatherGlobal.selectedHour = weatherGlobal.saatietoTaulukko[0].Date.getHours();
		} else {
			//weatherGlobal.selectedHour = 0; //Poistettu käytöstä, että ei nollaakkaan tuntia
		}
	}}
>
	<span>
		<b>{`${viikonPaivat[weather.Date.getDay()].slice(0, 2)}  `}</b> <br />
		{`${weather.Date.getDate()}.${weather.Date.getMonth() + 1}.`}
	</span>

	<img alt="Sääsymboli" src={`SmartSymbol/${weather.SmartSymbol}.svg`} />

	<p class:lamminta={weather.Temperature >= 0} class:pakkasta={weather.Temperature < 0}>
		<b>{weather.Temperature} °</b>
		<!-- Tuo &nbsp merkki lisää välilyönnin -->
	</p>
</button>

<style>
	img {
		width: 40px;
		height: 40px;
		color: #00000000; /** To make alt text invisible when symbol not loaded **/
	}
	.pakkasta {
		color: var(--pakkas-color);
	}
	button {
		color: var(--main-text);
		padding-left: 1em;
		padding-right: 1em;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		font-size: 1.125em;
		transition: background-color 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		text-align: left;
		border-radius: 20px;
	}

	button:hover,
	.active {
		background-color: var(--active-color);
	}
	@media (max-width: 768px) {
		button {
			flex-direction: column;
			flex-wrap: nowrap;
			text-align: center;
			width: 14%;
			flex: 1 1 14%;
			padding: 0;
		}
		p {
			margin-top: 1em;
			margin-bottom: 0.5em;
		}
		span {
			margin-top: 0.5em;
			margin-bottom: 0.5em;
		}
	}
	@media (max-width: 362px) {
		button {
			font-size: small;
		}
		img {
			width: 36px;
			heigth: 40px;
		}
	}
</style>
