<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import type { IGame } from '$lib/types/game';
	import { onMount } from 'svelte';

	let todaysGame: IGame | null = $state(null);
	function randomGame(numberOfGames: number) {
		return Math.floor(Math.random() * numberOfGames);
	}
	let games: IGame[] = $state([]);

	onMount(async () => {
		const pelit = await fetch('games.json')
			.then((vastaus) => vastaus.json())
			.catch((error) => {
				if (error instanceof Error) {
					console.error('Virhe:', error.message);
				} else {
					console.error('Virhe hakiessa peliä');
				}
			});
		todaysGame = pelit[randomGame(pelit.length)];
		games = pelit;
		//console.log(pelit);
	});
</script>

<Game game={todaysGame} {games} />

<style></style>
