<script lang="ts">
	import { onDestroy } from 'svelte';

	let city = '';
	let suggestions: string[] = [];
	let timeoutId: NodeJS.Timeout;

	// Fetch from Open-Meteo when user types
	async function fetchSuggestions(query: string) {
		if (query.length < 2) {
			suggestions = [];
			return;
		}

		try {
			const res = await fetch(
				`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
			);
			const data = await res.json();
			suggestions = data.results?.map((c: any) => `${c.name}, ${c.country}`) || [];
		} catch (error) {
			console.error('Failed to fetch city suggestions:', error);
			suggestions = [];
		}
	}

	function handleInput(event: Event) {
		const value = (event.target as HTMLInputElement).value;
		city = value;

		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			fetchSuggestions(city);
		}, 300); // 300ms debounce
	}

	function selectCity(selected: string) {
		city = selected;
		suggestions = [];
	}

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<input
	type="text"
	placeholder="Etsi kaupunki..."
	bind:value={city}
	on:input={handleInput}
/>

{#if suggestions.length > 0}
	<ul class="suggestion-list">
		{#each suggestions as suggestion}
			<li on:click={() => selectCity(suggestion)}>{suggestion}</li>
		{/each}
	</ul>
{/if}

<style>
	.suggestion-list {
		list-style: none;
		margin: 0;
		padding: 0;
		border: 1px solid #ccc;
		background: white;
		max-width: 300px;
		position: absolute;
		z-index: 10;
	}
	.suggestion-list li {
		padding: 0.5rem;
		cursor: pointer;
	}
	.suggestion-list li:hover {
		background-color: #eee;
	}
</style>