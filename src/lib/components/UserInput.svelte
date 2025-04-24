<script lang="ts">
	interface Props {
		type: 'text' | 'textarea' | 'date' | 'number';
		placeholder?: string;
		disabled: boolean;
		value: string;
		oninput?: () => void;
	}
	let { type, placeholder, disabled, value = $bindable(), oninput }: Props = $props();
</script>

<input {type} bind:value {disabled} {placeholder} />

<style>
</style>
