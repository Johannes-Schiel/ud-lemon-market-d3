<template>
	<form>
		<div class="inputfield">
			<input
				id="search"
				name="search"
				placeholder="Suche nach einer ISIN"
				:value="init"
				type="text" />
			<label for="search">Suche nach einer ISIN</label>
		</div>
		<button type="submit">
			<img src="@/assets/images/search.svg" alt="search icon" />
		</button>
	</form>
</template>

<script lang="ts">
export default {
	props: {
		init: {
			type: String,
			required: false,
			default: '',
		},
	},
};
</script>

<style lang="scss" scoped>
form {
	width: 100%;
	margin: 2rem 0 2rem 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	button {
		width: 5rem;
		margin: 0 0 0 1rem;
		background-color: $yellow;
		border: none;
		cursor: pointer;
		border-radius: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 2rem;
			height: 2rem;
		}
	}
	.inputfield {
		width: 100%;
		position: relative;
		background-color: rgba($ciWhite, 0.05);
		border-radius: 1rem;
		input {
			padding: 1.5rem;
			font-size: 1.6rem;
			background-color: transparent;
			width: 100%;
			border: none;
			border-radius: 1rem;
			color: $ciWhite;
			&:focus {
				outline: $yellow 1px solid;
			}
			&:placeholder-shown + label {
				position: absolute;
				top: 50%;
				transform: translate(0, -50%);
				left: 1.5rem;
				font-size: 1.6rem;
				color: $ciWhite;
			}
			&::placeholder {
				opacity: 0;
			}
		}
		label {
			position: absolute;
			top: 0.8rem;
			transform: translate(0, -50%);
			left: 1.5rem;
			font-size: 0.8rem;
			color: $yellow;
			transition: all 250ms;
		}
	}
}
</style>
