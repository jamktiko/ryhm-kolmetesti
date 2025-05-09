<script lang="ts">
	import { onMount } from 'svelte';
	import type { Weather } from '$lib/types/weather';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	let weatherDayList = $derived(weatherGlobal.weatherDayList);

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

<!-- ui juttuja -->
<div class="rectangle-15">
	<!-- <div class="rivi">
		<div>
			<h2>Muiden päivien säätiedot</h2>
		</div>
		<div>
			<h3>Valitse päivä</h3>
		</div>
	</div> -->

	{#if weatherGlobal.saatietoTaulukko.length > 0}
		<div class="button-container">
			{#each weatherDayList as day, index}
				<button
					class:active={day.Date.getDate() === weatherGlobal.selectedDay}
					onclick={() => {
						weatherGlobal.selectedDay = day.Date.getDate();
						if (
							weatherGlobal.saatietoTaulukko[0].Date.getDay() === day.Date.getDay() &&
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
						<b>{`${viikonPaivat[day.Date.getDay()].slice(0, 2)}  `}</b> <br />
						{`${day.Date.getDate()}.${day.Date.getMonth() + 1}.`}
					</span>

					<img alt="Sääsymboli" src={`SmartSymbol/${day.SmartSymbol}.svg`} />

					<p class:lamminta={day.Temperature >= 0} class:pakkasta={day.Temperature < 0}>
						<b>{day.Temperature} °</b>
						<!-- Tuo &nbsp merkki lisää välilyönnin -->
					</p>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
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

	.button-container {
		padding: 0.5rem;
		height: 100%;
		display: flex;
		flex-wrap: wrap; /* mahdollistaa painikkeiden siirtymisen seuraavalle riville */
		justify-content: flex-start;
		align-items: stretch;
		box-sizing: border-box;
	}

	.weather-info {
		margin-top: 20px;
		font-size: 18px;
	}

	.rectangle-15 {
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		width: 100%;

		overflow-x: hidden;
		background: var(--main-color);
	}

	/* Responsiivisuus: keskitetään rectangle-15 alle 768px näytöillä */
	@media (max-width: 768px) {
		.rectangle-15 {
			margin: 0 auto; /* keskittää vaakasuunnassa */
		}
		.button-container {
			flex-direction: row;
			flex-wrap: nowrap;
		}
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
	@media (min-width: 769px) {
		.rectangle-15 {
			max-width: 300px;
		}
	}
	@media (max-width: 362px) {
		button {
			font-size: small;
		}
		img {
			width: 36px;
		}
	}
	h3 {
		text-align: center;
	}
</style>
