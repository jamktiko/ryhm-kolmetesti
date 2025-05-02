<script lang="ts">
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';

	import { weatherGlobal } from '$lib/weatherGlobal.svelte';

	let weatherHours: Weather[] = $derived(weatherGlobal.saatietoTaulukko);
</script>

<div class="weather-hours">
	{#each weatherHours as weatherHour, index}
		{#if weatherHour.Date.getDate() === weatherGlobal.selectedDay}
			<button
				class:active={weatherHour.Date.getHours() === weatherGlobal.selectedHour}
				onclick={() => {
					weatherGlobal.selectedHour = weatherHour.Date.getHours();
				}}
				class="weather-hour"
			>
				<p>{`${weatherHour.Date.getHours()}.00`}</p>
				<img alt="Sääsymboli" src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}.svg`} />
				<p><strong>{weatherHour.Temperature} °C</strong></p>
			</button>
		{/if}
	{:else}
		<p>Ei sää tietoja</p>
	{/each}
</div>

<style>
	.weather-hours {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
	}
	.weather-hour {
		height: 80%;
		width: 12.5%;
		transition: 0.5s;
		border: none;
		background: none;
		color: inherit;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
	.weather-hour:hover {
	}
	.active {
		background-color: #00000022;
	}
</style>
