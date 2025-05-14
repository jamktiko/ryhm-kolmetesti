<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Tween } from 'svelte/motion';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	//import FOG from 'vanta/dist/vanta.fog.min.js';
	import CLOUDS from 'vanta/dist/vanta.clouds.min.js';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	// Alustaa taivas muuttujan johon taivas/sumu efecti asetetaan
	let taivas: any = $state();

	// Muuntaa hex värit rgb väreiksi
	function hexToRgb(hex: number): { r: number; g: number; b: number } {
		const r = (hex >> 16) & 0xff;
		const g = (hex >> 8) & 0xff;
		const b = hex & 0xff;
		return { r, g, b };
	}

	// Muuntaa rgb värit hex väriksi
	function rgbToHex(r: number, g: number, b: number): number {
		return (r << 16) | (g << 8) | b;
	}

	// Antaa satunnaisen hex värin
	function satunnaisVari() {
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return rgbToHex(r, g, b);
	}
	// Asettaa transitioneille keston millisekunneissa
	const kesto = 1000;

	// Taivasefektin liikkuminnopeuksen alkuarvo
	const startSpeed = 0.6;

	// Asettaa tweenatun nopeuden taivaalle
	let nopeusTween = new Tween(startSpeed, {
		duration: kesto
	});

	// Taivaan aloitusvärit rgb-arvoina. sky, cloud, shadow, sun
	const startColors = [
		{ r: 104, g: 126, b: 140 },
		{ r: 95, g: 95, b: 95 },
		{ r: 210, g: 210, b: 210 },
		{ r: 210, g: 210, b: 210 },
		{ r: 123, g: 211, b: 211 },
		{ r: 76, g: 231, b: 123 }
	];

	// sky värin rgb transitiot
	let skyrTween = new Tween(startColors[0].r, {
		duration: kesto
	});
	let skygTween = new Tween(startColors[0].g, {
		duration: kesto
	});
	let skybTween = new Tween(startColors[0].b, {
		duration: kesto
	});

	// cloud värin rgb transitiot
	let cloudrTween = new Tween(startColors[1].r, {
		duration: kesto
	});
	let cloudgTween = new Tween(startColors[1].g, {
		duration: kesto
	});
	let cloudbTween = new Tween(startColors[1].b, {
		duration: kesto
	});

	// shadow värin rgb transitiot
	let shadowrTween = new Tween(startColors[2].r, {
		duration: kesto
	});
	let shadowgTween = new Tween(startColors[2].g, {
		duration: kesto
	});
	let shadowbTween = new Tween(startColors[2].b, {
		duration: kesto
	});

	// sun värin rgb transitiot
	let sunrTween = new Tween(startColors[3].r, {
		duration: kesto
	});
	let sungTween = new Tween(startColors[3].g, {
		duration: kesto
	});
	let sunbTween = new Tween(startColors[3].b, {
		duration: kesto
	});

	// glare värin rgb transitiot
	let sunGlarerTween = new Tween(startColors[3].r, {
		duration: kesto
	});
	let sunGlaregTween = new Tween(startColors[3].g, {
		duration: kesto
	});
	let sunGlarebTween = new Tween(startColors[3].b, {
		duration: kesto
	});

	// sunlight värin rgb transitiot
	let sunLightrTween = new Tween(startColors[3].r, {
		duration: kesto
	});
	let sunLightgTween = new Tween(startColors[3].g, {
		duration: kesto
	});
	let sunLightbTween = new Tween(startColors[3].b, {
		duration: kesto
	});

	// Muuttaa taivaan värit transitioden avulla
	const rgbTrans = (
		sky: { r: number; g: number; b: number },
		cloud: { r: number; g: number; b: number },
		shadow: { r: number; g: number; b: number },
		sun: { r: number; g: number; b: number },
		glare: { r: number; g: number; b: number },
		light: { r: number; g: number; b: number }
	) => {
		skyrTween.target = sky.r;
		skygTween.target = sky.g;
		skybTween.target = sky.b;

		cloudrTween.target = cloud.r;
		cloudgTween.target = cloud.g;
		cloudbTween.target = cloud.b;

		shadowrTween.target = shadow.r;
		shadowgTween.target = shadow.g;
		shadowbTween.target = shadow.b;

		sunrTween.target = sun.r;
		sungTween.target = sun.g;
		sunbTween.target = sun.b;

		sunGlarerTween.target = glare.r;
		sunGlaregTween.target = glare.g;
		sunGlarebTween.target = glare.b;

		sunLightrTween.target = light.r;
		sunLightgTween.target = light.g;
		sunLightbTween.target = light.b;
	};

	// Muuttaa taivaan liikkumisnopeuden transitioilla
	const setNopeus = (nopeus: number) => {
		nopeusTween.target = nopeus;
	};

	let background: boolean = $state(true);

	// Asettaa taivas efektin taivas -muuttujaan
	// alla toggle taivaalle
		$effect(() => {
			const el = document.getElementById('background');
			if (background) {
				requestAnimationFrame(() => {
					if (el && !taivas) {
						initbackground();
						el.style.background = '';
					}
				});
			} else {
				if (taivas) {
					taivas.destroy();
					taivas = null;
				}
					if (el) {
						el.style.background = "url('/tausta.jpg')"; // vaihtaa taustan valkoiseksi nappia painaessa
					}	
				}
		});

		onMount(() => {
		if (background) {
			initbackground();
		}
	});

		function initbackground() {
		taivas = CLOUDS({
			el: '#background',
			THREE: THREE,
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			skyColor: 0xd2e2e8,
			cloudColor: 0xa4aebe,
			cloudShadowColor: 0xc7c8ca,
			sunColor: 0xf7952a,
			sunGlareColor: 0xd75d35,
			sunlightColor: 0xf58618
		});
	};

	// Päivittää taivasefektin värejä
	$effect(() => {
		if (!taivas) return;

		taivas.setOptions({
			skyColor: rgbToHex(skyrTween.current, skygTween.current, skybTween.current),
			cloudColor: rgbToHex(cloudrTween.current, cloudgTween.current, cloudbTween.current),
			cloudShadowColor: rgbToHex(shadowrTween.current, shadowgTween.current, shadowbTween.current),
			sunColor: rgbToHex(sunrTween.current, sungTween.current, sunbTween.current),
			sunGlareColor: rgbToHex(
				sunGlarerTween.current,
				sunGlaregTween.current,
				sunGlarebTween.current
			),
			sunlightColor: rgbToHex(
				sunLightrTween.current,
				sunLightgTween.current,
				sunLightbTween.current
			),
			speed: nopeusTween.current.toFixed(1)
		});
		// console.log('Taivas setoption effect');
	});
	$effect(() => {
		nopeusTween.target = Number(weatherGlobal.selectedWeather.WindSpeedMS) / 4;
		// console.log('Nopeus effect');
	});
	$effect(() => {
		skyColors(
			weatherGlobal.currentWeatherEffect.SkyColor,
			weatherGlobal.currentWeatherEffect.CloudColor,
			weatherGlobal.currentWeatherEffect.ShadowColor,
			weatherGlobal.currentWeatherEffect.SunColor,
			weatherGlobal.currentWeatherEffect.GlareColor,
			weatherGlobal.currentWeatherEffect.LightColor
		);
		// console.log('skycolor effect');
	});

	// Tällä asetetaan taivaalle värit hex koodeilla ja se muuntaa ne rgb:ksi
	function skyColors(
		sky: number,
		cloud: number,
		shadow: number,
		sun: number,
		glare: number,
		light: number
	) {
		const skycol = hexToRgb(sky);
		const cloudcol = hexToRgb(cloud);
		const shadowcol = hexToRgb(shadow);
		const suncol = hexToRgb(sun);
		const glarecol = hexToRgb(glare);
		const lightcol = hexToRgb(light);
		rgbTrans(skycol, cloudcol, shadowcol, suncol, glarecol, lightcol);
	}
	let showInfo: boolean = $state(false);
</script>

<svelte:head>
	<!-- Google fonst material symbols iconit-->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0"
	/>
</svelte:head>

	<button class ="toggle-button" onclick={() => (background = !background)}>
		{background ? 'Taivas off' : 'Taivas on'}</button>

<!--Asettaa taustalle taivaan-->
<div
	id="background"
	style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
	></div>
<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	.toggle-button {
	position: absolute;
	top: 8%;
	
	right: 2%;
	z-index: 10;
	padding: 0.6em;
	background: var(--main-color);
	border: solid 2px var(--sec-color);
	border-radius: 20px;
	font-size: 1rem;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	justify-content: center;
	gap: 0.5rem;
	cursor: pointer;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	margin: 1%;
	}

	


	:global(html, body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	:global(body) {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
	}
	:global(.yo) {
		color: var(--night-color);
	}
	:root {
		--main-text: #222222;
		--sec-text: #f2f2f2;
		--lammin-color: var(--main-text);
		--pakkas-color: rgb(3, 63, 153);
		--main-color: #d1e9fd75;
		--sec-color: #e7f4ff70;
		--third-color: #777777;
		--text-decoration-color: black;
		--active-color: var(--sec-color);
		--night-color: #dddddd;
	}
	main {
		padding: 0.5em;
		max-width: 960px;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Inter', sans-serif;
	}
	@media (max-width: 600px) {
		.main {
			padding: 0em;
			max-width: 100%;
		}
	}
	@media (max-width: 1500px) {
	.toggle-button {
		top: 8%;
		right: 3%;

	}
}
@media (max-width: 1100px) {
	.toggle-button {
		top: 8%;
		right: 4%;

	}
}

@media (max-width: 850px) {
	.toggle-button {
		top: 8%;
		right: 5%;

	}
}
@media (max-width: 768px) {
	.toggle-button {
		top: 2%;
		right: 6%;

	}
}
</style>
