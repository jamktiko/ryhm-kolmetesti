<script lang="ts">
	import { onMount } from 'svelte';
	import type { Weather } from '$lib/types/weather';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherHour from '$lib/components/WeatherHour.svelte';
	let weatherDayList = $derived(weatherGlobal.weatherDayList);
	import WeatherDay from './weatherDay.svelte';
</script>

<!-- ui juttuja -->
<div class="rectangle-15">
	<div class="button-container">
		{#each weatherDayList as day, index}
			<WeatherDay weather={day} />
		{/each}
	</div>
</div>

<style>
	.button-container {
		padding: 0.5rem;
		height: 100%;
		display: flex;
		flex-wrap: wrap; /* mahdollistaa painikkeiden siirtymisen seuraavalle riville */
		justify-content: flex-start;
		align-items: stretch;
		box-sizing: border-box;
	}

	.rectangle-15 {
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		width: 100%;

		overflow-x: hidden;
		background: var(--main-color);
	}

	/* Responsiivisuus: keskitetään rectangle-15 alle 768px näytöillä */
	@media (max-width: 768px) {
		.rectangle-15 {
			margin: 0 auto; /* keskittää vaakasuunnassa */
		}
		.button-container {
			flex-direction: row;
			flex-wrap: nowrap;
		}
	}
	@media (min-width: 769px) {
		.rectangle-15 {
			max-width: 300px;
		}
	}
</style>
