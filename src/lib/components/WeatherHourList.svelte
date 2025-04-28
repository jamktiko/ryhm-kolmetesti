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

<button
	onclick={() => {
		//weatherHours = weatherGlobal.weatherHours(day);
		console.log(weatherHours);
	}}>Log</button
>

<style>
</style>
