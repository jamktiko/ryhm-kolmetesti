<script lang="ts">
	import { onMount } from 'svelte';
	import type {
		Weather,
		CurrentUnits,
		Current,
		HourlyUnits,
		Hourly,
		Hour,
		DailyUnits,
		Daily
	} from '$lib/types/weather';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	let day = 1;
	let weatherHours: Hour[] = $derived(weatherGlobal.weatherHours(day));
</script>

{#each weatherHours as weatherHour}
	<div class="weather-hour">
		<p>{weatherHour.time.slice(weatherHour.time.length - 5, weatherHour.time.length)}</p>
		<p>Rain {weatherHour.precipitation_probability} %</p>
		<p>{weatherHour.temperature_2m} °C</p>
	</div>
{/each}

<style>
	.weather-hour {
		border: 1px solid black;
		display: inline-block;
	}
</style>
