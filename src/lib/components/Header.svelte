<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { page } from '$app/stores';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	interface Props {
		onclick: () => void;
		background: boolean;
	}
	let { onclick, background }: Props = $props();
</script>

<header>
	<img class="logo" src={appInfo.logo} alt="Logo" />

	<nav>
		<button
			class:active={$page.url.pathname === '/tietovisa'}
			in:fade={{ duration: 500 }}
			onclick={() => {
				if ($page.url.pathname === '/') {
					goto('/tietovisa');
				} else {
					goto('/');
				}
			}}>Sää-tietovisa</button
		>
		<button class:active={background} id="effect" {onclick}
			><img src="/icons/clouds.svg" />{background ? 'On' : 'Off'}</button
		>
	</nav>

	<!--<h1 style="transition: color 1s;" class:yo={weatherGlobal.isNight}>{appInfo.name}</h1>-->
</header>

<style>
	.active {
		background-color: var(--inset-color);
		box-shadow: inset 0px 4px 6px rgba(0, 0, 0, 0.5);
		transition: background-color 0s ease;
		border: solid 1px var(--sec-color);
	}
	.logo {
		width: 200px;
	}
	nav {
		padding: 1em;
		display: flex;
		justify-content: end;
		flex-wrap: nowrap;
		align-items: stretch;
		gap: 0.5rem;
	}

	button {
		color: var(--main-text);
		text-decoration: none;
		padding: 0.5em 1em;
		background-color: var(--main-color);
		border: none;
		cursor: pointer;
		font-size: 1.125em;
		transition: background-color 0.3s ease;

		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
	button {
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: center;
		gap: 0.5rem;
		cursor: pointer;
	}
	button:hover:not(.active) {
		background-color: var(--active-color);
	}
	h1 {
		font-size: 3em;
	}
	header {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		box-sizing: border-box;
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		/*background-color: var(--main-color);*/
		color: var(--main-text);
		padding: 1em;
		padding-bottom: 0px;
		align-items: start;
	}
	@media (max-width: 343px) {
		.logo {
			width: 150px;
		}
		header {
			padding: 0px;
			padding-top: 1em;
			padding-bottom: 1em;
		}
	}
	@media (max-width: 768px) {
		header {
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;
		}
		nav {
			padding-top: 1em;
			padding-bottom: 0em;
		}
		#effect {
			position: absolute;
			margin: 1em;
			top: 0;
			right: 0;
		}
	}
	@media (max-width: 480px) {
		#effect {
			padding: 0.5em 0.25em 0.5em 0em;
			font-size: 0.875em;
			gap: 0.25em;
		}
	}
</style>
