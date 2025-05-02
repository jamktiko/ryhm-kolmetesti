<script lang="ts">
	interface Props {
		type: 'text' | 'textarea' | 'date' | 'number';
		placeholder?: string;
		disabled: boolean;
		value: string;
		oninput?: () => void;
		search?: () => void;
		onkeydown?: (event: KeyboardEvent) => void;
	}
	let {
		type,
		placeholder,
		disabled,
		value = $bindable(),
		oninput,
		search,
		onkeydown
	}: Props = $props();
</script>

<div class="search-container">
	<div class="search-bar">
		<div class="search-input-container">
			<input {onkeydown} bind:value {type} {placeholder} {disabled} class="search-input" />
			<button onclick={search} class="search-button">
				<!-- SVG-hakuikoni viitattu suoraan -->
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
				</svg>
			</button>
		</div>
	</div>
</div>

<style>
	.search-container {
		max-width: 350px;
		margin: 0 auto;
		padding: 1rem;
	}

	.search-bar {
		margin-top: 1rem;
	}

	.search-input-container {
		position: relative;
		display: flex;
		width: 100%;
	}

	.search-input {
		flex-grow: 1;
		padding: 0.75rem 3rem 0.75rem 1rem;
		border: 1px solid #ccc;
		border-radius: 12px;
		font-size: 1rem;
		width: 100%;
		transition: border-color 0.3s;
	}

	.search-input:focus {
		outline: none;
		border-color: var(--primary-color);
	}

	.search-button {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.search-button:hover {
		color: var(--primary-color);
	}

	.search-button svg {
		width: 1.25rem;
		height: 1.25rem;
		color: #666;
		display: block;
	}

	/* Responsiivisuus */
	@media (max-width: 768px) {
		.search-input {
			padding: 0.75rem 2.5rem 0.75rem 1rem;
		}

		.search-container {
			padding: 1rem 0.5rem;
		}
	}
</style>
