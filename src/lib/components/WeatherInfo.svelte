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
	<span>
		<p>{weatherInfo.title}</p>
	</span>
	<span>
		<img src="/icons/{`${weatherInfo.icon}.svg`}" alt="Sääkuvake" />
	</span>
	<span>
		{#if 'extraData' in weatherInfo}
			<p>
				{weatherInfo.data}
				{weatherInfo.unit}
				{#if weatherInfo.title === 'Tuuli'}
					<img class="wind-direction" src="/icons/{`${weatherInfo.extraData}_wind.svg`}" alt="Sääkuvake" />
				{:else}
					| {weatherInfo.extraData}
					{weatherInfo.extraUnit}
				{/if}
			</p>
		{:else}
			<p>{weatherInfo.data} {weatherInfo.unit}</p>
		{/if}
	</span>
</div>

<style>
	div {
		flex: 0 0 45%;
		border-radius: 20px;
		background-color: var(--sec-color);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	p {
		margin: 0em;
		margin-left: 0.5em;
	}
	img {
		margin-left: 0.5em;
	}
	@media (max-width: 405px) {
		.wind-direction {
			margin-left: 0em;
		}
		p {
			margin: 0;
			margin-left: 0.5em;
			justify-content: flex-start;
			font-size: 90%;
		}
		@media (max-width: 371px) {
			p {
				font-size: 80%;
		}
	}
	@media (max-width: 342px) {
		
	}
		
	}
</style>
