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

<div>
	<h2>{returnedCity}</h2>
<<<<<<< HEAD
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
=======
	<div>
		<h3>Juuri nyt</h3>
		{#if weatherGlobal.weather}
			<p>Temperature {weatherGlobal.weather.current.temperature_2m} °C</p>
			<p>Apparent temperature {weatherGlobal.weather.current.apparent_temperature} °C</p>
			<p>Relative humidity {weatherGlobal.weather.current.relative_humidity_2m} %</p>
			<p>Wind speed {weatherGlobal.weather.current.wind_speed_10m} m/s</p>
			<p>Wind Direction {weatherGlobal.weather.current.wind_direction_10m} °</p>
			<p>Cloud cover {weatherGlobal.weather.current.cloud_cover} %</p>
			<p>Now is {weatherGlobal.weather.current.is_day ? 'Day' : 'Night'}</p>
			<p>Rain {weatherGlobal.weather.current.rain} mm</p>
		{:else}
			<p>Ei säätietoja</p>
		{/if}
	</div>
	<div>
		<h3>3 tunnin välein</h3>
	</div>
	<WeatherHourList />
>>>>>>> origin/develop
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
		color: var(--text-decoration-color);
		background-color: var(--sec-color);
	}
</style>
