export default {
  set_articles: (state, articles) => {
    state.articles = articles;
  },
  set_all_tags: (state, allTags) => {
    state.allTags = allTags
  },
  set_article: (state,article) => {
  	state.article = article
  },
  set_user: (state,user) => {
    localStorage.setItem('name', user.username)
    state.user = user
  },
  set_dialog: (state,dialog_box) => {
    state.dialog_box = {
      ...dialog_box
    }    
  }
}
