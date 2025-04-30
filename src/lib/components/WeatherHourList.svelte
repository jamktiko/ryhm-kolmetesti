<script lang="ts">
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';

	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	let weatherHours: Weather[] = $derived(
		weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay - 1]
	);
</script>

<div class="weather-hour">
	{#each weatherHours as weatherHour, index}
		{#if index === 0}
			<div id="first" class="weather-hours">
				<p>{`${new Date(weatherHour.Time).getHours()}.00`}</p>
				<img src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}.svg`} />
				<p><strong>{weatherHour.Temperature} °C</strong></p>
			</div>
		{:else if index === weatherHours.length - 1}
			<div id="last" class="weather-hours">
				<p>{`${new Date(weatherHour.Time).getHours()}.00`}</p>
				<img src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}.svg`} />
				<p><strong>{weatherHour.Temperature} °C</strong></p>
			</div>
		{:else}
			<div class="weather-hours">
				<p>{`${new Date(weatherHour.Time).getHours()}.00`}</p>
				<img src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}.svg`} />
				<p><strong>{weatherHour.Temperature} °C</strong></p>
			</div>
		{/if}
	{:else}
		<p>Ei sää tietoja</p>
	{/each}
</div>

<style>
	.weather-hour {
		bottom: 0px;
		position: absolute;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	.weather-hours {
		border-left: 1px solid #000000aa;
		border-right: 1px solid #000000aa;
		height: 80%;
		width: 12%;
	}
	#first {
		border-left: none;
	}
	#last {
		border-right: none;
	}
</style>
