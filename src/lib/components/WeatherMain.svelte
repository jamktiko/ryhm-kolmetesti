<script lang="ts">
	import WeatherHourList from '$lib/components/WeatherHourList.svelte';
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	import WeatherInfoBox from './WeatherInfoBox.svelte';

	let weather = $derived(weatherGlobal.selectedWeather);
	let weatherDate = $derived(`${weather.Date.getDate()}.${weather.Date.getMonth() + 1}`);
	let weatherTime = $derived(`${weather.Date.getHours()}.00`);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
	/>
</svelte:head>
<div class="rectangle-14">
	{#if weatherGlobal.saatietoTaulukko.length !== 0}
		<div class="weather-split">
			<!-- Vasen laatikko: kaupunki, otsikko, lämpötila ja kuva -->
			<div class="weather-box">
				<div class="rivi">
					<h3 class:pitkanimi={weatherGlobal.selectedCity.length > 8}>
						{weatherGlobal.selectedCity}
					</h3>
				</div>
				<div class="weather-inline">
					<h2>
						<strong
							class:lamminta={weather.Temperature >= 0}
							class:pakkasta={weather.Temperature < 0}
						>
							{weather.Temperature}°
						</strong>
					</h2>
				</div>

				<img id="main-symbol" alt="Sääkuvake" src={`/SmartSymbol/${weather.SmartSymbol}.svg`} />
			</div>
			<WeatherInfoBox {weather} />
		</div>
	{:else}
		<p>Ei säätietoja</p>
	{/if}

	<div></div>
	<WeatherHourList />
</div>

<style>
	img {
		color: #00000000; /** To make alt text invisible when symbol not loaded **/
	}
	.lamminta {
		color: var(--lammin-color);
	}
	.pakkasta {
		color: var(--pakkas-color);
	}

	.rivi {
		display: flex;
		justify-content: center;
		text-align: center;
		flex-wrap: wrap;
		align-items: center;
	}

	:global(:root) {
		font-family: 'Inter', sans-serif;
	}

	h3 {
		color: var(--main-text);
		float: left;
		font-size: 2em;
		margin-top: 0.5em;
	}
	div {
		position: relative;
		box-sizing: border-box;
		max-width: 100%;
		overflow-x: hidden;
	}

	h2 {
		color: var(--text-decoration-color);
		font-size: 5rem;
		text-align: center;
		margin: 1rem 0rem;
	}

	p {
		color: var(--text-decoration-color);
		text-align: center;
		margin-top: 1rem; /* Perus marginaali */
		padding-top: 1.5;
	}

	.rectangle-14 {
		position: relative;
		background: var(--main-color);
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		/*padding: 1rem;*/
		width: 100%;

		box-sizing: border-box;
		overflow-x: hidden;
	}
	/* UUSI: säälaatikot rinnakkain */
	.weather-split {
		max-width: 100%;
		display: flex;
		margin: 0.5rem 0rem;
		flex-wrap: wrap;
		align-items: stretch;
		justify-content: space-evenly;
	}
	.weather-box {
		background-color: var(--sec-color);
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
		padding: 1rem;
		flex: 1 1 40%;
		max-width: 38%;
		text-align: center; /* Voit säätää leveyttä tarvittaessa */
	}

	#main-symbol {
		width: 100%;
		max-width: 80px; /* Voit säätää tätä isommaksi tai pienemmäksi */
		height: auto;
		object-fit: contain;
		overflow: hidden;
	}

	.pitkanimi {
		margin-left: 0 !important;
	}
	.weather-box {
		text-align: left;
	}

	.pitkanimi {
		font-size: 1.5em;
		margin-top: 1em;
	}
	.rivi {
		justify-content: flex-start;
	}
	h2 {
		float: left;
		margin-left: 5px;
	}

	@media (max-width: 900px) {
		.rectangle-14 {
			margin: 0 auto;
		}
	}

	@media (max-width: 850px) {
		.pitkanimi {
			font-size: 1.25em;
		}
		.rectangle-14 {
			margin: 0 auto;
		}

		@media (max-width: 820px) {
		}
	}
	@media (max-width: 768px) {
		/* Tabletit ja pienemmät näytöt */
		.rectangle-14 {
			margin: 0 auto;
		}
		.pitkanimi {
			font-size: 1.5em;
		}
	}
	@media (max-width: 550px) {
		.pitkanimi {
			font-size: 1.25em;
		}
	}
	@media (max-width: 485px) {
		/* Puhelimet ja pienemmät näytöt */
		.pitkanimi {
			font-size: 1.2em;
		}
		h2 {
			font-size: 4em;
		}
	}
	.rivi {
		justify-content: flex-start;
	}
	h3 {
		margin-left: 7px;
		font-size: 165%;
	}
	#main-symbol {
		justify-content: flex-start;
	}
	@media (max-width: 420px) {
		.pitkanimi {
			font-size: 1.15em;
		}
	}
	@media (max-width: 400px) {
		h2 {
			margin-left: 0px;
		}
		#main-symbol {
			width: 75%;
		}
		h3 {
			font-size: 140%;
			margin-left: 0px;
		}
		.weather-inline {
			margin-left: 0px;
		}
		.weather-split {
			gap: 0.25rem;
		}
		.pitkanimi {
			font-size: 1em;
		}
	}
	@media (max-width: 380px) {
		.pitkanimi {
			font-size: 0.95em;
		}
	}
	@media (max-width: 350px) {
		h3 {
			font-size: 125%;
			margin-left: 0px;
		}
		h2 {
			font-size: 45px;
		}
		.pitkanimi {
			font-size: 0.9em;
		}
	}
	@media (max-width: 342px) {
		.pitkanimi {
			font-size: 0.85em;
		}
	}
	@media (max-width: 325px) {
		.pitkanimi {
			font-size: 0.8em;
		}
	}
	@media (max-width: 315px) {
		.pitkanimi {
			font-size: 0.75em;
		}
	}
	@media (max-width: 300px) {
		.pitkanimi {
			font-size: 0.6em;
		}
	}
</style>
