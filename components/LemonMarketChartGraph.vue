<template>
	<svg class="graph"></svg>
</template>

<script lang="ts">
import * as d3 from 'd3';
import { PropType } from 'vue';

export default {
	props: {
		data: {
			type: Array as PropType<Ohlc[]>,
			required: true,
		},
	},
	emits: ['userSelection'],
};
</script>

<style lang="scss"></style>
