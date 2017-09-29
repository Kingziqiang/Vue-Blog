import marked from 'marked'
marked.setOptions({
  highlight: function (code) {
      return hljs.highlightAuto(code).value
  },
  sanitize: true
})
const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  // return "<h" + level + " id=" + text + level + ">" +text+ "</h"+level+">";
  return `<h${level} id="anchor_${text}_${level}">${text}</h${level}>`
}



export default {
  
  getShortArticles: (state) => {
    const shortArticles = state.articles.map((article) => {
      let newArticle = {...article}
      newArticle.content = newArticle.content.slice(0, 200) + '......';
      return newArticle
    })
    return shortArticles
  },
  getArticleNav (state) {
    let result = [];
    const article = state.markedArticle,
          reg = /<h(\d) id=\"(.+)\">(.+)<\/h\1>/g ;
      article.replace(reg, function (match, level, id, content, offset, string) {
        result.push({level, id, content})
      })
      return result;
  },
}
