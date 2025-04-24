<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import UserInput from '$lib/components/UserInput.svelte';
	import { onMount } from 'svelte';

	let selectedCity: string = $state(''); // THe city name to be searched for
	let returndedCity: string = $state(''); // The name of the city returned from the API search
	let weather = $state({
		temperature: 0
	});

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
				weather.temperature = data.current.apparent_temperature;
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
</script>

<h2>Hae säätiedot</h2>
<p>Syötä kaupunki hakukenttään ja paina nappia</p>
<UserInput type="text" placeholder="Hae kaupunki" bind:value={selectedCity} disabled={false} />
<Button
	onclick={() => {
		console.log('Nappia painettu');
		haeSaa();
	}}
	text="Hae"
	disabled={false}
/>
<h2>{returndedCity}</h2>
<p>{weather.temperature} °C</p>
