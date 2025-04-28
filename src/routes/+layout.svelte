<script lang="ts">
	import type { Snippet } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	interface Props {
		children: Snippet;
	}
	let { children }: Props = $props();
</script>

<Header />
<main>
	{@render children()}
</main>
<Footer />

<style>
	:root {
		--main-color: #d4f3ff;
		--sec-color: #ecf0f1;
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
