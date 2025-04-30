<script lang="ts">
	import { onMount } from 'svelte';
	import type { Weather } from '$lib/types/weather';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<!-- ui juttuja -->
<!-- ui juttuja -->
<div class="rectangle-15">
	<div class="rivi">
		<div>
			<h2>Muiden päivien säätiedot</h2>
		</div>
		<div>
			<h3>Valitse päivä</h3>
		</div>
	</div>

	<div>
		{#if weatherGlobal.saatietoTaulukko.length > 0}
			<div class="button-container">
				{#each weatherGlobal.saatietoTaulukko as day, index}
					<button onclick={() => (weatherGlobal.selectedDay = index + 1)}>
						<span>
							{`${weatherGlobal.saatietoTaulukko[index][0].Time.slice(8, 10)}.${weatherGlobal.saatietoTaulukko[index][0].Time.slice(5, 7)}.`}
						</span>
						<span>
							{(() => {
								let temp: number;
								for (const hour of day) {
									if (hour.Time.slice(11, 13) === '15') {
										temp = hour.Temperature;
										return temp;
									}
								}
							})()} °C
						</span>
						<span>
							<img
								src={`WeatherSymbol3/${(() => {
									let icon: string;
									for (const hour of day) {
										if (hour.Time.slice(11, 13) === '15') {
											// console.log(hour.Time); // For checking if it return the right times value
											icon = hour.WeatherSymbol3;
											return icon;
										}
									}
								})()}.svg`}
							/>
						</span>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
button {
	width: 200px;
	height: 48px;
	padding: 12px 20px;
	background-color: white;
	border: none;
	border-radius: 8px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

button:hover {
	background-color: #4caf50;
	color: white;
}

.button-container {
	display: flex;
	flex-wrap: wrap;       /* mahdollistaa painikkeiden siirtymisen seuraavalle riville */
	gap: 0.5rem;           /* väli painikkeiden väliin */
	justify-content: center;
	margin-top: 1rem;
}

.weather-info {
	margin-top: 20px;
	font-size: 18px;
}

.rectangle-15 {
	background: #d4f3ff;
	box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
	border-radius: 20px;
	padding: 1rem;
	margin: 1rem 0;
	width: 300px;
}
</style>