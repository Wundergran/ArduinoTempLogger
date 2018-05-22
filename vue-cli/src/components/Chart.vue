<template>
  <div class="container">
    <line-chart class="chart"
      :chart-data="computedData" 
      :options="options"
      :height="700"
      :width="1200">
    </line-chart>
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
          responsive: false
        }
      }
    },
    methods: {
      getDateStrFor (time) {
        var date = new Date(time)
        return date.toLocaleTimeString()
      }
    },
    computed: {
      computedData () {
        if (this.data) {
          var data = {
            labels: this.data.map(a => this.getDateStrFor(a.time)),
            datasets: [{
              label: 'Temperature',
              backgroundColor: '#3F51B5',
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

</style>

