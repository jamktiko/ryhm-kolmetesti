<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<header>
	<img class="logo" src={appInfo.logo} alt="Logo" />
	<h1 style="transition: color 1s;" class:yo={weatherGlobal.isNight}>{appInfo.name}</h1>
</header>

<style>
	.logo {
		width: 200px;
		height: auto;
		float: left;
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
			width: 120px;
		}
		header {
			padding: 0px;
			padding-top: 1em;
			padding-bottom: 1em;
		}
	}
</style>
