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

<div>
	<h2>{returnedCity}</h2>
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
	<WeatherHourList />
</div>

<style>
	div {
		/*background-color: black;*/
	}
	h2 {
		color: var(--text-decoration-color);
	}
	p {
		color: var(--text-decoration-color);
		background-color: var(--sec-color);
	}
</style>
