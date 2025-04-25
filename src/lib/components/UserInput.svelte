<script lang="ts">
	export let type: 'text' | 'textarea' | 'date' | 'number' = 'text';
	export let placeholder: string = '';
	export let value: string = '';
	export let disabled: boolean = false;
  </script>
  
  <input
	type={type}
	placeholder={placeholder}
	disabled={disabled}
	bind:value
	on:keydown
  />
  
  <style>
	
  </style>
  

