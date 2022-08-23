<template>
	<div class="wrapper">
		<Logo />
		<SearchForm />
		<ResultDetails
			:name="{
				name: 'COINBASE GLB.CL.A -,00001',
				titel: 'COINBASE GLOBAL INC',
			}"
			:pairs="pairs" />
		<CandleChart />
	</div>
</template>

<script lang="ts">
export default {
	data() {
		return {
			pairs: [
				{ label: 'isin', value: 'US19260Q1076' },
				{ label: 'symbol', value: '1QZ' },
				{ label: 'wks', value: 'A2QP7J' },
				{ label: 'type', value: 'stock' },
			],
		};
	},
};
</script>

<style lang="scss">
.wrapper {
	padding: 2rem;
}
</style>
