<template>
	<template v-if="!pending && !error">
		<LemonMarketChartOhlc :ohlc="state.currentOhlc || data.results[0]" />
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

const { data, pending, error } = await useFetch<OhlcResponse>(
	`https://data.lemon.markets/v1/ohlc/d1?isin=${route.query.search}&from=2022-06-15T00:00:00.000Z&to=2022-07-30T00:00:00.000Z`,
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
