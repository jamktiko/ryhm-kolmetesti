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

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
/>
<div class="rectangle-14">
	{#if weatherGlobal.saatietoTaulukko.length !== 0}
		<div class="weather-split">
			<!-- Vasen laatikko: kaupunki, otsikko, lämpötila ja kuva -->
			<div class="weather-box">
				<div class="rivi">
					<div><h2>{weatherGlobal.selectedCity}</h2></div>
				</div>
				<h2>
					<strong>
						{weather.Temperature} °C
					</strong>
				</h2>
				<img alt="Sääkuvake" src={`/WeatherSymbol3/${weather.WeatherSymbol3}.svg`} />
			</div>

			<!-- Oikea laatikko: lisätiedot -->
			<div class="weather-box">
				<div class="weather-detail">
					<p>
						Ilmankosteus {weather.Humidity} %
					</p>
					<p>
						Tuulen nopeus {weather.WindSpeedMS} m/s
					</p>
					<p>
						Tuulen suunta {weather.WindDirection} °
					</p>
					<p>
						Pilvisyys {weather.TotalCloudCover} %
					</p>
					<p>
						Sateen todennäköisyys {weather.Precipitation1h} %
					</p>
					<p>
						Sateen määrä {weather.Precipitation1h} mm
					</p>
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
	.WeatherMain {
		flex: 1;
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
		color: var(--third-color);
		font-size: x-large;
		text-align: center;
		font-weight: normal;
	}

	div {
		position: relative;
		box-sizing: border-box;
		max-width: 100%;
		overflow-x: hidden;
	}

	h2 {
		color: var(--text-decoration-color);
		font-size: xx-large;
		text-align: center;
	}

	p {
		color: var(--text-decoration-color);
		text-align: center;
		margin-top: 1, 0rem; /* Perus marginaali */
		padding-top: 1, 5;
	}

	@media (max-width: 768px) {
		/* Tabletit ja pienemmät näytöt */
		p {
			margin-top: 0.5rem; /* Pienempi marginaali pienemmillä näytöillä */
		}
	}

	@media (max-width: 480px) {
		/* Puhelimet ja pienemmät näytöt */
		p {
			margin-top: 0.25rem; /* Vielä pienempi marginaali */
		}
	}

	.rectangle-14 {
		background: #d4f3ff;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 1rem;
		width: 100%;
		max-width: 600px;
		box-sizing: border-box;
		overflow-x: hidden;
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
		margin-top: 1rem;
		flex-wrap: wrap;
		align-items: stretch;
	}

	.weather-box {
		background-color: rgba(255, 255, 255, 0.35);
		border-radius: 20px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0);
		padding: 1rem;
		flex: 1 1 250px;
		text-align: center;
		max-height: 375px;
		overflow: hidden;
	}

	.weather-box img {
		width: 100%;
		max-width: 120px; /* Voit säätää tätä isommaksi tai pienemmäksi */
		height: auto;
		margin-top: 0rem;
		object-fit: contain;
		overflow: hidden;
	}
	.weather-detail {
		padding-top: 4rem;
	}
</style>
