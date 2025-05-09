<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { page } from '$app/stores';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<header>
	<img class="logo" src={appInfo.logo} alt="Logo" />
	{#if $page.url.pathname === '/'}
		<nav>
			<!--<a class:active={$page.url.pathname === '/'} href="/">Etusivu</a>-->
			<a href="/tietovisa">Sää-tietovisa</a>
		</nav>
	{/if}
	<!--<h1 style="transition: color 1s;" class:yo={weatherGlobal.isNight}>{appInfo.name}</h1>-->
</header>

<style>
	.logo {
		width: 200px;
		height: auto;
	}
	nav {
		padding: 2em;
	}
	a {
		color: var(--main-text);
		text-decoration: none;
		padding: 0.5em 1em;
		background-color: var(--main-color);
		border: none;
		cursor: pointer;
		font-size: 1.125em;
		transition: background-color 0.3s ease;
		border: solid 2px var(--sec-color);
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
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
	}
</style>
