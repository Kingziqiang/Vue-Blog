
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
      let newArticle = {...article}
      newArticle.content = newArticle.content.slice(0, 200) + '......';
      return newArticle
    })
    return shortArticles
  },
  slideUp() {
      const body = document.querySelector("body");
      setTimeout(function up() {      
          body.scrollTop -= 200;
          if(body.scrollTop>200){
            setTimeout(up,20)
          }       
  },20)
  
}
}
