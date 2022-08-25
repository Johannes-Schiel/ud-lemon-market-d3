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
	data() {
		return {
			width: 750,
			height: 350,
			margin: { top: 20, right: 20, bottom: 50, left: 50 },
		};
	},
	computed: {
		getSvg(): Element {
			return document.querySelector('svg.graph');
		},
	},
	methods: {
		clearSvg(): void {
			this.getSvg.innerHTML = '';
		},
		drawD3: function (): void {
			this.clearSvg();
			const svg = d3.select(this.getSvg);
			svg.attr('viewBox', [0, 0, this.width, this.height]);
		},
	},
	onUnmounted() {
		window.removeEventListener('resize', this.drawD3);
	},
	mounted() {
		this.drawD3();
		window.addEventListener('resize', this.drawD3);
	},
	emits: ['userSelection'],
};
</script>

<style lang="scss">
svg.graph {
	width: 100%;
	height: auto;
	background-color: rgba($ciWhite, 0.05);
	border-radius: 1rem;
	color: rgba($ciWhite, 0.3);
}
</style>
