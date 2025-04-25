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
	<p>Lämpötila {weather.current.temperature_2m} °C</p>
	<p>Tuntuu kuin {weather.current.apparent_temperature} °C</p>
	<p>Suhteellinen ilmankosteus {weather.current.relative_humidity_2m} %</p>
	<p>Tuulennopeus {weather.current.wind_speed_10m} m/s</p>
	<p>Tuulensuunta {weather.current.wind_direction_10m} °</p>
	<p>Pilvisyys {weather.current.cloud_cover} %</p>
	<p>Päivä {weather.current.is_day ? 'Day' : 'Night'}</p>
	<p>Sateen määrä {weather.current.rain} mm</p>
{:else}
	<p>Ei säätietoja</p>
{/if}

<style>
	h2 {
		color: var(--text-decoration-color);
	}
	p {
		color: var(--text-decoration-color);
		background-color: var(--sec-color);
	}
</style>
