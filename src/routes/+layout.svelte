<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';

	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();

	onMount(() => {
		// Ladataan Vanta.js dynaamisesti
		Promise.all([
			import('three'),
			import('vanta/dist/vanta.clouds.min')
		]).then(([THREE, VANTA]) => {
			VANTA.default({
				el: '#background',
				THREE: THREE,
				mouseControls: true,
				touchControls: true,
				minHeight: 200.00,
				minWidth: 200.00,
				skyColor: 0xd4f3ff,
				cloudColor: 0xffffff,
				cloudShadowColor: 0xaaaaaa,
				cloudOpacity: 0.3
			});
		});
	});
</script>

<div id="background" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>

<Header />
<main>
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
