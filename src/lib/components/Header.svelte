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

<header>
	<h1>{appInfo.name}</h1>
</header>

<style>
	header {
		background-color: var(--main-color);
		color: var(--sec-color);
		padding: 1em;
		text-align: center;
	}
</style>
