<template>
  <div id="app">
    <top></top>
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
import top from './components/Head.vue'
import bottom from './components/Foot.vue'
// import modal from './components/modal/modal.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  components: { top ,bottom}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
