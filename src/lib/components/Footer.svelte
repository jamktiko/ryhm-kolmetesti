<script lang="ts">
	interface Props {
		appInfo: {
			name: string;
			version: string;
			description: string;
		};
	}
	let { appInfo }: Props = $props();
</script>

<footer>
	Copyright by {appInfo.name}, 2025
</footer>

<style>
	footer {
		background-color: var(--main-color);
		color: var(--sec-color);
		text-align: center;
		padding: 1rem;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
