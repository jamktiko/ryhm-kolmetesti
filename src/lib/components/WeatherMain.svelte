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
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0&icon_names=cloud"
/>
<link
	rel="stylesheet"
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=air"
/>

<div>
	<h2>{returnedCity}</h2>
	{#if weatherGlobal.weather}
		<p><strong>{weatherGlobal.weather.current.temperature_2m} °C</strong></p>
		<p>Tuntuu kuin {weatherGlobal.weather.current.apparent_temperature} °C</p>
		<p>
			Tuulen nopeus {weatherGlobal.weather.current.wind_speed_10m} m/s<span
				class="material-symbols-outlined">air</span
			>
		</p>
		<p>
			Pilvisyys {weatherGlobal.weather.current.cloud_cover} %<span class="material-symbols-outlined"
				>cloud</span
			>
		</p>
		<p>Sade {weatherGlobal.weather.current.rain} mm</p>
	{:else}
		<p>Ei säätietoja</p>
	{/if}
</div>

<style>
	:global(:root) {
		font-family: 'Inter', sans-serif;
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
