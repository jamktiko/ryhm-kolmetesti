<script lang="ts">
	import WeatherHourList from '$lib/components/WeatherHourList.svelte';
	import type {
		Weather,
		CurrentUnits,
		Current,
		HourlyUnits,
		Hourly,
		DailyUnits,
		Daily
	} from '$lib/types/weather';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from './WeatherHour.svelte';
	interface Props {
		returnedCity: string;
	}
	let { returnedCity }: Props = $props();
</script>

<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
/>

<div class="box">
	<div class="rectangle"></div>
</div>

<div>
	<div class="weather-content">
		<h2>{returnedCity}</h2>
		<h3>Tänään, juuri nyt</h3>
		{#if weatherGlobal.weather}
			<h2><strong>{weatherGlobal.weather.current.temperature_2m} °C</strong></h2>
			<p>Tuntuu kuin {weatherGlobal.weather.current.apparent_temperature} °C</p>
			<p>
				Tuulen nopeus {weatherGlobal.weather.current.wind_speed_10m} m/s
				<span class="material-symbols-outlined">air</span>
			</p>
			<p>
				Pilvisyys {weatherGlobal.weather.current.cloud_cover} %
				<span class="material-symbols-outlined">cloud</span>
			</p>
			<p>
				Sade {weatherGlobal.weather.current.rain} mm
				<span class="material-symbols-outlined">rainy</span>
			</p>
		{:else}
			<p>Ei säätietoja</p>
		{/if}
	</div>
	<div>
		<h3>3 tunnin välein</h3>
	</div>
	<WeatherHourList />
</div>

<style>
	:global(:root) {
		font-family: 'Inter', sans-serif;
	}
	h3 {
		color: var(--third-color);
	}

	div {
		/*background-color: black;*/
	}
	h2 {
		color: var(--text-decoration-color);
		font-size: xx-large;
	}
	p {
		p {
			color: var(--text-decoration-color);
			background-color: transparent;
		}
	}
	.box {
		position: fixed;
		top: 40vh;
		left: 50%;
		transform: translateX(-50%);
		z-index: 0;
		width: 80vw;
		max-width: 250px;
		height: 50vh;
		pointer-events: none;
	}

	.rectangle {
		background-color: #d4f3ff;
		border-radius: 20px;
		box-shadow: 4px 4px 4px #00000040;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	@media (max-width: 600px) {
		.box {
			width: 90vw;
			height: 50vh;
			top: 40vh;
		}
	}
	.weather-content {
		position: relative;
		z-index: 1;
		padding: 1rem;
		color: var(--text-decoration-color);
	}
</style>
