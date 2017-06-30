
var moment = require("moment");
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

export default {
  
  getShortArticles: (state) => {
    const shortArticles = state.articles.map((article) => {
      let newArticle = {}
      for (let i in article) { newArticle[i] = article[i] }
      newArticle.content = newArticle.content.slice(0, 200) + '......';
  	  newArticle.date = moment().format("YYYY-MM-DD")
      return newArticle
    })
    return shortArticles
  },
  getFormArticle:(state) =>{
    let formArticle = {}
    for(let i in state.article){
      formArticle[i] = state.article[i]
    }
    formArticle.date = moment(formArticle.date).format("YYYY-MM-DD");
    formArticle.content = marked(formArticle.content);
    return formArticle;
  }
}
