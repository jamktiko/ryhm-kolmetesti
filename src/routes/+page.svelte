<script>
	import Button from '$lib/components/Button.svelte';
	import UserInput from '$lib/components/UserInput.svelte';

	let city = $state('');
</script>

<h2>Hae säätiedot</h2>
<UserInput type="text" placeholder="Hae kaupunki" bind:value={city} disabled={false} />
<Button
	onclick={() => {
		console.log('Nappia painettu');
	}}
	text="Hae"
	disabled={false}
/>
