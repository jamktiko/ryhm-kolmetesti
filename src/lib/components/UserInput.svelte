<script lang="ts">
	import { onDestroy } from 'svelte';
	import { cities } from '$lib/cities';

	//interface CitySuggestions {
	//name: string;
	//country: string;
	//latitude: number;
	//longitude: number;
	//}

	interface Props {
		type: 'text' | 'textarea' | 'date' | 'number';
		placeholder?: string;
		disabled: boolean;
		value: string;
		oninput?: () => void;
		search?: () => void;
		onkeydown?: (event: KeyboardEvent) => void;
	}

	let {
		type,
		placeholder,
		disabled,
		value = $bindable(),
		oninput,
		search,
		onkeydown
	}: Props = $props();

	let suggestions = $state<string[]>([]); // Ehdotukset taulukko
	let timeoutId: ReturnType<typeof setTimeout>;
	let selectedIndex = $state<number | null>(null);

	// funktion haku kaupungin nimelle
	function fetchSuggestions(query: string) {
		const normalizedQuery = query.toLowerCase().trim(); // Normalisoi query

		if (normalizedQuery.length < 2) {
			suggestions = [];
			return;
		}

		//try {
		//const proxy = 'https://thingproxy.freeboard.io/fetch/'; // heitti CORS errorin, joten käytetään proxyä
		//const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=fi&format=json`;
		//const res = await fetch(`${proxy}${url}`);
		//const rawData = await res.json();
		//const data = typeof rawData.contents === 'string' ? JSON.parse(rawData.contents) : rawData;

		//const results: CitySuggestions[] = Array.isArray(data?.results)
		//? data.results
		//.map((c: any): CitySuggestions => ({
		//name: c.name,
		//country: c.country,
		//latitude: c.latitude,
		//longitude: c.longitude,
		//}))
		//.filter((city: CitySuggestions) => //filtteröi kaupungit
		//city.name.toLowerCase().includes(normalizedQuery)
		//)
		//.sort((a: CitySuggestions, b: CitySuggestions) => {
		//const aName = a.name.toLowerCase();
		//const bName = b.name.toLowerCase();
		//const aStarts = aName.startsWith(normalizedQuery);
		//const bStarts = bName.startsWith(normalizedQuery);
		//if (aStarts && !bStarts) return -1;
		//if (!aStarts && bStarts) return 1;
		//return aName.localeCompare(bName);
		//})
		//: [];
		try {
			const results = cities
				.filter((city) => city.toLowerCase().startsWith(normalizedQuery))
				.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

			//const results = data.results.filter((city: CitySuggestions) => {

			suggestions = results.slice(0, 5); // Limitoi ehdotukset 5 ja lisää ne taulukkoon
			selectedIndex = results.length > 0 ? 0 : null; // Asettaa valitun indeksin ensimmäiseksi ehdotukseksi tai null jos ei ehdotuksia
		} catch (error) {
			console.error('Failed to fetch city suggestions:', error);
			suggestions = []; // Reseto9i ehdotukset jos error
		}
	}

	// Input handler etsintäpalikalle
	// kutsuu fetchSuggestions funktiota, joka hakee kaupungin nimen
	function handleInput(event: Event) {
		searchListVisible = true;
		if (oninput) {
			oninput();
		}

		fetchSuggestions(value);
	}

	function selectsuggestion(city: string) {
		value = city; // Asettaa valitun kaupungin arvoksi
		suggestions = [];
		if (search) {
			search();
		}

		const inputElement = document.querySelector('.search-input') as HTMLInputElement;
		inputElement?.focus();
	}

	function handleKeydown(event: KeyboardEvent) {
		const activeElement = document.activeElement;
		const inputElement = document.querySelector('.search-input');

		// Only act on Enter if the input is focused
		if (event.key === 'Enter' && activeElement === inputElement) {
			event.preventDefault();
			if (selectedIndex !== null && suggestions[selectedIndex]) {
				selectsuggestion(suggestions[selectedIndex]);
			} else if (search) {
				search(); // fallback: trigger search if no suggestion selected
			}
		}

		if (onkeydown) {
			onkeydown(event);
		}
	}
	let searchListVisible: boolean = $state(false);
</script>

<div class="search-container">
	<div class="search-bar">
		<div class="search-input-container">
			<input
				{type}
				{placeholder}
				bind:value
				{disabled}
				oninput={handleInput}
				onkeydown={handleKeydown}
				onblur={() => setTimeout(() => (searchListVisible = false), 500)}
				onfocus={() => (searchListVisible = true)}
				class="search-input"
			/>
			<button onclick={search} class="search-button">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
			</button>
		</div>
	</div>

	{#if searchListVisible}
		<ul class="suggestion-list">
			{#each suggestions as suggestion, index}
				<li class:selected={selectedIndex === index}>
					<button
						type="button"
						class="suggestion-button"
						onclick={() => selectsuggestion(suggestion)}
					>
						{suggestion}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search-container {
		max-width: 350px;
		width: 100%;
		margin: 0 auto;
		padding: 1rem;
		overflow: visible;
		position: relative;
		box-sizing: border-box;
	}

	.search-bar {
		margin-top: 0, 5rem;
		overflow: visible;
		position: relative;
	}

	.search-input-container {
		position: relative;
		display: flex;
		width: 100%;
		overflow: visible;
		z-index: 1000;
	}

	.search-input {
		flex-grow: 1;
		padding: 0.75rem 3rem 0.75rem 1rem;
		border: none;
		border-radius: 12px;
		font-size: 1rem;
		width: 100%;
		transition: border-color 0.3s;
		background-color: var(--main-color);
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		color: var(--main-text);
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.search-button {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: var(--main-text);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-button:hover {
		color: var(--primary-color);
	}

	.search-button svg {
		width: 1.25rem;
		height: 1.25rem;
		color: var(--main-text);
		display: block;
	}

	.suggestion-list {
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 83%;
		left: 4.5%;
		right: 0;
		border-radius: 12px 12px;
		z-index: 1000;
		max-height: 250px;
		overflow-y: auto;
		background-color: #dce8f3;
		color: var(--main-text);
		width: 91%;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	}

	.suggestion-list li {
		padding: 0.75rem;
		cursor: pointer;
	}

	.suggestion-list li:hover {
		color: #8a8b8b;
	}

	.suggestion-button {
		all: unset;
		cursor: pointer;
		width: 100%;
		display: block;
	}

	.suggestion-button.selected {
		background-color: #ddd;
	}
	@media (max-width: 405px) {
		.search-container {
			align-items: center;
		}
	}
</style>
