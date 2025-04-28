<script lang="ts">
	import WeatherDayList from '$lib/components/weatherDayList.svelte';
	import WeatherMain from '$lib/components/WeatherMain.svelte';
	import Button from '$lib/components/Button.svelte';
	import UserInput from '$lib/components/UserInput.svelte';
	import { onMount } from 'svelte';
	import type { IpGeo } from '$lib/types/ip';
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
	let returnedCity: string = $state('');
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
		returnedCity = kaupunki.name;
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${kaupunki.latitude}&longitude=${kaupunki.longitude}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,precipitation_probability_max,temperature_2m_mean,cloud_cover_mean&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m,cloud_cover,wind_direction_10m,uv_index,is_day,sunshine_duration&current=temperature_2m,rain,precipitation,showers,snowfall,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,cloud_cover&temporal_resolution=hourly_3`
		).then((vastaus) => {
			vastaus.json().then((data) => {
				weather = data;
			});
		});
	}

	// Hakee kaupungin nimen IP-osoitteen perusteella
	onMount(async () => {
		const kaupunki: IpGeo = await fetch('https://ipapi.co/json/').then((vastaus) => {
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
<WeatherMain {weather} {returnedCity} />

<WeatherDayList />

<style>
	p {
		color: black;
		background: none;
	}
</style>
