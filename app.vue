<template>
	<div class="wrapper">
		<LemonMarketLogo />
		<LemonMarketSearch :init="route.query.search" />
		<temaplte v-if="!pending && !error && instrument.results.length > 0">
			{{ instrument }}
		</temaplte>
		<div class="error" v-if="error">Keine Daten gefunden</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const config = useRuntimeConfig();

const {
	error,
	pending,
	data: instrument,
} = await useFetch<InstrumentResponse>(
	`https://data.lemon.markets/v1/instruments/?isin=${route.query.search}`,
	{
		headers: {
			Authorization: `Bearer ${config.TOKEN}`,
		},
	}
);
</script>

<style lang="scss">
#__nuxt {
	width: 100%;
	display: flex;
	justify-content: center;
	.wrapper {
		padding: 2rem;
		width: 100%;
		max-width: 80rem;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		.error {
			text-align: center;
			font-size: 2rem;
			color: $ciWhite;
		}
	}
}
</style>
