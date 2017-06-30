<template>
	<div>
		<div class='tags'><span @click="switchTags('全部')">全部</span>
			<span v-for="tag in allTags"
            @click="switchTags(tag)"
      >{{tag}}</span>
		</div>
		<div class='wrapper posts animated fadeIn'>
			<div class="article posts animated fadeIn" v-for = "article in getShortArticles">

        <router-link :to="{ name: 'article', params:{aid: article._id} }" tag="h4">
          {{article.title}}
        </router-link>
        <span class="line"></span>
        <time>{{article.date}}</time>

         <ul class="tag">
          <li v-for = "tag in article.tags">{{tag}}</li>    
        </ul>

			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapState, mapGetters} from 'vuex'
export default {
  data () {
    return {
      limit: 0
    }
  },
  created () {
    this.getAllTags()
    this.getArticles({tag: '全部', limit: this.limit,skip: 0})
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
   width:50%;
   margin:30px auto;
   display:flex;
   flex-wrap: wrap;
   justify-content: center; 
 }
 .tags span{
   background-color:#4078c0;
   margin:20px;
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
   width:55%;
   position: relative;
   justify-content: center;
   flex-direction: column;
   margin:30px auto 90px auto;
   display: flex;
   overflow: hidden;
 } 

 .wrapper .article{
   width: 100%;
   height: 110px;
   margin-top:60px;
   position:relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

 }
  .line{
      flex-grow:1;
      height: 0px;
      border-top:1px solid #ddd;
      width: 100%;
      margin:auto 10px;
    }
 .wrapper .article time{
  color: #777;
  white-space: nowrap;
  } 

  .wrapper .article h4{
    font-size: 22px;
    color:#666;
    white-space: nowrap;
    font-weight: normal;
  }

  .wrapper .article h4:hover{
    color: #8bc34a;
  }

 .tag{
  position: absolute;
  left: 0px;
  bottom: 0px;
  align-self: flex-end;
  display: flex;
  justify-content: flex-start;
  align-items: center;
 }

 .tag li{
    margin-right: 10px;
   border-radius: 17px;
   color: #bbb;
   transition: 1s;
 }
 .tag li:hover{
  color: #8bc34a;
  transform: translateX(10px);
 }
 @media screen and (max-width: 500px) {
  .wrapper{
   width:80% !important;
  }
  .wrapper .article h4{
    font-size: 18px;
  }
  .wrapper .article time{
    font-size: 16px;
  }
  .wrapper .article .tag li{
    font-size: 16px;
  }
  .wrapper .article{

   margin-top:30px;

 }
  .tags{
    width:90%;
    margin: 0px;
  }
  .tags span{
    font-size: 16px;
    padding: 3px 10px;
  }
 }
</style>
