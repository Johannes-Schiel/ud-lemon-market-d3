<template>
	<div class="detail-value">
		<p class="label">{{ name }}</p>
		<p class="value">{{ value }}</p>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		name: {
			type: String,
			required: true,
		},
		value: {
			type: String || Number,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.detail-value {
	display: flex;
	flex-direction: column;
	p.value {
		margin: 0;
		padding: 0;
		font-size: 1.8rem;
		color: $ciWhite;
	}
	p.label {
		font-size: 1rem;
		text-transform: uppercase;
		color: $yellow;
		margin: 0;
		padding: 0;
	}
}
</style>
