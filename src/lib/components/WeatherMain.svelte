<script lang="ts">
	import WeatherHourList from '$lib/components/WeatherHourList.svelte';
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from './WeatherHour.svelte';
	import weatherDayList from './weatherDayList.svelte';
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
/>
<div class="rectangle-14">
	<div class="rivi">
		<div><h2>{weatherGlobal.selectedCity}</h2></div>
		<div><h3>Juuri nyt</h3></div>
	</div>
	<div>
		<div>
			{#if weatherGlobal.saatietoTaulukko.length !== 0}
				<h2>
					<strong
						>{weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
							weatherGlobal.selectedHour - 1
						].Temperature} °C</strong
					>
				</h2>
				<p>
					Ilmankosteus {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].Humidity}%
				</p>
				<p>
					Tuulen nopeus {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].WindSpeedMS} m/s
				</p>
				<p>
					Tuulen suunta {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].WindDirection} °
				</p>
				<p>
					Pilvisyys {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].TotalCloudCover} %
				</p>
				<p>
					Sateen todennäköisyys {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].Precipitation1h} %
				</p>
				<p>
					Sateen määrä {weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][
						weatherGlobal.selectedHour - 1
					].Precipitation1h} mm
				</p>
				<img
					alt="Sääkuvake"
					src={`/WeatherSymbol3/${weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1][weatherGlobal.selectedHour - 1].WeatherSymbol3}.svg`}
				/>
			{:else}
				<p>Ei säätietoja</p>
			{/if}
		</div>
	</div>
	<div2>
		<h3>3 tunnin välein</h3>
	</div2>
	<WeatherHourList />
</div>

<style>
	.rivi {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	:global(:root) {
		font-family: 'Inter', sans-serif;
	}
	h3 {
		color: var(--third-color);
	}

	div {
		position: relative;
		/*background-color: black;*/
	}
	h2 {
		color: var(--text-decoration-color);
		font-size: xx-large;
	}
	p {
		color: var(--text-decoration-color);
	}
	.rectangle-14 {
		background: #d4f3ff;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		padding: 1rem;
		margin: 1rem 0;
	}
</style>
