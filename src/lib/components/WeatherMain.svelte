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
					<h3 class:pitkanimi={weatherGlobal.selectedCity.length >= 8}>
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
	.icon {
		width: 1em;
	}
	.weather-title {
		clear: both;
		float: left;
	}
	.weather-info {
		font-size: 1em;
		float: right;
	}
	.lamminta {
		color: red;
	}
	.pakkasta {
		color: blue;
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
		color: var(--text-decoration-color);
		font-size: 30px;
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
		max-width: 600px;
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

	.weather-box2 {
		background-color: #47bcffb9;
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
		padding: 1rem; /* Oikean laatikon leveys pienemmäksi */
		text-align: center;
		max-width: 58%;
		flex: 1 1 60%;
		overflow: hidden;
	}

	#main-symbol {
		width: 100%;
		max-width: 80px; /* Voit säätää tätä isommaksi tai pienemmäksi */
		height: auto;
		object-fit: contain;
		overflow: hidden;
	}
	.weather-detail {
		font-size: large;
		/*padding-top: 4rem;*/
	}
	.pitkanimi {
		margin-left: 0 !important;
	}
	.weather-box {
		text-align: left;
	}
	.weather-box2 {
		margin: 0;
	}
	.weather-title,
	.weather-info {
		font-size: 95%;
	}
	.pitkanimi {
		font-size: 25px;
	}
	.rivi {
		justify-content: flex-start;
	}
	h2 {
		float: left;
		margin-left: 5px;
	}
	h3 {
		float: left;
		margin-left: 7px;
		font-size: 25px;
	}
	.weather-inline {
	}
	@media (max-width: 900px) {
		.rectangle-14 {
			margin: 0 auto;
		}
	}

	@media (max-width: 850px) {
		.pitkanimi {
			font-size: 20px;
		}
		.rectangle-14 {
			margin: 0 auto;
		}
		.weather-title,
		.weather-info {
			font-size: 90%;
		}
		@media (max-width: 820px) {
			.weather-title,
			.weather-info {
				font-size: 80%;
			}
		}
	}
	@media (max-width: 768px) {
		/* Tabletit ja pienemmät näytöt */
		.rectangle-14 {
			margin: 0 auto;
		}
		.weather-title,
		.weather-info {
			font-size: 85%;
		}
	}

	@media (max-width: 485px) {
		/* Puhelimet ja pienemmät näytöt */
		.pitkanimi {
			font-size: 15px;
		}
		.weather-title,
		.weather-info {
			font-size: 80%;
		}
		.rivi {
			justify-content: flex-start;
		}
		h3 {
			margin-left: 7px;
		}
		#main-symbol {
			justify-content: flex-start;
		}
		@media (max-width: 420px) {
			.weather-title,
			.weather-info {
				font-size: 75%;
			}
		}
	}
	@media (max-width: 400px) {
		.pitkanimi {
			font-size: 15px;
		}
		h2 {
			font-size: 30px;
			margin-left: 0px;
		}
		#main-symbol {
			width: 75%;
		}
		.weather-title,
		.weather-info {
			font-size: 65%;
		}
		h3 {
			font-size: 20px;
			margin-left: 0px;
		}
		.weather-inline {
			margin-left: 0px;
		}
		.weather-split {
			gap: 0.5rem;
		}
	}
	@media (max-width: 370px) {
		.weather-title,
		.weather-info {
			font-size: 60%;
		}
	}
	@media (max-width: 380px) {
		.pitkanimi {
			font-size: 13px;
		}
	}

	@media (max-width: 350px) {
		.weather-title,
		.weather-info {
			font-size: 55%;
		}
		h3 {
			font-size: 15px;
			margin-left: 0px;
		}
		h2 {
			font-size: 25px;
		}
		.pitkanimi {
			font-size: 10px;
		}
	}
</style>
