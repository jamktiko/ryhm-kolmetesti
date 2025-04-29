<script lang="ts">
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
	let weatherHours: Hour[] = $derived(weatherGlobal.weatherHours(weatherGlobal.selectedDay));
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
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: 1px solid black;
		display: inline-block;
	}
</style>
