<script lang="ts">
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
	}
	p {
		color: var(--text-decoration-color);
		background-color: var(--sec-color);
	}
</style>
