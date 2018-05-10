<template>
  <div class="container">
    <line-chart :chart-data="computedData" :options="options"></line-chart>
  </div>
</template>
<script>
import LineChart from '../LineChart.js'
export default {
    components: {
      LineChart
    },
    props: ['data'],
    data () {
      return {
        options: {
          responsive: true
        }
      }
    },
    computed: {
      computedData () {
        var data = {
          labels: this.data.map(a => a.time),
          datasets: [{
            label: 'Temperature',
            backgroundColor: '#f87979',
            data: this.data.map(a => a.temp)
          }]
        }
        console.log(data.datasets)
        return data
      }
    }
  }
</script>
<style scoped>
  .container {
    max-height: 500px;
    max-width: 50%;
  }
</style>

