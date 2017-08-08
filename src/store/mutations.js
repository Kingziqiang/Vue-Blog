import util from '../util.js'
export default {
  set_articles: (state, articles) => {
    articles.map(article => {
      article.date = util.formatDate(article.date, '-');
      return article
    })
    state.articles = articles;
  },

  set_add_articles: (state, articles) => {
    if(articles.length !== 0){
        articles.map(article => {
          article.date = util.formatDate(article.date, '-');
          return article
        })
        state.articles=state.articles.concat(articles);
    }
  },

  set_all_tags: (state, allTags) => {
    state.allTags = allTags
  },

  set_article: (state,article) => {
    article.date = util.formatDate(article.date, '-');
  	state.article = article
  },

  set_user: (state,user) => {
    localStorage.setItem('user', user.username)
    state.user = user
  },

  set_dialog: (state,dialog_box) => {
    state.dialog_box = {
      ...dialog_box
    }    
  },

  set_drafts: (state,drafts) => {
    drafts.map(draft => {
      draft.date = util.formatDate(draft.date, '-');
      return draft
    })
    state.drafts = drafts
  },

  set_draft: (state,draft) => {
    draft.date = util.formatDate(draft.date, '-');
    state.draft = draft
  },

  set_comments(state,comments) {
    comments.map(comment => {
      comment.date = util.formatDate(comment.date, '.');
      return comment
    })
    state.comments = comments;
  },

  set_loading(state, isLoading) {
    state.isLoading = isLoading
  },

  set_title(state, title) {
    state.title = title;
  }
}
