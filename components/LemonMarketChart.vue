<template>
	<template v-if="!pending && !error">
		<LemonMarketChartOhlc
			:ohlc="
				state.currentOhlc || data.results[data.results.length - 1]
			" />
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
</script>

<style lang="scss"></style>
