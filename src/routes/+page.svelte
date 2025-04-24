<script lang="ts">
	import { onMount } from 'svelte';

	let globalKaupunki: string = $state('');
	let kaupunkiVastaus: string = $state('');
	let lampotila: number = $state(0);

	// Hakee kaupungin koordinaatit kaupungin nimen perusteella
	async function haeKaupunki() {
		const kaupunki = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${globalKaupunki}&count=10&language=en&format=json`
		).then((vastaus) => {
			return vastaus.json();
		});
		return kaupunki.results[0];
	}

	// Hakee sään kaupungin koordinaattien perusteella
	async function haeSaa() {
		const kaupunki = await haeKaupunki();
		kaupunkiVastaus = kaupunki.name;
		await fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${kaupunki.latitude}&longitude=${kaupunki.longitude}&current=temperature_2m,rain,precipitation,showers,snowfall,relative_humidity_2m,apparent_temperature,is_day`
		).then((vastaus) => {
			vastaus.json().then((data) => {
				lampotila = data.current.apparent_temperature;
			});
		});
	}

	// Hakee kaupungin nimen IP-osoitteen perusteella
	onMount(async () => {
		const kaupunki = await fetch('http://ip-api.com/json/?fields=city').then((vastaus) => {
			return vastaus.json();
		});
		globalKaupunki = kaupunki.city;
		haeSaa();
	});
</script>

<h1>Sää-appi</h1>
<p>Hae kaupungin sää</p>
<button onclick={() => haeSaa()}>Hae säätiedot</button>
<input type="text" bind:value={globalKaupunki} placeholder="Anna kaupungin nimi" />
<p>Maa/Kaupunki: {kaupunkiVastaus}</p>
<p>Lämpötila: {lampotila}</p>

<button
	onmouseenter={() => {
		console.log('test');
	}}>Test</button
>
<button
	onmouseenter={() => {
		console.log('test2');
	}}>Test2</button
>
