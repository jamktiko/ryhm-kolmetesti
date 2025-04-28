<script lang="ts">
	import { appInfo } from '$lib/appInfo';
</script>

<footer>
	Copyright by {appInfo.name}, 2025
</footer>

<style>
	footer {
		background-color: var(--main-color);
		color: var(--text-decoration-color);
		text-align: center;
		padding: 1rem;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>
