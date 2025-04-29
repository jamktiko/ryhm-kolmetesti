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
	let weatherHours: Hour[] = $derived(weatherGlobal.weatherHours(weatherGlobal.selectedDay));
</script>

{#each weatherHours as weatherHour}
	<div class="weather-hour">
		<p>{weatherHour.time.slice(weatherHour.time.length - 5, weatherHour.time.length)}</p>
		<p>Rain {weatherHour.precipitation_probability} %</p>
		<p><strong>{weatherHour.temperature_2m} °C</strong></p>
	</div>
{/each}

<style>
	.weather-hour {
		border: 1px solid black;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: var(--main-color);
		border-radius: 15px;
		padding: 5px;
		margin: 3px;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	}
</style>
