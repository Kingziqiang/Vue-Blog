export default {
  getShortArticles: (state) => {
    const shortArticles = state.articles.map((article) => {
      let newArticle = {}
      for (let i in article) { newArticle[i] = article[i] }
      newArticle.content = newArticle.content.slice(0, 200) + '......'
      return newArticle
    })
    return shortArticles
  }
}
