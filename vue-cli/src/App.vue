<template>
  <v-app class="app" dark>
    <v-toolbar>
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text display-2 white--text">Current temperature: {{ lastTemp.temp }}</div>
      <div class="card elevation-5" v-if="false"></div>
      <chart></chart>
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
      temps: {}
    }
  },
  sockets: {
    connect () {
      console.log('connected localhost:3000')
      this.$socket.emit('listen', { since: '1525755600000' })
    },
    lasttemp (val) {
      console.log(val)
      this.lastTemp = val
    },
    temps (val) {
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
  margin-top: 60px;
}
.card {
  height: 300px;
  min-width: 300px;
  margin: auto;
  background-color: white;
}
</style>
