<template>
	<div>
		<div class='tags'><span @click="switchTags('全部')">全部</span>
			<span v-for="tag in allTags"
            @click="switchTags(tag)"
      >{{tag}}</span>
		</div>
		<div class='wrapper'>
			<div class="article" v-for = "article in getShortArticles">
        <time><!-- <img src="../assets/img/articles.png"> -->{{article.date}}</time>
         <ul class="tag">
          <li v-for = "tag in article.tags">{{tag}}</li>    
        </ul>
  			<router-link :to="{ name: 'article', params:{aid: article._id} }">
          <h4>{{article.title}}</h4>
        </router-link>
				
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  data () {
    return {
      limit: 5
    }
  },
  created () {
    this.getAllTags()
    this.getArticles({tag: '全部', limit: this.limit})
  },
  components: {
  },
  computed: {
    ...mapState(['allTags']),
    ...mapGetters(['getShortArticles'])
  },
  methods: {
    ...mapActions(['getAllTags', 'getArticles']),
    switchTags (tag) {
      this.getArticles({tag: tag, limit: this.limit})
    }
  }
}
</script>
<style rel="stylesheet/scss" scoped>
 .tags{
   width:60%;
   margin:30px auto;
   display:flex;
   justify-content: center; 
 }
 .tags span{
   background-color:#4078c0;
   margin:30px;
   padding: 5px 15px;
   border-radius: 15px;
   color: #fff;
   opacity: 0.7;
   transition:1s;
 }
 .tags span:hover{
   opacity: 0.5;
   transform: translate(10px,0);
   transition: 1.5s;
 }
.wrapper{
   width:50%;
   position: relative;
   justify-content: center;
   flex-direction: column;
   margin:30px auto;
   display: flex;
 } 

 .wrapper .article{
   width: 100%;
   height: 80px;
   margin:40px;
   position:relative;
   border-bottom: 1px solid #ddd;
 }

 .wrapper .article time{
  float: left;
  color: #bbb;
  } 

  time img{
    width: 20px;
    margin-right: 20px;
  }

  .wrapper .article h4{
    font-size: 28px;
    position: absolute;
    bottom: 15px;
    color:#444;
  }

  .wrapper .article h4:hover{
    color: #3f86b5;
  }

 .tag{
  align-self: flex-end;
  display: flex;
  justify-content: flex-start;
  align-items: center;
   float: right;

 }

 .tag li{
  margin-left: 30px;
  /*  border:1px solid #8bc34a; */
   border-radius: 17px;
   color: #bbb;
 }
 .tag li:hover{
  color: #8bc34a;
 }
 /* 
 */
 /*  
 
  .wrapper .article time{
 
  }  */
 /*
  */
 /* .detail{
 background-color: #999;
 color: #fff;
 padding: 5px 10px;
 position: relative;
 border-radius: 5px;
 float: right;
 display: inline-block;
 margin:20px 20px 20px auto;
 } */
</style>
