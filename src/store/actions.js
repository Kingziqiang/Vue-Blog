import Vue from 'vue'
import router from 'vue-router'

export default {
  getArticles({commit, state}, payload) {
    if(typeof payload.isAdd == 'undefined'){
        // commit('set_loading', true);
        return Vue.http.get('/api/articles', {params: {payload}})
        .then((res) => {
            commit('set_articles', res.data);
            // commit('set_loading', false);
            return res.data;       
        })
        .catch((err) => { console.log(err) })
    }
    else{
        return Vue.http.get('/api/articles', {params: {payload}})
        .then((res) => {           
            commit('set_add_articles', res.data);
            return res.data
        })
        .catch((err) => { console.log(err) })
    }
     
  },

  getArticle({commit,state},payload) {
    commit('set_loading', true);
    return Vue.http.get('/api/article',{params: {payload}})
    .then((res) => {
      commit('set_loading', false);
      commit('set_article', res.data);
      commit('set_marked_article', res.data.content);      
    })
    .catch((err) => {
      console.log(err)
    })
  },  
  
  alterArticle({commit},payload) {
    return Vue.http.post('/api/alter',payload)
    .then(() => {console.log("发送请求成功")})
    .catch((err) => {console.log(err)})
  },

  articleToDraft({},payload) {
    return Vue.http.post('/api/articleToDraft',payload)
  },

  getAllTags({commit, state}) {
    return Vue.http.get('/api/tags')
    .then((res) => {
    res.data.unshift('全部')  
      commit('set_all_tags', res.data)
    })
    .catch((err) => { console.log(err) })
  },

  login({commit}, payload) {   
    return Vue.http.get('/api/login',{params: {payload}})
  },

  removeArtical({},payload) {
    return Vue.http.post('/api/remove',payload)
  },

  saveArticle({commit},payload) {
    return Vue.http.post('/api/addArticle',payload)
  },

  alterUser({commit,state},payload) {
    return Vue.http.post('/api/alterUser',payload)
    .then(()=>{
      commit('set_user', payload)
    })
  },

  searchArticles({commit,state},payload) {
     return Vue.http.get('/api/searchArticles',{params:payload})
      .then((res) => {
         commit('set_articles',res.data);
      })
  },
  
  getDrafts({commit,state},payload) {
    return Vue.http.get('/api/getDrafts',{params:{payload}})
    .then((drafts) => {
      commit('set_drafts',drafts.body)
    })
    .catch((err) => {console.log(err)})
  },

  getDraft({commit,state},payload) {
    return Vue.http.get('/api/draft',{params: {payload}})
      .then((res) =>{
        commit('set_draft',res.data)
        })
      .catch((err) => {
      })
  },

  alterDraft({},payload) {
    return Vue.http.patch('/api/draft',payload)
  },

  dropDraft({},_id) {
    return Vue.http.delete('/api/draft/'+_id)
  },

  postDraft({},payload) {
    return Vue.http.post('/api/postDraft',payload)
  },

  saveDraft({},payload) {
    return Vue.http.post('/api/saveDraft',payload)
  },

  submitComment({dispatch, commit}, payload){
    return Vue.http.put('/api/comment',payload)
      .then(() => dispatch('getComments',{aid: payload.aid}) )
      .catch(err => console.log(err))  
  },

  getComments({commit}, payload) {
    return Vue.http.get('/api/comment/'+payload.aid)
      .then(res => {
         commit('set_comments', res.body);
      })
      .catch(err => console.log(err))
  },

  subAgree({}, payload) {
    return Vue.http.post('/api/agree', payload)
      .catch(err => console(err))
  },

  contact({}, payload) {
    return Vue.http.post('/api/contact', payload)
    .catch( err => console.log(err))
  }

}


