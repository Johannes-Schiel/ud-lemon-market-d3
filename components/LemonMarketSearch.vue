<template>
	<form>
		<div class="inputfield">
			<img src="@/assets/images/search.svg" alt="search icon" />
			<input
				id="search"
				name="search"
				placeholder="Suche nach einer ISIN"
				:value="init"
				type="search" />
			<label for="search">Suche nach einer ISIN</label>
		</div>
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
	.inputfield {
		position: relative;
		background-color: rgba($ciWhite, 0.05);
		border-radius: 1rem;
		img {
			position: absolute;
			top: 50%;
			left: 1rem;
			transform: translate(0, -50%);
		}
		input {
			padding: 1.5rem 1.5rem 1.5rem 4rem;
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
				left: 4rem;
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
			left: 4rem;
			font-size: 0.8rem;
			color: $yellow;
			transition: all 250ms;
		}
	}
}
</style>
