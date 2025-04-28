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

<<<<<<< HEAD
<h2>{returnedCity}</h2>
{#if weather}
	<p>Lämpötila {weather.current.temperature_2m} °C</p>
	<p>Tuntuu kuin {weather.current.apparent_temperature} °C</p>
	<p>Suhteellinen ilmankosteus {weather.current.relative_humidity_2m} %</p>
	<p>Tuulennopeus {weather.current.wind_speed_10m} m/s</p>
	<p>Tuulensuunta {weather.current.wind_direction_10m} °</p>
	<p>Pilvisyys {weather.current.cloud_cover} %</p>
	<p>{weather.current.is_day ? 'Päivä' : 'Yö'}</p>
	<p>Sateen määrä {weather.current.rain} mm</p>
{:else}
	<p>Ei säätietoja</p>
{/if}
=======
<div>
	<h2>{returnedCity}</h2>
	{#if weather}
		<p>Temperature {weather.current.temperature_2m} °C</p>
		<p>Apparent temperature {weather.current.apparent_temperature} °C</p>
		<p>Relative humidity {weather.current.relative_humidity_2m} %</p>
		<p>Wind speed {weather.current.wind_speed_10m} m/s</p>
		<p>Wind Direction {weather.current.wind_direction_10m} °</p>
		<p>Cloud cover {weather.current.cloud_cover} %</p>
		<p>Now is {weather.current.is_day ? 'Day' : 'Night'}</p>
		<p>Rain {weather.current.rain} mm</p>
	{:else}
		<p>Ei säätietoja</p>
	{/if}
</div>
>>>>>>> f75faeccff4cf5ef738145a60dab3bc598691b98

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
