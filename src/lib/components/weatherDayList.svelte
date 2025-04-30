<script lang="ts">
	import { onMount } from 'svelte';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	let weatherData: { date: string; maxTemp: number; minTemp: number }[] = [];
	let selectedDate = '';
	let selectedWeather: { date: string; maxTemp: number; minTemp: number } | null = null;
	let loading = false;
	let errorMessage = '';

	// hakee säätiedot
	async function fetchWeather() {
		try {
			const latitude = 52.52;
			const longitude = 13.405;

			const response = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin`
			);

			const data = await response.json();
			// tarkistaa onko dataa saatu
			weatherData = data.daily.time.map((date: string, i: number) => ({
				date,
				maxTemp: data.daily.temperature_2m_max[i],
				minTemp: data.daily.temperature_2m_min[i]
			}));

			//error viesti jos ei saada säätietoja
		} catch (error) {
			console.error('Weather fetch error:', error);
			errorMessage = 'Failed to load weather data.';
		}

		loading = false;
	}
	//päivän valinta
	// valitsee päivän ja hakee säätiedot
	function selectDay(date: string) {
		selectedDate = date;
		selectedWeather = weatherData.find((d) => d.date === date) ?? null;
	}

	onMount(fetchWeather);
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
		{#if loading}
			<p>Loading...</p>
		{/if}
		<!-- viikonpäivä nappulat -->
		{#if weatherData.length}
			<div class="button-container">
				{#each weatherData as day}
					<button on:click={() => selectDay(day.date)}>
						{new Date(day.date).toLocaleDateString('en-GB', {
							weekday: 'short',
							day: 'numeric',
							month: 'short'
						})}
					</button>
				{/each}
			</div>
		{/if}

		{#if selectedWeather}
			<div class="weather-info">
				<h2>lämpötila {selectedWeather.date}</h2>
				<p>Max Asteet: {selectedWeather.maxTemp}°C</p>
				<p>Min Asteet: {selectedWeather.minTemp}°C</p>
			</div>
		{/if}

		{#if errorMessage}
			<p style="color: red;">{errorMessage}</p>
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