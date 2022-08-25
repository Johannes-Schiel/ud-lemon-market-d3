<template>
	<div class="information">
		<p class="label">information</p>
		<p class="title">{{ instrument.title }}</p>
		<p class="name">{{ instrument.name }}</p>
	</div>
	<div class="container">
		<LemonMarketPair name="symbol" :value="instrument.symbol" />
		<LemonMarketPair name="wkn" :value="instrument.wkn" />
		<LemonMarketPair name="isin" :value="instrument.isin" />
		<LemonMarketPair name="type" :value="instrument.type" />
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
	props: {
		instrument: {
			type: Object as PropType<Instrument>,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.information {
	display: flex;
	flex-direction: column;
	width: 100%;
	p {
		color: $ciWhite;
		margin: 0;
		padding: 0;
		&.label {
			font-size: 1rem;
			text-transform: uppercase;
			color: $yellow;
			margin: 0;
			padding: 0;
		}
		&.title {
			margin: 0;
			padding: 0;
			font-size: 3.5rem;
			color: $ciWhite;
		}
	}
}
.container {
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	width: 100%;
	margin: 2rem 0 2rem 0;
}
</style>
