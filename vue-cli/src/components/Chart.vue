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
        if(this.data) {
          console.log(this.data)
          var data = {
            labels: this.data.map(a => a.time),
            datasets: [{
              label: 'Temperature',
              backgroundColor: '#f87979',
              data: this.data.map(a => a.temp)
            }]
          }
        }
        return data || null
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

