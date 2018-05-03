<template>
  <v-app class="app" dark>
    <v-toolbar>
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text display-2 white--text">Current temperature: 33</div>
      <div class="card elevation-5">
        
      </div>
    </div>
  </v-app>
</template>

<script>
const WebSocket = require('ws')

export default {
  name: 'app',
  components: {
    
  },
  created () {
    var ws = new WebSocket("ws://localhost:3000/data")
    ws.onopen = function (event) {
      console.log('ws open')
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
.content {
  
}
.card {
  height: 300px;
  min-width: 300px;
  margin: auto;
  background-color: white;
}
</style>
