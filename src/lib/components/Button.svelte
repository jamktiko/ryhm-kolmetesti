<script lang="ts">
	interface Props {
		onclick: () => void;
		text: string;
		disabled: boolean;
	}
	let { onclick, text, disabled }: Props = $props();
</script>

<button {onclick} {disabled}>{text}</button>

<style>
</style>
