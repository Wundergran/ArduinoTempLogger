<template>
	<div id="chart">
		<line></line>
	</div>
</template>

<script>
import { Line } from 'vue-chartjs'
	export default {
		props: ['data'],
		mounted () {
			this.renderChart(this.data)
		},
		watch: {
			data (val) {
				this.renderChart(this.data)
			}
		},
		components: {
			Line
		}
	}
</script>

<style scoped>

</style>