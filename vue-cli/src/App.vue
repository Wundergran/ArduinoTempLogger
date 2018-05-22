<template>
  <v-app class="app">
    <v-toolbar>
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text display-3">The temperature is now {{ lastTemp.temp }}c</div>
      <div class="card elevation-5">
        <chart :data="temps"></chart>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.temp-text {
  text-align: start;
  color: #424242;
}
.card {
  min-width: 300px;
  padding: 16px;
  background-color: #ECEFF1;
}
</style>
