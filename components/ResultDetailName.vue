<template>
	<div class="titel-name">
		<ResultDetailLabel>Name</ResultDetailLabel>
		<ResultDetailValue>{{ name.title }}</ResultDetailValue>
		<ResultDetailValue class="small">{{ name.name }}</ResultDetailValue>
	</div>
</template>

<script lang="ts">
import { PropType } from 'vue';

export default {
	props: {
		name: {
			type: Object as PropType<ResultName>,
			required: true,
		},
	},
};
</script>

<style lang="scss" scoped>
p.small {
	font-size: 1.2rem;
}
</style>
