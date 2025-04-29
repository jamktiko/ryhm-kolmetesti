<script lang="ts">
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';

	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	let weatherHours: Weather[] = $derived(weatherGlobal.saatietoTaulukko[weatherGlobal.selectedDay]);
</script>

{#each weatherHours as weatherHour}
	<div class="weather-hour">
		<p>{`${new Date(weatherHour.Time).getHours()}.00`}</p>
		<p>Rain {weatherHour.PoP} %</p>
		<p><strong>{weatherHour.Temperature} °C</strong></p>
	</div>
{:else}
	<p>Ei sää tietoja</p>
{/each}

<style>
	.weather-hour {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border: 1px solid black;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: var(--main-color);
		border-radius: 15px;
		padding: 5px;
		margin: 3px;
		box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	}
</style>
