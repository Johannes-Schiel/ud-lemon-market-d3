<template>
	<template v-if="!pending && !error">
		<LemonMarketChartOhlc
			:ohlc="
				state.currentOhlc || data.results[data.results.length - 1]
			" />
		<div class="graph">
			<LemonMarketChartGraph
				@userSelection="change($event)"
				:data="data.results" />
		</div>
	</template>
</template>

<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig();
const state = reactive({ currentOhlc: null });

const to = new Date();
const from = new Date(new Date().setDate(to.getDate() - 55));

const { data, pending, error } = await useFetch<OhlcResponse>(
	`https://data.lemon.markets/v1/ohlc/d1?isin=${
		route.query.search
	}&from=${from.toISOString()}&to=${to.toISOString()}`,
	{
		headers: {
			Authorization: `Bearer ${config.TOKEN}`,
		},
	}
);

function change(ohlc: Ohlc): void {
	state.currentOhlc = ohlc;
}
</script>

<style lang="scss">
.graph {
	width: 100%;
}
</style>
