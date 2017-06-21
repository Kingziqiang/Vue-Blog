<template>
	<div class="container">
   <!--  <section id="welcome">
     Welcome to my blog
   </section> -->
		<section class="newArticles">
			<div class="article" v-for="article in getShortArticles">

        <div class="box">
        <div class="art_header">
  			  <h3>{{article.title}}</h3>
          <time>{{article.date}}</time>
        </div>
          <p>{{article.content}}</p>
         <div class="art_footer"> 
            <div class="tags">
            in
              <span v-for="tag in article.tags">{{tag}}</span>
            </div>
            <router-link :to="{ name: 'article', params:{aid: article._id} }" class="detail">read more>></router-link>
        </div> 
  			</div>
        
      </div>
		</section>
	</div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
  data () {
    return {
      limit: 5
    }
  },
  created () {
    this.getArticles({limit: this.limit})
    console.log(document.getElementById('welcome'))/*.style.height =  document.body.clientHeight + 'px'*/
  },
  components: {
  },
  computed: {
    ...mapGetters(['getShortArticles'])
  },
  methods: {
    ...mapActions(['getArticles'])
  }
}
</script>

<style rel="stylesheet/scss" scoped>
*{
  margin:0px;
  padding: 0px;
}
.container{
  width: 100%;
  height: 100%;
  position: relative;
  border: none;
  background-color: #fff;
  margin-top:70px;
}

.newArticles{
  display: flex;
  flex-direction: column;
  justify-content: center;
	width: 60%;
  position: relative;
  margin: 20px auto;
  color:rgba(0,0,0,0.54)
}
.article{
  width: 100%;
  background-color: #fff;
  margin-top:30px;
  border: 7px solid #fff;
  border-radius: 3px;
  position: relative;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); 
}
.article:hover{
  box-shadow:  0 2px 2px 0 rgba(0,0,0,0.4), 0 3px 1px -2px rgba(0,0,0,0.4), 0 1px 5px 0 rgba(0,0,0,0.12); 
}
.box{
  width: 94%;
  min-height: 250px;
  display: block;
  position: relative;
  margin:0 auto;
}

 .art_header{
  position: relative;
  display: block;
  width: 100%;
  height: auto;
  overflow: hidden;
 }
 .article h3{
   font-weight: normal;
   height: 60px;
   line-height: 60px;
   margin-top: 20px;
   float: left;
   display: inline-block;
  color: #000;
  }
time{
  position: relative;
  right: 0px;
  display: inline-block;
  float: right;
  margin-top: 30px;
}
.article p{
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: left;
  position: relative;
  display: block;
  padding-bottom:100px;
}
.art_footer{
  padding-top: 10px;
  border-top:1px solid #eee;
  width: 100%;
  height: 30px;
  line-height: 30px;
  display: block;
  position: absolute;
  bottom: 0px;
}
.article .tags{
  position: relative;
  float: left;

}
.article .tags span{            
  margin-left:10px;
  display: inline-block;
  transition: 1s;
   color: #8bc34a;
}
.tags span:hover{
  transform: translateX(10px);
}

.detail{
 float: right;
 color:#262626;
  padding: 3px 6px;
}
.detail:hover{
    background-color: #ebebeb;
}
</style>
