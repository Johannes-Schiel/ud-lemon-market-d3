<template>
	<ResultDetailName :name="name" />
	<div class="details">
		<ResultDetailsPair v-for="pair in pairs" :pair="pair" />
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { LabelValuePair } from '../interfaces/LabelValuePair.interface';
import { ResultName } from '../interfaces/ResultName.interface';

export default {
	props: {
		pairs: {
			type: Array as PropType<LabelValuePair[]>,
			required: true,
		},
		name: {
			type: Object as PropType<ResultName>,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.details {
	display: grid;
	grid-gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	width: 100%;
	margin: 2rem 0 2rem 0;
}
</style>
