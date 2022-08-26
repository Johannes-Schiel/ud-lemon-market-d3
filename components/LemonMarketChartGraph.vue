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
		yScale: function (): any {
			return d3
				.scaleLog()
				.domain([
					d3.min(this.data, (d: Ohlc) => d.l),
					d3.max(this.data, (d: Ohlc) => d.h),
				])
				.rangeRound([
					this.height - this.margin.bottom,
					this.margin.top,
				]);
		},
		getWidth: function (): number {
			return this.width - this.margin.right - this.margin.left;
		},
		xScale: function (): any {
			return d3
				.scaleTime()
				.domain([
					new Date(this.data[0].t),
					new Date(this.data[this.data.length - 1].t),
				])
				.range([this.margin.left + 50, this.getWidth])
				.nice();
		},
	},
	methods: {
		createXAxis: function (g: any): any {
			return g
				.attr(
					'transform',
					`translate(0, ${this.height - this.margin.bottom / 1.5})`
				)
				.style('font-size', '1rem')
				.call(
					d3
						.axisBottom(this.xScale)
						.ticks(5)
						.tickFormat((d: any) =>
							new Date(d).toLocaleDateString()
						)
						.tickSizeOuter(0)
						.tickSizeInner(0)
				)
				.call((g) => g.select('.domain').remove());
		},
		createYAxis: function (g: any): any {
			return g
				.attr('transform', `translate(${this.margin.left - 5}, 0)`)
				.style('font-size', '1rem')
				.call(
					d3
						.axisLeft(this.yScale)
						.ticks(10)
						.tickFormat((d: number) => `${d}€`)
						.tickSizeOuter(0)
						.tickSizeInner(0)
				)
				.call((g) =>
					g
						.selectAll('.tick line')
						.clone()
						.attr('stroke-opacity', 0.2)
						.attr('x1', 10)
						.attr(
							'x2',
							this.width - this.margin.left - this.margin.right
						)
				)
				.call((g) => g.select('.domain').remove());
		},
		clearSvg(): void {
			this.getSvg.innerHTML = '';
		},
		drawD3: function (): void {
			this.clearSvg();
			const svg = d3.select(this.getSvg);
			svg.attr('viewBox', [0, 0, this.width, this.height]);
			svg.append('g').call(this.createXAxis);
			svg.append('g').call(this.createYAxis);
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
	.tick {
		line {
			stroke: rgba($ciWhite, 1);
			stroke-dasharray: 0.3rem;
			stroke-dashoffset: 0.3rem;
		}
		text {
			font-family: $roboto;
			fill: rgba($ciWhite, 1);
		}
	}
}
</style>
