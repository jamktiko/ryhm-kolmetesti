<script lang="ts">
	import { appInfo } from '$lib/appInfo';
	import { weatherGlobal } from '$lib/weatherGlobal.svelte';
</script>

<footer style="transition: 1s;" class:yo={weatherGlobal.isNight}>
	{appInfo.name}, 2025
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
</style>
