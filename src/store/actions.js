import Vue from 'vue'
import router from 'vue-router'

export default {
  getArticles({commit, state}, payload) {
    if(typeof payload.isAdd == 'undefined'){
        commit('set_loading', true);
        return Vue.http.get('/api/articles', {params: {payload}})
        .then((res) => {
             commit('set_articles', res.data);
              commit('set_loading', false);       
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
      commit('set_article', res.data);
      commit('set_loading', false);
    })
    .catch((err) => {
      console.log('获取article错误')
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
    .then((tags) => {
      commit('set_all_tags', tags.data)
      console.log(tags.data)
    })
    .catch((err) => { console.log(err) })
  },

  login({commit}, payload) {   
      return Vue.http.get('/api/login',{params: {payload}})
             .then((res) => {
                commit('set_user',res.data);
                return res;
              })
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
    console.log(payload)
     return Vue.http.get('/api/searchArticles',{params:{payload}})
      .then((res) => {
          commit('set_articles',res.data);
      })
      .catch((err)=>{console.log(err)})
  },

  getDrafts({commit,state},payload) {
    return Vue.http.get('/api/getDrafts',{params:{payload}})
    .then((drafts) => {
      console.log(drafts.body)
      commit('set_drafts',drafts.body)
    })
    .catch((err) => {console.log(err)})
  },
  getDraft({commit,state},payload) {
    return Vue.http.get('/api/draft',{params: {payload}})
          .then((res) =>{
            commit('set_draft',res.data)
            console.log(res.data)
          })
          .catch((err) => {
            console.log('获取draft错误')
          })
  },
  alterDraft({},payload) {
    return Vue.http.patch('/api/draft',payload)
  },
  dropDraft({},_id) {
    console.log(_id)
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
            console.log(res.body)
          })
          .catch(err => console.log(err))
  },
  subAgree({}, payload) {
    return Vue.http.post('/api/agree', payload)
          .then(() => {
            console.log("点赞成功")
          })
          .catch(err => console(err))
  }

}


