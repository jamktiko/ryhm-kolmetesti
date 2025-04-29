<script lang="ts">
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';

	interface Props {
		weatherHour: Weather;
	}
	let { weatherHour }: Props = $props();
	let timeAndDate: string = weatherHour.Time;

	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<div>
	<h4>
		{timeAndDate}
	</h4>
	<p>Temperature {weatherHour.Temperature} °C</p>
	<p>Relative humidity {weatherHour.Humidity} %</p>
	<p>Wind speed {weatherHour.WindSpeedMS} m/s</p>
	<p>Wind Direction {weatherHour.WindDirection} °</p>
	<p>Cloud cover {weatherHour.TotalCloudCover} %</p>
	<p>Precipitation {weatherHour.PoP} mm</p>
	<p>Precipitation probability {weatherHour.Precipitation1h} %</p>
	<img alt="Sääkuvake" src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}`} />
</div>

<style>
	div {
		border: 2px solid #007bff;
		border-radius: 8px;
		padding: 16px;
		background-color: #f0f8ff;
		color: #333;
	}
</style>
