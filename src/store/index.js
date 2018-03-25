import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    headLine:{
      text: '',
      animate: ''
    },
    showSearch: false,
    articles: [],
    allTags: [],
    article: {},
    markedArticle:'',
    comments:[],
    drafts: [],
    draft: {},
    user:{
      username: '',
      status: false
    },
    isLoading: false,
    dialog_box:{
    	show:false,
    	tip:'',
    	hasTwobtn:false,
    	resolved() {this.show = false },
    	reject() {this.show = false}
    },
    alert: {
      show: false,
      text: ''
    }
  },
  getters,
  mutations,
  actions
})
export default store;
