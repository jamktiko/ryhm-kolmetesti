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
					<img alt="Sääkuvake" src={`/WeatherSymbol3/${weather.WeatherSymbol3}.svg`} />
				</div>
			</div>

			<!-- Oikea laatikko: lisätiedot -->
			<div class="weather-box2">
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
						Sateen todennäköisyys {weather.PoP} %
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
	.weather-inline {
		display: flex;
		flex-direction: column; /* Allekkain */
		align-items: flex-start; /* Vasemmalle */
		padding-left: 1rem; /* Hieman keskustaa kohti */
		gap: 0.1rem;
	}

	.weather-inline img {
		width: 40px;
		height: 40px;
		object-fit: contain;
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
		.rectangle-14 {
			margin: 0 auto;
		}
	}

	@media (max-width: 480px) {
		/* Puhelimet ja pienemmät näytöt */
		p {
			margin-top: 0.25rem; /* Vielä pienempi marginaali */
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
		flex: 2 1 350px; /* Kasvatan vasemman laatikon kokoa */
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

	.weather-box img {
		width: 100%;
		max-width: 100px; /* Voit säätää tätä isommaksi tai pienemmäksi */
		height: auto;
		margin-top: 0rem;
		object-fit: contain;
		overflow: hidden;
	}
	.weather-detail {
		padding-top: 4rem; /* Tekstit vasemmalle */
	}
</style>
