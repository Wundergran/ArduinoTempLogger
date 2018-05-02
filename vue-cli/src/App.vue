<template>
  <v-app class="app" dark>
    <v-toolbar>
      <v-toolbar-title>Arduino Temp Logger</v-toolbar-title>
    </v-toolbar>
    <div class="content">
      <div class="temp-text display-2 white--text">Current temperature: 33</div>
      <div class="card elevation-5">
        <div class="test" v-for="log in temps" :key="log.time"></div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'app',
  firebase: {
    temps: db.ref().child('datalogs')
  },
  components: {
    
  },
  created () {

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
