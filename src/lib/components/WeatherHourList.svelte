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
				<p>
					<b>
						{(() => {
							if (weatherHour.Date.getHours() < 10) {
								return '0';
							}
							return '';
						})()}{weatherHour.Date.getHours()}</b
					>
					<!-- Jos kello on alle 10, lisää 0 eteen-->
				</p>
				<img alt="Sääsymboli" src={`/WeatherSymbol3/${weatherHour.WeatherSymbol3}.svg`} />
				<p>
					<b
						class:lamminta={weatherHour.Temperature >= 0}
						class:pakkasta={weatherHour.Temperature < 0}
					>
						{weatherHour.Temperature}
						°</b
					>
				</p>
				<div
					class="rain-info"
					class:sataa-25={weatherHour.PoP >= 25 && weatherHour.PoP < 70}
					class:sataa-70={weatherHour.PoP >= 70}
				>
					<p>
						<b>{weatherHour.PoP}</b> %
					</p>
				</div>
			</button>
		{/if}
	{:else}
		<p>Ei sää tietoja</p>
	{/each}
</div>

<style>
	.rain-info {
		overflow: auto;
		color: black;
	}

	.sataa-70 {
		color: blue;
	}
	.sataa-25 {
		color: darkblue;
	}
	.lamminta {
		color: red;
	}
	.pakkasta {
		color: blue;
	}
	.weather-hours {
		width: 100%;
		display: inline-flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-end;
	}

	.weather-hour {
		height: 100%;
		transition: background-color 0.3s ease;
		border: none;
		background: none;
		color: inherit;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
		flex: 1 1 12.5%;
	}
	.weather-hour:hover {
		color: white;
		background-color: var(--active-color);
	}
	.active {
		background-color: var(--active-color);
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
		.weather-hour {
			width: 50%;
		}
	}
</style>
