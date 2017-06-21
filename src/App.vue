<template>
  <div id="app">
    <router-view></router-view>
   <dialog-box></dialog-box>
  </div>
</template>

<script>
import DialogBox from './components/DialogBox.vue'

export default {
	components:{
		DialogBox
	}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}


</style>
