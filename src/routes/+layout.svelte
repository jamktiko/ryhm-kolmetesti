<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { Tween } from 'svelte/motion';
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import FOG from 'vanta/dist/vanta.fog.min.js';

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

	// Taivaan aloitusvärit rgb-arvoina. High, Mid, Low, Base
	const startColors = [
		{ r: 104, g: 126, b: 140 },
		{ r: 95, g: 95, b: 95 },
		{ r: 210, g: 210, b: 210 },
		{ r: 210, g: 210, b: 210 }
	];

	// High värin rgb transitiot
	let highrTween = new Tween(startColors[0].r, {
		duration: kesto
	});
	let highgTween = new Tween(startColors[0].g, {
		duration: kesto
	});
	let highbTween = new Tween(startColors[0].b, {
		duration: kesto
	});

	// Mid värin rgb transitiot
	let midrTween = new Tween(startColors[1].r, {
		duration: kesto
	});
	let midgTween = new Tween(startColors[1].g, {
		duration: kesto
	});
	let midbTween = new Tween(startColors[1].b, {
		duration: kesto
	});

	// Low värin rgb transitiot
	let lowrTween = new Tween(startColors[2].r, {
		duration: kesto
	});
	let lowgTween = new Tween(startColors[2].g, {
		duration: kesto
	});
	let lowbTween = new Tween(startColors[2].b, {
		duration: kesto
	});

	// Base värin rgb transitiot
	let baserTween = new Tween(startColors[3].r, {
		duration: kesto
	});
	let basegTween = new Tween(startColors[3].g, {
		duration: kesto
	});
	let basebTween = new Tween(startColors[3].b, {
		duration: kesto
	});

	// Muuttaa taivaan värit transitioden avulla
	const rgbTrans = (
		high: { r: number; g: number; b: number },
		mid: { r: number; g: number; b: number },
		low: { r: number; g: number; b: number },
		base: { r: number; g: number; b: number }
	) => {
		highrTween.target = high.r;
		highgTween.target = high.g;
		highbTween.target = high.b;

		midrTween.target = mid.r;
		midgTween.target = mid.g;
		midbTween.target = mid.b;

		lowrTween.target = low.r;
		lowgTween.target = low.g;
		lowbTween.target = low.b;

		baserTween.target = base.r;
		basegTween.target = base.g;
		basebTween.target = base.b;
	};

	// Muuttaa taivaan liikkumisnopeuden transitioilla
	const setNopeus = (nopeus: number) => {
		nopeusTween.target = nopeus;
	};

	// Asettaa taivas efektin taivas -muuttujaan
	onMount(() => {
		taivas = FOG({
			el: '#background',
			THREE: THREE,
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			highlightColor: rgbToHex(highrTween.current, highgTween.current, highbTween.current),
			midtoneColor: rgbToHex(midrTween.current, midgTween.current, midbTween.current),
			lowlightColor: rgbToHex(lowrTween.current, lowgTween.current, lowbTween.current),
			baseColor: rgbToHex(baserTween.current, basegTween.current, basebTween.current),
			blurFactor: 0.61,
			speed: 0.5,
			zoom: 1.2
		});

		// Päivittää taivasefektin värejä
		$effect(() => {
			taivas.setOptions({
				highlightColor: rgbToHex(highrTween.current, highgTween.current, highbTween.current),
				midtoneColor: rgbToHex(midrTween.current, midgTween.current, midbTween.current),
				lowlightColor: rgbToHex(lowrTween.current, lowgTween.current, lowbTween.current),
				baseColor: rgbToHex(baserTween.current, basegTween.current, basebTween.current),
				speed: nopeusTween.current
			});
		});
	});

	// Tällä asetetaan taivaalle värit hex koodeilla ja se muuntaa ne rgb:ksi
	function skyColors(high: number, mid: number, low: number, base: number) {
		const highcol = hexToRgb(high);
		const midcol = hexToRgb(mid);
		const lowcol = hexToRgb(low);
		const basecol = hexToRgb(base);
		rgbTrans(highcol, midcol, lowcol, basecol);
	}
</script>

<!--Asettaa taustalle taivaan-->
<div
	id="background"
	style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"
></div>

<Header />
<main>
	<!-- Testi nappi taivaan värin ja nopeuden arpomiseen-->
	<button
		onclick={() => {
			skyColors(satunnaisVari(), satunnaisVari(), satunnaisVari(), satunnaisVari());
			setNopeus(Math.random() * 5);
		}}>Arvo nopeus ja värit</button
	>

	<p>
		Highlight #{rgbToHex(highrTween.current, highgTween.current, highbTween.current).toString(16)}
	</p>
	<p>
		Midtone #{rgbToHex(midrTween.current, midgTween.current, midbTween.current).toString(16)}
	</p>
	<p>
		Lowligh #{rgbToHex(lowrTween.current, lowgTween.current, lowbTween.current).toString(16)}
	</p>
	<p>
		Basecolor #{rgbToHex(baserTween.current, basegTween.current, basebTween.current).toString(16)}
	</p>

	{@render children()}
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
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 6em auto 0 auto;
	}
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Inter', sans-serif;
	}
</style>
