<script>
import Vue from 'vue'
import VueChartJs from 'vue-chartjs'
Vue.component('chart', {
  name: 'Chart',
	props:['data'],
  extends: VueChartJs.Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
})
</script>