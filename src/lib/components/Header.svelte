<script lang="ts">
	interface Props {
		appInfo: {
			name: string;
			version: string;
			description: string;
			logo: string;
		};
	}
	let { appInfo }: Props = $props();
</script>

<header>
	<img class="logo" src={appInfo.logo} alt="Logo" />
	<h1>{appInfo.name}</h1>
</header>

<style>
	.logo {
		width: 150px;
		height: auto;
		float: left;
	}
	header {
		background-color: var(--main-color);
		color: var(--text-decoration-color);
		padding: 1em;
	}
</style>
