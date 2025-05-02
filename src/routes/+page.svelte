<script lang="ts">
	import WeatherDayList from '$lib/components/weatherDayList.svelte';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import WeatherMain from '$lib/components/WeatherMain.svelte';
	import Button from '$lib/components/Button.svelte';
	import UserInput from '$lib/components/UserInput.svelte';
	import { onMount } from 'svelte';
	import type { IpGeo } from '$lib/types/ip';
	import type { Weather } from '$lib/types/weather';
	import type { Parameters } from '$lib/types/parameters';

	// let selectedCity: string = $state('');
	// let returnedCity: string = $state('');

	// Hakee kaupungin koordinaatit kaupungin nimen perusteella
	// async function haeKaupunki() {
	// 	const kaupunki = await fetch(
	// 		`https://geocoding-api.open-meteo.com/v1/search?name=${selectedCity}&count=10&language=en&format=json`
	// 	).then((vastaus) => {
	// 		return vastaus.json();
	// 	});
	// 	return kaupunki.results[0];
	// }

	// Hakee sään kaupungin koordinaattien perusteella
	// async function haeSaa() {
	// 	const kaupunki = await haeKaupunki();
	// 	returnedCity = kaupunki.name;
	// 	await fetch(
	// 		`https://api.open-meteo.com/v1/forecast?latitude=${kaupunki.latitude}&longitude=${kaupunki.longitude}&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,uv_index_max,precipitation_probability_max,temperature_2m_mean,cloud_cover_mean&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m,cloud_cover,wind_direction_10m,uv_index,is_day,sunshine_duration&current=temperature_2m,rain,precipitation,showers,snowfall,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,cloud_cover&temporal_resolution=hourly_3`
	// 	).then((vastaus) => {
	// 		vastaus.json().then((data) => {
	// 			weatherGlobal.weather = data;
	// 		});
	// 	});
	// }

	let parameters: Parameters[] = [
		'Temperature',
		'Humidity',
		'WindDirection',
		'WindSpeedMS',
		'TotalCloudCover',
		'PoP',
		'ProbabilityThunderstorm',
		'WeatherSymbol3',
		'Precipitation1h'
	];
	let city = $state('Jyväskylä');
	let timeStep = 180; // Time step in minutes for how often to get weather data

	let startTime = $state('');
	let endTime = $state('');

	// Määrittää haun aloitus ja lopetus ajat iso muotoon
	async function setStartEndTime() {
		const timeNowMilli = Date.now(); // Hakee nykyisen ajan millisekunneissa
		const endTimeMilli = timeNowMilli + weatherGlobal.hakuPaivat * 24 * 60 * 60 * 1000; //Days * Hours * Minutes * Seconds * Milliseconds
		const endTimeDate = new Date(endTimeMilli); // Muuttaa ajan millisekunneista uudeksi aika objektiksi?
		const timeNowDate = new Date();
		startTime = timeNowDate.toISOString();
		endTime = endTimeDate.toISOString();
		return startTime;
	}
	async function haeSaatiedot() {
		const time = await setStartEndTime();
		// Hakee säätiedot valituilla parametreilla
		const query = `https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::edited::weather::scandinavia::point::timevaluepair&place=${city}&timestep=${timeStep}&parameters=${parameters.join(',')}&starrtime=${startTime}&endtime=${endTime}`;
		console.log(`fetching from ${query}`);
		await fetch(query)
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					throw new Error('Virhe hakiessa säätietoja');
				}
			})
			.then((text) => {
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(text, 'application/xml');
				const saatiedotXML = xmlDoc.getElementsByTagName('wml2:value');
				const saatiedotAjatXML = xmlDoc.getElementsByTagName('wml2:time');
				const cityXML = xmlDoc.getElementsByTagName('gml:name');
				weatherGlobal.selectedCity = cityXML[0].childNodes[0].nodeValue ?? '';
				const parameterName = xmlDoc.getElementsByTagName('wml2:MeasurementTimeseries');
				console.log(saatiedotXML.length);
				const tietojaPerParametri = saatiedotXML.length / parameters.length;
				// Säätiedot taulukkoihin
				let saatiedotTaulukko: string[][] = [];
				let saatiedotAjatTaulukko: string[][] = [];
				for (let i = 0; i < parameters.length; i++) {
					console.log(parameterName[i].getAttribute('gml:id')); // Logs to console the names of the data in order (temperature, precipitation1h, ...)
					let saatiedot: string[] = [];
					let saatiedotAjat: string[] = [];
					for (let j = 1; j <= tietojaPerParametri; j++) {
						// console.log(j + i * tietojaPerParametri - 1);
						saatiedot.push(
							saatiedotXML[j + i * tietojaPerParametri - 1].childNodes[0].nodeValue ?? ''
						);
						saatiedotAjat.push(
							saatiedotAjatXML[j + i * tietojaPerParametri - 1].childNodes[0].nodeValue ?? ''
						);
					}
					saatiedotTaulukko.push(saatiedot);
					saatiedotAjatTaulukko.push(saatiedotAjat);
				}
				console.log(saatiedotTaulukko);
				console.log(saatiedotAjatTaulukko);

				// Sääobjekti taulukon luonti
				const saatietoTaulukko = [];
				for (let i = 0; i < saatiedotTaulukko[0].length; i++) {
					saatietoTaulukko.push({
						Date: new Date(saatiedotAjatTaulukko[0][i]),
						Temperature: Math.round(Number(saatiedotTaulukko[0][i])),
						Humidity: saatiedotTaulukko[1][i],
						WindDirection: saatiedotTaulukko[2][i],
						WindSpeedMS: saatiedotTaulukko[3][i],
						TotalCloudCover: saatiedotTaulukko[4][i],
						PoP: saatiedotTaulukko[5][i],
						ProbabilityThunderstorm: saatiedotTaulukko[6][i],
						WeatherSymbol3: saatiedotTaulukko[7][i].slice(0, saatiedotTaulukko[7][i].length - 2),
						Precipitation1h: saatiedotTaulukko[8][i] //mm
					});
				}
				weatherGlobal.saatietoTaulukko = saatietoTaulukko;
				console.log(saatietoTaulukko);
				weatherGlobal.selectedDay = weatherGlobal.saatietoTaulukko[0].Date.getDate(); // Asettaa valituksi päiväksi ensimmäisen päivän
				weatherGlobal.selectedHour = weatherGlobal.saatietoTaulukko[0].Date.getHours(); // Asettaa valituksi tunniksi ensimmäisen saatavilla olevan tunnin
			})
			.catch((error) => {
				if (error instanceof Error) {
					console.error('Virhe:', error.message);
				} else {
					console.error('Virhe hakiessa säätietoja');
				}
			});
		console.log('All Done!');
	}
	// Hakee kaupungin nimen IP-osoitteen perusteella
	onMount(async () => {
		const kaupunki: IpGeo = await fetch('https://ipapi.co/json/').then((vastaus) => {
			return vastaus.json();
		});
		city = kaupunki.city;
		haeSaatiedot();
	});

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			haeSaatiedot();
		}
	}
</script>

<h2>Hae säätiedot</h2>
<p>Syötä kaupunki hakukenttään ja paina nappia</p>
<UserInput
	onkeydown={handleKeydown}
	type="text"
	placeholder="Etsi..."
	bind:value={city}
	disabled={false}
	search={() => {
		haeSaatiedot();
	}}
/>

<WeatherMain />

<WeatherDayList />

<style>
	p {
		color: black;
		background: none;
	}
</style>
