<script lang="ts">
	import { onDestroy } from 'svelte';
  
	interface CitySuggestions {
	  name: string;
	  country: string;
	  latitude: number;
	  longitude: number;
	}
  
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
	  onkeydown,
	}: Props = $props();
  
	const suggestions = $state<CitySuggestions[]>([]);

	let timeoutId: ReturnType<typeof setTimeout>;
	let selectedIndex: number | null = null; 
  
	// funktion haku kaupungin nimelle
	async function fetchSuggestions(query: string) {
	  if (query.length < 2) {
		suggestions.length = 0; // Resetoi ehdotukset jos query liian lyhyt
		return;
	  }
  
	  try {
		const proxy = 'https://thingproxy.freeboard.io/fetch/';
		const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
		const res = await fetch(`${proxy}${url}`);
		const rawData = await res.json();
		const data = typeof rawData.contents === 'string' ? JSON.parse(rawData.contents) : rawData;
  
		const results = Array.isArray(data?.results)
		  ? data.results.map((c: any) => ({
			  name: c.name,
			  country: c.country,
			  latitude: c.latitude,
			  longitude: c.longitude,
			}))
		  : [];
  
		suggestions.push(...results.slice(0, 5)); // Limitoi ehdotukset 5
		selectedIndex = 0;
		console.log('Fetched suggestions:', suggestions);
	  } catch (error) {
		console.error('Failed to fetch city suggestions:', error);
		suggestions.length = 0; // Reseto9i ehdotukset jos error
	  }
	}
  
	// Input handler etsintäpalikalle
	// kutsuu fetchSuggestions funktiota, joka hakee kaupungin nimen
	function handleInput(event: Event) {
	  if (oninput) {
		oninput();
	  }
	  const value = (event.target as HTMLInputElement).value;
	  clearTimeout(timeoutId);
	  timeoutId = setTimeout(() => fetchSuggestions(value), 300); // 300ms debounce
	}
  
	// valitsee kaupungin ehdotuksen
	function selectsuggestion(city: CitySuggestions) {
	  value = `${city.name}`;
	  suggestions.length = 0;
	  if (search) {
		search();
	  }
  
	  const inputElement = document.querySelector('.search-input') as HTMLInputElement;
	  inputElement?.focus();
  
	  clearTimeout(timeoutId);
  
	  onDestroy(() => {
		clearTimeout(timeoutId);
	  });
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



  </script>
  
  <div class="search-container">
	<div class="search-bar">
	  <div class="search-input-container">
		<input
		  type={type}
		  placeholder={placeholder}
		  bind:value={value}
		  disabled={disabled}
		  oninput={handleInput}
		  onkeydown={handleKeydown}
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
  
	{#if suggestions.length > 0}
	  <ul class="suggestion-list">
		{#each suggestions as suggestion, index}
		  <li class:selected={selectedIndex === index}>
			<button
			  type="button"
			  class="suggestion-button"
			  onclick={() => selectsuggestion(suggestion)}>
			  {suggestion.name}
			</button>
		  </li>
		{/each}
	  </ul>
	{/if}
  </div>
  
  <style>
	.search-container {
	  max-width: 350px;
	  margin: 0 auto;
	  padding: 1rem;
	  overflow: visible;
	  position : relative;
	}
  
	.search-bar {
	  margin-top: 1rem;
	  overflow: visible;
	  position: relative;
	}
  
	.search-input-container {
	  position: relative;
	  display: flex;
	  width: 100%;
	  overflow: visible;
	  z-index: 1000
	}
  
	.search-input {
	  flex-grow: 1;
	  padding: 0.75rem 3rem 0.75rem 1rem;
	  border: 1px solid #ccc;
	  border-radius: 12px;
	  font-size: 1rem;
	  width: 100%;
	  transition: border-color 0.3s;
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
	  color: #666;
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
	  color: #666;
	  display: block;
	}
  
	.suggestion-list {
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 83%;
    left: 0;
    right: 0;
    border: 2px solid #100f0f;
    border-radius: 0 0 12px 12px;
    background: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    max-height: 250px;
    overflow-y: auto;
  }

  .suggestion-list li {
    padding: 0.75rem;
    cursor: pointer;
  }

  .suggestion-list li:hover {
    background-color: #f5f5f5;
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
	
  </style>
  