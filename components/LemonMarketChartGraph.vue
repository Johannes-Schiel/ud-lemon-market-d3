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
		getElementWidth: function (): number {
			const elementWidth: number = (this.width / this.data.length) * 0.4;
			return elementWidth > 15 ? 15 : elementWidth;
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
		createDataContainer: function (svg: any): any {
			return svg
				.append('g')
				.attr('stroke-linecap', 'round')
				.attr('class', 'dataset')
				.selectAll('g')
				.data(this.data)
				.join('g')
				.attr('class', 'candle-bar')
				.attr('stroke', (d: Ohlc) => this.greenOrRed(d))
				.attr('transform', (d: Ohlc) => {
					return `translate(${this.xScale(new Date(d.t))},0)`;
				});
		},
		greenOrRed(ohlc: Ohlc): string {
			return ohlc.o < ohlc.c ? '#17EB9C' : '#FF0046';
		},
		createHighLowLine: function (dataContainer: any): void {
			dataContainer
				.append('line')
				.attr('y1', (d: Ohlc) => this.yScale(d.l))
				.attr('y2', (d: Ohlc) => this.yScale(d.h));
		},
		createOpenClose: function (dataContainer: any): any {
			dataContainer
				.append('line')
				.attr('y1', (d: Ohlc) => this.yScale(d.o))
				.attr('y2', (d: Ohlc) => this.yScale(d.c))
				.attr('stroke-width', this.getElementWidth);
		},
		createOverlay: function (dataContainer: any): any {
			dataContainer
				.append('line')
				.attr('y1', this.margin.top)
				.attr('y2', this.height - this.margin.bottom)
				.attr('stroke-width', this.getElementWidth)
				.attr('data-date', (d: Ohlc) => d.t.toString())
				.attr('class', 'background')
				.on('mouseenter', ($event) => {
					const selectedData: Ohlc = this.data.find(
						(elm: Ohlc) => elm.t === $event.target.dataset.date
					);
					this.$emit('userSelection', selectedData);
				});
		},
		drawD3: function (): void {
			this.clearSvg();
			const svg = d3.select(this.getSvg);
			svg.attr('viewBox', [0, 0, this.width, this.height]);
			svg.append('g').call(this.createXAxis);
			svg.append('g').call(this.createYAxis);
			const dataContainer = this.createDataContainer(svg);
			this.createHighLowLine(dataContainer);
			this.createOpenClose(dataContainer);
			this.createOverlay(dataContainer);
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
.background {
	opacity: 0;
	stroke: rgba($ciWhite, 1);
	cursor: pointer;
	transition: 250ms all;
	&:hover {
		opacity: 0.05;
	}
}
</style>
