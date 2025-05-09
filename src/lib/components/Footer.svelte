<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<footer style="transition: 1s;" class:yo={weatherGlobal.isNight}>
	<span
		>© 2025 Sade Haarala, Konsta Poikolainen, Jarkko Remes, Matias Vairama. License: CC BY-SA 4.0</span
	><br />
	<span
		>Säätiedot ja symbolit: <a href="https://www.ilmatieteenlaitos.fi/avoin-data"
			>Ilmatieteen laitoksen avoin data</a
		></span
	>
	<br />
	<span
		>Includes Vanta.js by Teng Bao, licensed under the MIT License. <a
			href="https://github.com/tengbao/vanta">https://github.com/tengbao/vanta</a
		></span
	>
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
