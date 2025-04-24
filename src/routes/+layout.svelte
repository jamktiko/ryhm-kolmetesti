<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	const appInfo = {
		name: 'CloudCast',
		version: '0.0.1',
		description: 'Sovellus, joka hakee säätiedot kaupungin nimen perusteella.'
	};
</script>

<Header {appInfo} />
<main>
	{@render children()}
</main>
<Footer {appInfo} />

<style>
	:root {
		--main-color: #2c3e50;
		--sec-color: #ecf0f1;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 6em auto 0 auto;
	}
</style>
