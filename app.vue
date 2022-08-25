<template>
	<div class="wrapper">
		<LemonMarketLogo />
		<LemonMarketSearch :init="route.query.search" />
		<div v-if="!pending && !error">
			<LemonMarketInstrument :instrument="instrument.results[0]" />
		</div>
		<div class="error" v-if="error"> Keine Daten gefunden </div>
		<LemonMarketChart />
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig();
const {
	data: instrument,
	pending,
	error,
} = await useFetch<InstrumentResponse>(
	`https://data.lemon.markets/v1/instruments/?isin=${route.query.search}`,
	{
		headers: {
			Authorization: `Bearer ${config.TOKEN}`,
		},
	}
);

function mapDetails(instrument: Instrument): LabelValuePair[] {
	return [
		{
			label: 'isin',
			value: instrument.isin,
		},
		{
			label: 'symbol',
			value: instrument.symbol,
		},
		{
			label: 'wkn',
			value: instrument.wkn,
		},
		{
			label: 'type',
			value: instrument.type,
		},
	];
}
</script>

<style lang="scss">
#__nuxt {
	width: 100%;
	.wrapper {
		padding: 2rem;
		width: 100%;
		display: flex;
		flex-direction: column;
		.error {
			text-align: center;
			font-size: 2rem;
			color: $ciWhite;
		}
	}
}
</style>
