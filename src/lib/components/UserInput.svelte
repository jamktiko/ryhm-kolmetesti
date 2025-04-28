<script lang="ts">
	export let type: 'text' | 'textarea' | 'date' | 'number' = 'text';
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
</script>

<input {type} {placeholder} {disabled} bind:value on:keydown />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
	* {
		font-family: 'Inter', sans-serif;
	}
</style>
