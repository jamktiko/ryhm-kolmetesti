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
	interface Props {
		weather: Weather | null;
		returnedCity: string;
	}
	let { weather, returnedCity }: Props = $props();
</script>

<div>
	<h2>{returnedCity}</h2>
	{#if weather}
		<p>Lämpötila {weather.current.temperature_2m} °C</p>
		<p>Tuntuu kuin {weather.current.apparent_temperature} °C</p>
		<p>Suhteellinen kosteus {weather.current.relative_humidity_2m} %</p>
		<p>Tuulen nopeus {weather.current.wind_speed_10m} m/s</p>
		<p>Tuulen suunta {weather.current.wind_direction_10m} °</p>
		<p>Pilvisyys {weather.current.cloud_cover} %</p>
		<p>Nyt on {weather.current.is_day ? 'Päivä' : 'Yö'}</p>
		<p>Sade {weather.current.rain} mm</p>
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
