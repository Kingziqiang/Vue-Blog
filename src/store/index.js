import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'


Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
    allTags: [],
    article: {},
    drafts: [],
    draft: {},
    user:{},
    dialog_box:{
    	show:false,
    	tip:'',
    	hasTwobtn:false,
    	resolved:() => {},
    	reject:() => {}
    }
  },
  getters,
  mutations,
  actions
})
export default store
