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
	<div>
		<h3>Juuri nyt</h3>
		{#if weatherGlobal.weather}
			<h2><strong>{weatherGlobal.weather.current.temperature_2m} °C</strong></h2>
			<p>Tuntuu kuin {weatherGlobal.weather.current.apparent_temperature} °C</p>
			<p>Suhteellinen kosteus {weatherGlobal.weather.current.relative_humidity_2m} %</p>
			<p>Tuulen nopeus {weatherGlobal.weather.current.wind_speed_10m} m/s</p>
			<p>Tuulen suunta {weatherGlobal.weather.current.wind_direction_10m} °</p>
			<p>Pilvisyys {weatherGlobal.weather.current.cloud_cover} %</p>
			<p>Nyt on {weatherGlobal.weather.current.is_day ? 'Päivä' : 'Yö'}</p>
			<p>Sade {weatherGlobal.weather.current.rain} mm</p>
		{:else}
			<p>Ei säätietoja</p>
		{/if}
	</div>
	<div2>
		<h3>3 tunnin välein</h3>
	</div2>
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
		color: var(--text-decoration-color);
		background-color: var(--sec-color);
	}
</style>
