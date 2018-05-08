<template>
  <v-app class="app" dark>
    <v-toolbar>
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text display-2 white--text">Current temperature: {{ lastTemp.temp }}</div>
      <div class="card elevation-5" v-if="false"></div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      lastTemp: {}
    }
  },
  sockets: {
    connect () {
      console.log('connected localhost:3000')
    },
    lasttemp (val) {
      console.log(val)
      this.lastTemp = val
    }
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
