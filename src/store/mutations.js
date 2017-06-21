export default {
  set_articles: (state, articles) => {
    state.articles = articles
  },
  set_all_tags: (state, allTags) => {
    state.allTags = allTags
  },
  set_article: (state,article) => {
  	state.article = article
  },
  set_user: (state,user) => {
    state.user = user
  },
  set_dialog: (state,dialog_box) => {
    state.dialog_box.show = dialog_box.show;
    state.dialog_box.tip = dialog_box.tip;
    state.dialog_box.hasTwobtn = dialog_box.hasTwobtn;
  }
}
