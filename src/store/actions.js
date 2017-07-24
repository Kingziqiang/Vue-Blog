import Vue from 'vue'
import router from 'vue-router'

export default {
  getArticles: ({commit, state}, payload) => {
    return Vue.http.get('/api/articles', {params: {payload}})
    .then((res) => {
      commit('set_articles', res.data)
    })
    .catch((err) => { console.log(err) })
  },

  getArticle:({commit,state},payload) => {
    return Vue.http.get('/api/article',{params: {payload}})
    .then((res) => {commit('set_article',res.data),console.log(res.data)})
    .catch((err) => {
      console.log('获取article错误')
    })
  },
  
  alterArticle:({commit},payload) => {
    return Vue.http.post('/api/alter',payload)
    .then(() => {console.log("发送请求成功")})
    .catch((err) => {console.log(err)})
  },
  articleToDraft: ({},payload) => {
    return Vue.http.post('/api/articleToDraft',payload)
  },

  getAllTags: ({commit, state}) => {
    return Vue.http.get('/api/tags')
    .then((tags) => {
      commit('set_all_tags', tags.data)
      console.log(tags.data)
    })
    .catch((err) => { console.log(err) })
  },

  login: ({commit}, payload) => {   
      return Vue.http.get('/api/login',{params: {payload}})
             .then((res) => {
                commit('set_user',res.data);
                return res;
              })
  },

  removeArtical: ({},payload) => {
    return Vue.http.post('/api/remove',payload)
  },

  saveArticle:({commit},payload) =>{
    return Vue.http.post('/api/addArticle',payload)
  },

  alterUser: ({commit,state},payload) => {
    payload._id = state.user._id
    return Vue.http.post('/api/alterUser',payload)
           /*.then((res) => {
               console.log("已提交")
            })
           .catch((err) => {console.log(err)})*/
  },

  searchArticles:({commit,state},payload) => {
    console.log(payload)
     return Vue.http.get('/api/searchArticles',{params:{payload}})
      .then((res) => {
          commit('set_articles',res.data);
      })
      .catch((err)=>{console.log(err)})
  },

  getDrafts: ({commit,state},payload) => {
    return Vue.http.get('/api/getDrafts',{params:{payload}})
    .then((drafts) => {
      console.log(drafts.body)
      commit('set_drafts',drafts.body)
    })
    .catch((err) => {console.log(err)})
  },
  getDraft: ({commit,state},payload) => {
    return Vue.http.get('/api/draft',{params: {payload}})
    .then((res) =>{
      commit('set_draft',res.data)
      console.log(res.data)
    })
    .catch((err) => {
      console.log('获取draft错误')
    })
  },
  alterDraft: ({},payload) => {
    return Vue.http.patch('/api/draft',payload)

  },
  dropDraft: ({},_id) => {
    console.log(_id)
    return Vue.http.delete('/api/draft/'+_id)
  },
  postDraft: ({},payload) => {
    return Vue.http.post('/api/postDraft',payload)
  },
  saveDraft: ({},payload) => {
    return Vue.http.post('/api/saveDraft',payload)
  } 

}


