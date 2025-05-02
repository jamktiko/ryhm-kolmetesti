<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Tween } from 'svelte/motion';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	//import FOG from 'vanta/dist/vanta.fog.min.js';
	import CLOUDS from 'vanta/dist/vanta.clouds.min.js';

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

	// Asettaa taivas efektin taivas -muuttujaan
	onMount(() => {
		taivas = CLOUDS({
			el: '#background',
			THREE: THREE,
			mouseControls: true,
			touchControls: true,
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
		// FOG efekti
		// taivas = FOG({
		// 	el: '#background',
		// 	THREE: THREE,
		// 	mouseControls: false,
		// 	touchControls: false,
		// 	gyroControls: false,
		// 	minHeight: 200.0,
		// 	minWidth: 200.0,
		// 	highlightColor: rgbToHex(highrTween.current, highgTween.current, highbTween.current),
		// 	midtoneColor: rgbToHex(midrTween.current, midgTween.current, midbTween.current),
		// 	lowlightColor: rgbToHex(lowrTween.current, lowgTween.current, lowbTween.current),
		// 	baseColor: rgbToHex(baserTween.current, basegTween.current, basebTween.current),
		// 	blurFactor: 0.61,
		// 	speed: 0.5,
		// 	zoom: 1.2
		// });

		// Päivittää taivasefektin värejä
		$effect(() => {
			taivas.setOptions({
				skyColor: rgbToHex(skyrTween.current, skygTween.current, skybTween.current),
				cloudColor: rgbToHex(cloudrTween.current, cloudgTween.current, cloudbTween.current),
				cloudShadowColor: rgbToHex(
					shadowrTween.current,
					shadowgTween.current,
					shadowbTween.current
				),
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
		});
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

<!--Asettaa taustalle taivaan-->
<div
	id="background"
	style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
></div>

<Header />
<main>
	{@render children()}
	<!-- Testi nappi taivaan värin ja nopeuden arpomiseen-->
	<button
		onclick={() => {
			skyColors(
				satunnaisVari(),
				satunnaisVari(),
				satunnaisVari(),
				satunnaisVari(),
				satunnaisVari(),
				satunnaisVari()
			);
			setNopeus(Math.random() * 5);
		}}>Arvo nopeus ja värit</button
	>
	<label>
		Näytä info
		<input type="checkbox" bind:checked={showInfo} />
	</label>
	{#if showInfo}
		<p>Nopeus = {nopeusTween.current.toFixed(1)}</p>
		<input type="range" min="0" max="5" bind:value={nopeusTween.target} />
		<p>Sky RGB ({skyrTween.target}-{skygTween.target}-{skybTween.target})</p>
		<input type="range" min="0" max="255" bind:value={skyrTween.target} />
		<input type="range" min="0" max="255" bind:value={skygTween.target} />
		<input type="range" min="0" max="255" bind:value={skybTween.target} /> <br />
		#{rgbToHex(skyrTween.current, skygTween.current, skybTween.current).toString(16)}
		<p>Cloud ({cloudrTween.target}-{cloudgTween.target}-{cloudbTween.target})</p>
		<input type="range" min="0" max="255" bind:value={cloudrTween.target} />
		<input type="range" min="0" max="255" bind:value={cloudgTween.target} />
		<input type="range" min="0" max="255" bind:value={cloudbTween.target} /> <br />
		#{rgbToHex(cloudrTween.current, cloudgTween.current, cloudbTween.current).toString(16)}
		<p>Shadow RGB ({shadowrTween.target}-{shadowgTween.target}-{shadowbTween.target})</p>
		<input type="range" min="0" max="255" bind:value={shadowrTween.target} />
		<input type="range" min="0" max="255" bind:value={shadowgTween.target} />
		<input type="range" min="0" max="255" bind:value={shadowbTween.target} /> <br />
		#{rgbToHex(shadowrTween.current, shadowgTween.current, shadowbTween.current).toString(16)}
		<p>Sun RGB ({sunrTween.target}-{sungTween.target}-{sunbTween.target})</p>
		<input type="range" min="0" max="255" bind:value={sunrTween.target} />
		<input type="range" min="0" max="255" bind:value={sungTween.target} />
		<input type="range" min="0" max="255" bind:value={sunbTween.target} /> <br />
		#{rgbToHex(sunrTween.current, sungTween.current, sunbTween.current).toString(16)}
		<p>Glare RGB ({sunGlarerTween.target}-{sunGlaregTween.target}-{sunGlarebTween.target})</p>
		<input type="range" min="0" max="255" bind:value={sunGlarerTween.target} />
		<input type="range" min="0" max="255" bind:value={sunGlaregTween.target} />
		<input type="range" min="0" max="255" bind:value={sunGlarebTween.target} /> <br />
		#{rgbToHex(sunGlarerTween.current, sunGlaregTween.current, sunGlarebTween.current).toString(16)}
		<p>SunLight RGB ({sunLightrTween.target}-{sunLightgTween.target}-{sunLightbTween.target})</p>
		<input type="range" min="0" max="255" bind:value={sunLightrTween.target} />
		<input type="range" min="0" max="255" bind:value={sunLightgTween.target} />
		<input type="range" min="0" max="255" bind:value={sunLightbTween.target} /> <br />
		#{rgbToHex(sunLightrTween.current, sunLightgTween.current, sunLightbTween.current).toString(16)}
	{/if}
</main>
<Footer />

<style>
	:root {
		--main-color: #d4f3ff;
		--sec-color: #ecf0f1;
		--third-color: #777777;
		--text-decoration-color: black;
	}
	main {
		padding: 1em;
		max-width: 960px; /* Esimerkiksi 960px tai 100% */
		width: 100%;
		margin: 6em auto 0 auto;
		text-align: center;
	}

	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Inter', sans-serif;
	}
</style>
