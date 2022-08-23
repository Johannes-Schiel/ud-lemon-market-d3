<template>
	<svg id="graph"></svg>
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
	emits: ['clicked'],
	data() {
		return {
			width: 750,
			height: 350,
			margin: { top: 20, right: 20, bottom: 40, left: 50 },
		};
	},
	methods: {
		drawD3: function (): void {
			document.querySelector('svg#graph').innerHTML = '';

			let x = d3
				.scaleTime()
				.domain([
					new Date(this.data[0].t),
					new Date(this.data[this.data.length - 1].t),
				])
				.range([
					this.margin.left + 50,
					this.width - this.margin.right - 50,
				])
				.nice();

			let y = d3
				.scaleLog()
				.domain([
					d3.min(this.data, (d: Ohlc) => d.l),
					d3.max(this.data, (d: Ohlc) => d.h),
				])
				.rangeRound([
					this.height - this.margin.bottom,
					this.margin.top,
				]);

			let xAxis = (g) =>
				g
					.attr(
						'transform',
						`translate(0, ${this.height - this.margin.bottom + 18})`
					)
					.style('font-size', '1rem')
					.call(
						d3
							.axisBottom(x)
							.ticks(5, '$.2f')
							.tickFormat((d: any) =>
								new Date(d).toLocaleDateString()
							)
							.tickSizeOuter(0)
							.tickSizeInner(0)
					)
					.call((g) => g.select('.domain').remove());

			let yAxis = (g) =>
				g
					.attr('transform', `translate(${this.margin.left - 5},0)`)
					.style('font-size', '1rem')
					.call(
						d3
							.axisLeft(y)
							.tickFormat(d3.format('$~f'))
							.tickValues(
								d3.scaleLinear().domain(y.domain()).ticks()
							)
							.tickSizeOuter(0)
							.tickSizeInner(0)
					)
					.call((g) =>
						g
							.selectAll('.tick line')
							.clone()
							.attr('stroke-opacity', 0.2)
							.attr(
								'x2',
								this.width -
									this.margin.left -
									this.margin.right
							)
					)
					.call((g) => g.select('.domain').remove());

			const svg = d3.select(document.querySelector('svg#graph'));
			svg.attr('viewBox', [0, 0, this.width, this.height]);
			svg.append('g').call(xAxis);
			svg.append('g').call(yAxis);

			const g = svg
				.append('g')
				.attr('stroke-linecap', 'round')
				.attr('stroke', '#f7fb2b')
				.selectAll('g')
				.data(this.data)
				.join('g')
				.attr('transform', (d: Ohlc) => {
					return `translate(${x(new Date(d.t))},0)`;
				});

			g.append('line')
				.attr('y1', (d: Ohlc) => y(d.l))
				.attr('opacity', 0.5)
				.attr('y2', (d: Ohlc) => y(d.h));

			g.append('line')
				.attr('y1', (d: Ohlc) => y(d.o))
				.attr('y2', (d: Ohlc) => y(d.c))
				.attr('stroke-width', 10)
				.attr('stroke', '#f7fb2b');

			g.append('line')
				.attr('y1', this.margin.top)
				.attr('y2', this.height - this.margin.bottom)
				.attr('stroke-width', 20)
				.attr('data-date', (d: Ohlc) => d.t)
				.attr('class', 'background')
				.on('mouseenter', ($event) => {
					const data = this.data.find(
						(elm: Ohlc) => elm.t === $event.target.dataset.date
					);
					this.$emit('clicked', data);
				});
		},
	},
	onUnmounted() {
		window.removeEventListener('resize', this.drawD3);
	},
	mounted() {
		this.drawD3();
		this.$emit('clicked', this.data[this.data.length - 1]);
		window.addEventListener('resize', this.drawD3);
	},
};
</script>

<style lang="scss">
svg#graph {
	width: 100%;
	height: auto;
	background-color: rgba($ciWhite, 0.05);
	border-radius: 1rem;
	color: rgba($ciWhite, 0.3);
	.tick {
		stroke: rgba($ciWhite, 0.05);
		text {
			fill: rgba($ciWhite, 0.05);
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
