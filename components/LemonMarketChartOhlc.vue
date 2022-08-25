<template>
	<div class="container">
		<LemonMarketPair name="open" :value="ohlc.o + '€'" />
		<LemonMarketPair name="hight" :value="ohlc.h + '€'" />
		<LemonMarketPair name="low" :value="ohlc.l + '€'" />
		<LemonMarketPair name="close" :value="ohlc.c + '€'" />
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
	props: {
		ohlc: {
			type: Object as PropType<Ohlc>,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.container {
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	width: 100%;
	margin: 2rem 0 2rem 0;
}
</style>
