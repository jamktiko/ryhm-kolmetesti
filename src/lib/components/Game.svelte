<script lang="ts">
	import { goto } from '$app/navigation';
	import type { IGame } from '$lib/types/game';
	import GameButton from '$lib/components/GameButton.svelte';
	interface Props {
		game: IGame | null;
		games: IGame[];
	}
	let { game, games }: Props = $props();
	let vastattu: boolean = $state(false);
	let oikein: boolean = $state(false);
	let vastausVaihtoehdot = ['A', 'B', 'C', 'D'];
	let gameId = $state(0);
	let pisteet = $state(0);
	let maksPisteet = $derived(games.length);
	let loppu = $state(false);
</script>

<div class="window">
	<button class="exit" onclick={() => goto('/')}>X</button>
	<h1>Sää-tietovisa</h1>
	{#if games.length > 0}
		{#if !loppu}
			<div class="game-area">
				<h3>Kysymys {gameId + 1}/{games.length}</h3>
				<h2>{games[gameId].question}</h2>

				<div class="button-container">
					{#each games[gameId].answers as answer, index}
						<GameButton
							onclick={() => {
								if (!vastattu) {
									if (answer === games[gameId].correctAnswer) {
										oikein = true;
										vastattu = true;
										pisteet++;
									} else {
										oikein = false;
										vastattu = true;
									}

									if (gameId >= games.length - 1) {
										setTimeout(() => {
											vastattu = false;
											loppu = true;
										}, 2000);
									} else {
										setTimeout(() => {
											gameId++;
											oikein = false;
											vastattu = false;
										}, 2000);
									}
								}
							}}
							text={answer}
							vaihtoehto={vastausVaihtoehdot[index]}
						/>{/each}
				</div>
			</div>

			{#if vastattu}
				{#if oikein}
					<p class="oikein">OIKEIN! &#128512</p>
				{:else}
					<p class="vaarin">VÄÄRIN! &#128542</p>{/if}
			{/if}
		{:else}
			<div class="score-area">
				<h3>Pisteet</h3>
				<h2>{pisteet}/{maksPisteet}</h2>
				<h3>{Math.round((pisteet / maksPisteet) * 100)} %</h3>
			</div>
		{/if}
	{:else}
		<p style="font-size:2em">Haetaan tietovisaa...</p>{/if}
</div>

<style>
	.oikein {
		color: darkgreen;
		padding: 0.5em;
		margin: 1em 0em 0 0em;
		background-color: var(--sec-color);
		width: 25%;
		border-radius: 20px;
	}
	.vaarin {
		color: darkred;
		padding: 0.5em;
		margin: 1em 0em 0 0em;
		background-color: var(--sec-color);
		width: 25%;
		border-radius: 20px;
	}
	.exit {
		padding: 0.5em 0.75em;
		margin: 1em;
		position: absolute;
		right: 0;
		top: 0;
		color: var(--main-text);
		background-color: var(--main-color);
		border: none;
		cursor: pointer;
		font-size: 1.125em;
		transition: background-color 0.3s ease;
		flex: 0 0 45%;
		border: solid 2px var(--sec-color);
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
	.exit:hover {
		background-color: var(--active-color);
	}
	.game-area {
		background-color: var(--sec-color);
		border-radius: 20px;

		min-height: 25em;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
	}
	.score-area {
		background-color: var(--sec-color);
		border-radius: 20px;

		min-height: 25em;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
	}
	.button-container {
		padding: 2em;
		box-sizing: border-box;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: space-evenly;
		row-gap: 1em;
	}
	h1 {
		color: var(--main-text);
	}
	h3 {
		color: var(--main-text);
		float: left;
		font-size: 2em;
		margin: 0.5em 0em;
	}
	div {
		position: relative;
		box-sizing: border-box;
		max-width: 100%;
		overflow-x: hidden;
	}

	h2 {
		color: var(--main-text);
		font-size: 2.5em;
		text-align: center;
		margin: 1rem 0rem;
	}

	p {
		color: var(--main-text);
		text-align: center;
		margin-top: 1rem; /* Perus marginaali */
		padding-top: 1.5;
	}

	.window {
		position: relative;
		background: var(--main-color);
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
		border-radius: 20px;
		/*padding: 1rem;*/
		width: 95%;
		text-align: center;
		box-sizing: border-box;
		overflow-x: hidden;
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		align-items: center;
		padding: 1em;
		margin: 2.5%;
	}
	/* UUSI: säälaatikot rinnakkain */
	@media (max-width: 600px) {
		h2 {
			font-size: 2em;
		}
		.button-container {
			padding: 1em 0em;
		}
		.window {
			margin-left: 0;
			margin-right: 0;
			width: 100%;
		}
	}
	@media (max-width: 450px) {
		h2 {
			font-size: 1.75em;
		}
	}
</style>
