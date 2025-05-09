<script lang="ts">
	interface Props {
		onclick: () => void;
		text: string;
		vaihtoehto: string;
	}
	let { onclick, text, vaihtoehto }: Props = $props();
</script>

<button {onclick}
	><div class="vaihtoehto"><span>{vaihtoehto}</span></div>
	<span>{text}</span></button
>

<style>
	.vaihtoehto {
		position: absolute;
		left: 0;
		top: 0;
		padding: 0.5em;
		background-color: var(--sec-color);
		border-radius: 20px;
		height: 100%;
		box-sizing: border-box;
		text-align: center;
		display: flex;
		align-items: center;
	}
	button {
		position: relative;
		color: var(--main-text);

		padding: 0.5em 1em;
		padding-left: 2em;
		width: 45%;
		background-color: var(--main-color);
		border: none;
		cursor: pointer;
		font-size: 1.125em;
		transition: background-color 0.3s ease;
		flex: 0 0 45%;
		border: solid 2px var(--sec-color);
		box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}
	button:hover,
	.active {
		background-color: var(--active-color);
	}
	@media (max-width: 600px) {
		button {
			font-size: 1em;
		}
	}
	@media (max-width: 450px) {
		button {
			font-size: 0.875em;
		}
	}
</style>
