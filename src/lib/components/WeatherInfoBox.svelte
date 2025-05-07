<script lang="ts">
	import WeatherInfo from './WeatherInfo.svelte';
	import type { Weather } from '$lib/types/weather';
	interface Props {
		weather: Weather;
	}
	interface IWeatherInfo {
		title: string;
		data: number | string;
		extraData?: number | String;
		icon: string;
		extraIcon?: string;
		unit: string;
		extraUnit?: string;
	}
	let { weather }: Props = $props();
	let weatherInfoArray: IWeatherInfo[] = $derived([
		{
			title: 'Kosteus',
			data: weather.Humidity,
			icon: 'humidity',
			unit: '%'
		},
		{
			title: 'Tuuli',
			data: weather.WindSpeedMS,
			extraData: weather.WindDirection,
			icon: 'wind',
			unit: 'm/s'
		},
		{
			title: 'Sade',
			data: weather.PoP,
			extraData: weather.Precipitation1h,
			icon: 'umbrella',
			extraIcon: 'raindrop',
			unit: '%',
			extraUnit: 'mm'
		},

		{
			title: 'Pilvisyys',
			data: weather.TotalCloudCover,
			icon: 'clouds',
			unit: '%'
		}
	]);
</script>

<div>
	{#each weatherInfoArray as weatherInfo}
		<WeatherInfo {weatherInfo} />
	{/each}
</div>

<style>
	div {
		flex: 1 1 60%;

		max-width: 58%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: stretch;
		gap: 2.5%;
		overflow: hidden;
	}
	@media (max-width: 400px) {
		div {
			gap: 3%
		}
	}

</style>
