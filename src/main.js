// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import VueResource from 'vue-resource'
import './assets/css/index.scss'

Vue.config.productionTip = false
Vue.config.devtools = true;

Vue.use(Vuex)
Vue.use(VueResource)


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})


Vue.directive('scrollShow', {
  bind: el => {
    window.addEventListener('scroll', () => {
        let actualTop = el.offsetTop,
            current = el.offsetParent;
        while(current != null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        if(actualTop - document.body.scrollTop < 300){
            el.classList.add("show");
        }
    });
  }
})

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})
