<script lang="ts">
	import WeatherHourList from '$lib/components/WeatherHourList.svelte';
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';

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
					<div><h3>{weatherGlobal.selectedCity}</h3></div>
				</div>
				<div class="weather-inline">
					<h2>
						<strong
							class:lamminta={weather.Temperature >= 0}
							class:pakkasta={weather.Temperature < 0}
						>
							{weather.Temperature} °C
						</strong>
					</h2>
				</div>

				<img
					id="main-symbol"
					alt="Sääkuvake"
					src={`/WeatherSymbol3/${weather.WeatherSymbol3}.svg`}
				/>
			</div>

			<!-- Oikea laatikko: lisätiedot -->
			<div class="weather-box2">
				<div class="weather-detail">
					<p class="weather-title">Ilmankosteus</p>
					<p class="weather-info"><b>{weather.Humidity}</b> %</p>

					<p class="weather-title">Tuuli</p>
					<p class="weather-info">
						<img class="icon" src={`/icons/${weather.WindDirection}_wind.svg`} />
						<b>{weather.WindSpeedMS}</b>
						m/s
					</p>

					<p class="weather-title">Pilvipeite</p>
					<p class="weather-info"><b>{weather.TotalCloudCover}</b> %</p>

					<p class="weather-title">Sateen todennäköisyys</p>
					<p class="weather-info"><b>{weather.PoP}</b> %</p>

					<p class="weather-title">Sateen määrä</p>
					<p class="weather-info"><b>{weather.Precipitation1h}</b> mm</p>
				</div>
			</div>
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
	.WeatherMain {
		flex: 1;
	}

	.rivi {
		display: flex;
		justify-content: flex-start;
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
		text-align: center;
		margin-bottom: 0.2rem;
		margin-left: 14px;
	}

	div {
		position: relative;
		box-sizing: border-box;
		max-width: 100%;
		overflow-x: hidden;
	}

	h2 {
		color: var(--text-decoration-color);
		font-size: 38px;
		text-align: left;
		margin-left: 34px;
	}

	p {
		color: var(--text-decoration-color);
		text-align: center;
		margin-top: 1rem; /* Perus marginaali */
		padding-top: 1.5;
	}

	@media (max-width: 768px) {
		/* Tabletit ja pienemmät näytöt */
		p {
			margin-top: 0.5rem; /* Pienempi marginaali pienemmillä näytöillä */
			font-size: medium;
		}
		.rectangle-14 {
			margin: 0 auto;
		}
	}

	@media (max-width: 768px) {
		p {
			font-size: medium;
		}
		b {
			font-size: medium;
		}
	}

	@media (max-width: 480px) {
		/* Puhelimet ja pienemmät näytöt */
		p {
			margin-top: 0.25rem; /* Vielä pienempi marginaali */
			font-size: small;
		}
	}

	.rectangle-14 {
		position: relative;
		background: #d4f3ff;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		/*padding: 1rem;*/
		width: 100%;
		max-width: 600px;
		box-sizing: border-box;
		overflow-x: hidden;
		margin-top: 0, 5rem;
	}
	.small-box-wrapper {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		margin: 1rem 0;
	}

	.small-box {
		background-color: white;
		border-radius: 10px;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		padding: 0.75rem;
		flex: 1;
		text-align: center;
		color: var(--text-decoration-color);
	}

	/* UUSI: säälaatikot rinnakkain */
	.weather-split {
		max-width: 100%;
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		flex-wrap: wrap;
		align-items: stretch;
	}
	.weather-box {
		background-color: rgba(255, 255, 255, 0.35);
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
		padding: 1rem;
		flex: 1 1 45%;
		text-align: center;
		max-height: 375px;
		max-width: 240px; /* Voit säätää leveyttä tarvittaessa */
		overflow: hidden;
	}

	.weather-box2 {
		background-color: rgba(255, 255, 255, 0.35);
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
		padding: 1rem;
		flex: 1 1 250px; /* Oikean laatikon leveys pienemmäksi */
		text-align: center;
		max-height: 375px;
		max-width: 500px; /* Voit säätää leveyttä tarvittaessa */
		overflow: hidden;
	}

	#main-symbol {
		width: 100%;
		max-width: 100px; /* Voit säätää tätä isommaksi tai pienemmäksi */
		height: auto;
		margin-top: 0rem;
		object-fit: contain;
		overflow: hidden;
		float: left;
		margin-left: 20px;
	}
	.weather-detail {
		font-size: large;
		/*padding-top: 4rem;*/
	}
	@media (max-width: 900px) {
		.weather-split {
			display: flex;
			flex-direction: row; /* Pinotaan laatikot pystysuunnassa */
			gap: 1rem; /* Vähän tilaa väliin */
		}

		.weather-box,
		.weather-box2 {
			width: 50%; /* Vie koko rivin leveyden */
			max-width: 50%;
			margin: 0;
		}
	}
</style>
