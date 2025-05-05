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

	<div>
		{#if weatherGlobal.saatietoTaulukko.length > 0}
			<div class="button-container">
				{#each weatherDayList as day, index}
					<button
						class:active={day.Date.getDate() === weatherGlobal.selectedDay}
						onclick={() => {
							weatherGlobal.selectedDay = day.Date.getDate();
							if (weatherGlobal.saatietoTaulukko[0].Date.getDay() === day.Date.getDay()) {
								// Jos valittu päivä on eka päivä, asettaa valituksi tunniksi ensimmäisen saatavilla olevan tunnin. Muuten laittaa nollan
								weatherGlobal.selectedHour = weatherGlobal.saatietoTaulukko[0].Date.getHours();
							} else {
								weatherGlobal.selectedHour = 0;
							}
						}}
					>
						<p>
							<b>{`${viikonPaivat[day.Date.getDay()].slice(0, 2)}`}</b> <br />
							{`${day.Date.getDate()}.${day.Date.getMonth() + 1}`}
						</p>
						<p>
							&nbsp&nbsp&nbsp<img src={`WeatherSymbol3/${day.WeatherSymbol3}.svg`} />
						</p>
						<p class:lamminta={day.Temperature >= 0} class:pakkasta={day.Temperature < 0}>
							&nbsp&nbsp&nbsp{day.Temperature} ° <!-- Tuo &nbsp merkki lisää välilyönnin -->
						</p>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.lamminta {
		color: red;
	}
	.pakkasta {
		color: blue;
	}
	button {
		width: 100%;
		background: var(--main-color);
		border: none;
		cursor: pointer;
		font-size: 16px;
		transition: background-color 0.3s ease;
		display: inline-flex;
		align-items: center;
		justify-content: space-around;
		text-align: center;
	}

	.active {
		background-color: var(--active-color);
	}

	button:hover {
		background-color: var(--active-color);
		color: white;
	}

	.button-container {
		display: flex;
		flex-wrap: wrap; /* mahdollistaa painikkeiden siirtymisen seuraavalle riville */
		justify-content: flex-start;
	}

	.weather-info {
		margin-top: 20px;
		font-size: 18px;
	}

	.rectangle-15 {
		background: var(--main-color);
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		width: 100%;
		max-width: 300px;
		overflow-x: hidden;
	}

	/* Responsiivisuus: keskitetään rectangle-15 alle 768px näytöillä */
	@media (max-width: 768px) {
		.rectangle-15 {
			margin: 0 auto; /* keskittää vaakasuunnassa */
		}
	}
</style>
