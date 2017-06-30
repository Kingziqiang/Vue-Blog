<template>
  <div id="app">
    <router-view></router-view>
    <transition name="fade">
       <dialog-box></dialog-box>
   </transition>
  </div>
</template>

<script>
import DialogBox from './components/common/DialogBox.vue'

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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
