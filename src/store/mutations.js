import util from '../util.js'
import marked from 'marked'
import router from '../router'
const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  // 给该标题生成唯一id
  let uniqId = '' + new Date().getTime() + util.random(1, 10000); 
	return `<h${level} id="anchor_${uniqId}_${level}">${text}</h${level}>`;
}
marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});
export default {
  set_articles (state, articles) {
    articles.map(article => {
      article.date = util.formatDate(article.date, '-');
      return article
    })
    state.articles = articles;
  },

  set_marked_article (state, content) {
    state.markedArticle = marked(content, {renderer, renderer})
  },

  set_add_articles (state, articles) {
    if(articles.length !== 0){
        articles.map(article => {
          article.date = util.formatDate(article.date, '-');
          return article
        })
        state.articles=state.articles.concat(articles);
    }
  },

  set_all_tags (state, allTags) {
    state.allTags = allTags
  },

  set_article (state,article) {
    article.date = util.formatDate(article.date, '-');
  	state.article = article
  },

  set_user (state,user) {
    localStorage.setItem('user', user.username)
    state.user = user
  },

  set_dialog (state,dialog_box) {
    state.dialog_box = {
      ...dialog_box
    }    
  },

  set_drafts (state,drafts) {
    drafts.map(draft => {
      draft.date = util.formatDate(draft.date, '-');
      return draft
    })
    state.drafts = drafts
  },

  set_draft (state,draft) {
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

  set_headLine(state, headLine) {
    state.headLine = headLine;
  },

  set_search(state, isShow) {
    if(isShow !== undefined) {state.showSearch  = isShow; return; }
    state.showSearch = !state.showSearch;
  },

  set_alert(state, payload) {
    state.alert = payload;
    setTimeout(() => {
       state.alert.show = false;
    }, payload.delay||2000)
  },

  set_logout(state) {
    state.user = void 0;
    delete localStorage.user;
    router.push({name: 'login'});
  }
}
