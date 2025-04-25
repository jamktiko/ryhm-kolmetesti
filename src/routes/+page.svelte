<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import UserInput from '$lib/components/UserInput.svelte';
	import { onMount } from 'svelte';
	import type {
		Weather,
		CurrentUnits,
		Current,
		HourlyUnits,
		Hourly,
		DailyUnits,
		Daily
	} from '$lib/types/weather';

	let selectedCity: string = $state('');
	let returndedCity: string = $state('');
	let weather: Weather | null = $state(null);

	// Hakee kaupungin koordinaatit kaupungin nimen perusteella
	async function haeKaupunki() {
		const kaupunki = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCity}&count=10&language=en&format=json`
		).then((vastaus) => {
			return vastaus.json();
		});
		return kaupunki.results[0];
	}

	// Hakee sään kaupungin koordinaattien perusteella
	async function haeSaa() {
		const kaupunki = await haeKaupunki();
		returndedCity = kaupunki.name;
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${kaupunki.latitude}&longitude=${kaupunki.longitude}&current=temperature_2m,rain,precipitation,showers,snowfall,relative_humidity_2m,apparent_temperature,is_day`
		).then((vastaus) => {
			vastaus.json().then((data) => {
				weather = data;
			});
		});
	}

	// Hakee kaupungin nimen IP-osoitteen perusteella
	onMount(async () => {
		const kaupunki = await fetch('http://ip-api.com/json/?fields=city').then((vastaus) => {
			return vastaus.json();
		});
		selectedCity = kaupunki.city;
		haeSaa();
	});

	function handlekeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			haeSaa();
		}
	}
</script>

<h2>Hae säätiedot</h2>
<p>Syötä kaupunki hakukenttään ja paina nappia</p>
<UserInput
	type="text"
	placeholder="Hae kaupunki"
	bind:value={selectedCity}
	disabled={false}
	on:keydown={handlekeydown}
/>
<Button
	onclick={() => {
		console.log('Nappia painettu');
		haeSaa();
	}}
	text="Hae"
	disabled={false}
/>
<h2>{returndedCity}</h2>
{#if weather}
	<p>{weather.current.temperature_2m} °C</p>
{:else}
	<p>Ei säätietoja</p>
{/if}
