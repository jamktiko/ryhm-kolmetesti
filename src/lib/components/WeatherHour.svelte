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

	interface Props {
		weatherHour: Hour;
	}
	let { weatherHour }: Props = $props();
	let timeAndDate: string = `${weatherHour.time.slice(8, 10)}.${weatherHour.time.slice(5, 7)}.${weatherHour.time.slice(0, 4)} klo. ${weatherHour.time.slice(11, 13)}:${weatherHour.time.slice(14, 16)}`;

	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<div>
	<h4>
		{timeAndDate}
	</h4>
	<p>Temperature {weatherHour.temperature_2m} °C</p>
	<p>Relative humidity {weatherHour.relative_humidity_2m} %</p>
	<p>Wind speed {weatherHour.wind_speed_10m} m/s</p>
	<p>Wind Direction {weatherHour.wind_direction_10m} °</p>
	<p>Cloud cover {weatherHour.cloud_cover} %</p>
	<p>Now is {weatherHour.is_day ? 'Day' : 'Night'}</p>
	<p>Precipitation {weatherHour.precipitation} mm</p>
	<p>Precipitation probability {weatherHour.precipitation_probability} %</p>
	<p>UV index {weatherHour.uv_index}</p>
	<p>Sunshine duration {weatherHour.sunshine_duration} s</p>
	<p>Wind direction {weatherHour.wind_direction_10m} °</p>
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
