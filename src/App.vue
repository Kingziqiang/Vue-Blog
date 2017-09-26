<template>
  <div id="app">
    <router-view></router-view>
    <transition name="fade"> <dialog-box></dialog-box>
    </transition>
    <div v-show="isShow" id="up" @click="slideUp()"></div>
    <loading></loading>
  </div>
</template>

<script>
import DialogBox from './components/common/DialogBox.vue'
import Loading from './components/common/Loading.vue'
import util from './util.js'
import SmoothScroll from 'smooth-scroll' 

export default {
	components:{
		DialogBox,
    Loading,
	},
  data(){
    return {
      isShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleShow, false)
  },
  methods: {
    slideUp() {
      var scroll = new SmoothScroll();
      var anchor = document.querySelector( '#app' );
      scroll.animateScroll( anchor );
    },
    handleShow() {
      if(document.querySelector("html").scrollTop > 400){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    }
  }

}
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
#app {
  text-align: center;
  height: 100%;
  position: relative;
  width:100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
#up{
  position: fixed;
  bottom: 0.2rem;
  right: 0.2rem;
  width: 0.15rem;
  height:0.15rem;
  min-height: 30px;
  min-width:30px;
  border-radius: 50%;
  background-color: #3f86b5;
  z-index: 50;
}
#up:hover{
  opacity: 0.8;
}
#up::before{
  content:'';
  position: absolute;
  top:0px;
  bottom:0px;
  left: 0px;
  right:0px;
  margin:auto;
  width: 25%;
  height:25%;
  border-top: 4px solid #fff;
  border-left: 4px solid #fff;
  border-radius:4px;
  transform: rotate(45deg);
}
</style>
