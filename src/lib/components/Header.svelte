<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { page } from '$app/stores';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<header>
	<img class="logo" src={appInfo.logo} alt="Logo" />
	<nav>
		<!--<a class:active={$page.url.pathname === '/'} href="/">Etusivu</a>-->
		<a class:active={$page.url.pathname === '/tietovisa'} href="/tietovisa">Päivän Tietovisa</a>
	</nav>
	<!--<h1 style="transition: color 1s;" class:yo={weatherGlobal.isNight}>{appInfo.name}</h1>-->
</header>

<style>
	.active {
		color: black;
	}
	.logo {
		width: 200px;
		height: auto;
	}
	h1 {
		font-size: 3em;
	}
	header {
		box-sizing: border-box;
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		/*background-color: var(--main-color);*/
		color: var(--main-text);
		padding: 1em;
		padding-bottom: 0px;
		width: 100%;
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
			text-align: center;
		}
	}
</style>
