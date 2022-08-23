<template>
	<template v-if="!pending && !error">
		<div class="details">
			<ResultDetailsPair v-for="pair in state.pairs" :pair="pair" />
		</div>
		<div class="graph">
			<CandleChartGraph @clicked="change($event)" :data="ohlc.results" />
		</div>
	</template>
</template>

<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig();

const state = reactive({ pairs: [] });

const {
	data: ohlc,
	pending,
	error,
} = await useFetch<OhlcResponse>(
	`https://data.lemon.markets/v1/ohlc/d1?isin=${route.query.search}&from=2022-08-15T00:00:00.000Z&to=2022-08-23T00:00:00.000Z`,
	{
		headers: {
			Authorization: `Bearer ${config.TOKEN}`,
		},
	}
);

function change(ohlc: Ohlc): void {
	mapPairs(ohlc);
}

function mapPairs(ohlc: Ohlc): void {
	state.pairs = [
		{
			label: 'open',
			value: `$${ohlc.o}`,
		},
		{
			label: 'hight',
			value: `$${ohlc.h}`,
		},
		{
			label: 'low',
			value: `$${ohlc.l}`,
		},
		{
			label: 'close',
			value: `$${ohlc.c}`,
		},
	];
}
</script>

<style lang="scss">
.details {
	width: 100%;
	.graph {
		width: 100%;
	}
}
</style>
