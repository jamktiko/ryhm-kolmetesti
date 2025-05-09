<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<footer style="transition: 1s;" class:yo={weatherGlobal.isNight}>
	<span
		>© 2025 Sade Haarala, Konsta Poikolainen, Jarkko Remes, Matias Vairama. <a
			style="transition: 1s;"
			class:yo={weatherGlobal.isNight}
			href="https://github.com/jamktiko/ryhma-kolme">GitHub</a
		></span
	><br />
	<span
		>Säätiedot ja symbolit: <a
			style="transition: 1s;"
			class:yo={weatherGlobal.isNight}
			href="https://www.ilmatieteenlaitos.fi/avoin-data">Ilmatieteen laitoksen avoin data</a
		></span
	>
	<br />
</footer>

<style>
	.yo {
		color: var(--night-color);
	}
	footer {
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0);
		color: var(--text-decoration-color);
		text-align: center;
		padding: 1rem;
		position: relative;
		left: 0;
		bottom: 0;
		width: 100%;
		opacity: 1;
	}
	a {
		color: var(--text-decoration-color);
	}
</style>
