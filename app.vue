<template>
	<div class="wrapper">
		<LemonMarketLogo />
		<LemonMarketSearch :init="route.query.search" />
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
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
