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

<h2>{returnedCity}</h2>
{#if weather}
	<p>Temperature {weather.current.temperature_2m} °C</p>
	<p>Apparent temperature {weather.current.apparent_temperature} °C</p>
	<p>Relative humidity{weather.current.relative_humidity_2m} %</p>
	<p>Wind speed{weather.current.wind_speed_10m} m/s</p>
	<p>Wind Direction{weather.current.wind_direction_10m} °</p>
	<p>Cloud cover{weather.current.cloud_cover} %</p>
	<p>Now is {weather.current.is_day ? 'Day' : 'Night'}</p>
	<p>Rain {weather.current.rain} mm</p>
{:else}
	<p>Ei säätietoja</p>
{/if}

<style>
	h2 {
		color: var(--main-color);
	}
	p {
		color: var(--main-color);
		background-color: var(--sec-color);
	}
</style>
