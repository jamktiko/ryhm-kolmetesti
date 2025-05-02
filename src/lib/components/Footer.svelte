<script lang="ts">
	import { appInfo } from '$lib/appInfo';
</script>

<footer>
	{appInfo.name}, 2025
</footer>

<style>
	footer {
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
