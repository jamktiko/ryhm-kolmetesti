<script lang="ts">
	interface IWeatherInfo {
		title: string;
		data: number | string;
		extraData?: number | String;
		icon: string;
		extraIcon?: string;
		unit: string;
		extraUnit?: string;
	}
	interface Props {
		weatherInfo: IWeatherInfo;
	}
	let { weatherInfo }: Props = $props();
</script>

<div>
	<p>{weatherInfo.title}</p>
	<img src="/icons/{`${weatherInfo.icon}.svg`}" alt="Sääkuvake" />
	<p>{weatherInfo.data} {weatherInfo.unit}</p>
	{#if 'extraData' in weatherInfo}
		<p>moi</p>
	{/if}
</div>

<style>
	div {
		flex: 0 0 45%;
		border-radius: 20px;
		background-color: rgba(255, 255, 255, 0.35);
	}
	p {
		margin: 0.5em;
	}
	img {
		margin-left: 0.5em;
	}
</style>
