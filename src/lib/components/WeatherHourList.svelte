<script lang="ts">
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';

	let weatherHours: Weather[] = $derived(weatherGlobal.saatietoTaulukko);
</script>

<div class="weather-hours">
	{#each weatherHours as weatherHour, index}
		{#if weatherHour.Date.getDate() === weatherGlobal.selectedDay}
			<WeatherHour {weatherHour} />
		{/if}
	{:else}
		<p>Ei sää tietoja</p>
	{/each}
</div>

<style>
	.weather-hours {
		width: 100%;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	/* Responsiivisuus pienille näytöille */
	@media (max-width: 879px) {
		.weather-hours {
			position: relative;
			flex-wrap: wrap;
			justify-content: center;
			/*padding: 10px 0;  Voit lisätä takaisin jos tärkeä*/
		}
		.weather-hour {
			/*flex: 0 0 25%; Poistaa flexaukset*/
			width: 25%;
		}
	}

	@media (max-width: 480px) {
	}
</style>
