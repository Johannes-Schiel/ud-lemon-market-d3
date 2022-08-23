<template>
	<div class="detail-value">
		<ResultDetailLabel>{{ pair.label }}</ResultDetailLabel>
		<ResultDetailValue>{{ pair.value }}</ResultDetailValue>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
	props: {
		pair: {
			type: Object as PropType<LabelValuePair>,
			required: true,
		},
	},
};
</script>

<style lang="scss">
.detail-value {
	display: flex;
	flex-direction: column;
	.value {
		font-size: 1.6rem;
		color: $ciWhite;
	}
}
</style>
