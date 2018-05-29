<template>
  <v-app class="app">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text-container display-3" v-if="lastTemp.temp">
        <div class="temp-text">It is currently&nbsp;</div>
        <div class="temp">{{ lastTemp.temp }}°C&nbsp;</div>
        <div class="temp-text">in the office</div>
      </div>
      <div class="card elevation-2">
        <chart :data="temps" v-if="temps"></chart>
      </div>
    </div>
  </v-app>
</template>

<script>
import Chart from './components/Chart.vue'
export default {
  name: 'app',
  data () {
    return {
      lastTemp: {},
      temps: null
    }
  },
  sockets: {
    connect () {
      console.log('connected localhost:3000')
      var today = new Date()
      var yesterday = today - 86400000 // One day in millis: 86400000

      this.$socket.emit('listen', { since: yesterday })
    },
    lasttemp (val) {
      console.log(val)
      this.lastTemp = val
    },
    temps (val) {
      console.log(val)
      this.temps = val
    }
  },
  components: {
    Chart
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500');

.app {
  background-color: #FAFAFA;
}
.content {
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 24px;
}
.temp-text-container {
  display: flex;
  flex-direction: row;
  text-align: start;
  color: black;
  font-weight: 100;
}
.temp-text-container .temp-text {
  opacity: 0.5;
}
.temp {
  color: #3F51B5;
  opacity: 1;
}
.card {
  min-width: 300px;
  padding: 16px;
  background-color: white;
  border-radius: 3px;
}
</style>
