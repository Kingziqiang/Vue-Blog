<template>
	<div>
		<div class='tags'><span @click="switchTags('全部')">全部</span>
  			<span v-for="tag in allTags"
              @click="switchTags(tag)"
        >{{tag}}</span>
  	</div>
		<div class='wrapper posts animated fadeIn'>
			  <div class="article posts animated fadeIn" v-for = "article in articles">
            <router-link :to="{ name: 'article', params:{aid: article._id} }" tag="h3">
              {{article.title}}
            </router-link>
            <span class="line"></span>
            <time>{{article.date}}</time>

             <ul class="tag">
              <li v-for = "tag in article.tags">{{tag}}</li>    
            </ul>
			  </div>
		</div>
    <div class="loadMore" v-if = "isLoadingMore" >
      <span v-if = "more">下拉加载更多...</span> <span v-if = "!more"> .没有更多文章了哟... (;ﾟДﾟi|!) </span>
    </div>
	</div>
</template>

<script>
import {mapActions, mapState, mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      limit: 10,
      skip:0,
      tag: '全部',
      isLoadingMore: false,
      more: true
    }
  },

  created () {
    this.set_title('Articles');
    this.getAllTags();
    this.getArticles({tag: this.tag, limit: this.limit, skip: 0})
  },

  mounted() {
    window.addEventListener('scroll', this.loadMore, false);
  },

  beforeRouteLeave (to, from, next) {
     window.removeEventListener('scroll', this.loadMore)
     next()
  },

  components: {
  },
  computed: {
    ...mapState(['allTags','articles']),
    ...mapGetters(['getShortArticles'])
  },
  methods: {
    ...mapMutations(['set_title']),
    ...mapActions(['getAllTags', 'getArticles']),
    switchTags (tag) {
      this.tag = tag;
      this.limit = 10;
      this.more = true;
      this.isLoadingMore = false;
      this.getArticles({tag: tag, limit: this.limit})
    },
    loadMore() {      
      if(document.body.scrollHeight - document.body.scrollTop <= window.innerHeight){
          this.isLoadingMore = true;
          if(this.more == true){
              this.getArticles({tag:this.tag, limit: this.limit, skip: (this.skip+=1)*this.limit, isAdd: true})
              .then((articles) => {
                  if(articles.length === 0){
                      this.more = false;
                  }                 
                  this.isLoadingMore = false;               
              })
          }
      }
      
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
 .tags{
    width:50%;
    margin:30px auto;
    display:flex;
    flex-wrap: wrap;
    justify-content: center; 
    span{
        background-color:#4078c0;
        margin:20px;
        padding: 4px 15px;
        border-radius: 15px;
        color: #fff;
        opacity: 0.7;
        transition:1s;
    }
    span:hover{
        opacity: 0.5;
        transform: translate(10px,0);
        transition: 1.5s;
    }
 }
 
.wrapper{
    width:55%;
    position: relative;
    justify-content: center;
    flex-direction: column;
    margin:30px auto 90px auto;
    display: flex;
    overflow: hidden;
    .article{
        width: 100%;
        height: 90px;
        margin-top:40px;
        position:relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        h3{
            color:#2D3E4A;
            white-space: nowrap;
            font-weight: normal;
          /*   font-size: 16px; */
        }
        h3:hover{
            color: #aaa;
        }
        .line{
            flex-grow:1;
            height: 0px;
            border-top:1px solid #ddd;
            width: 100%;
            margin:auto 10px;
        }
        time{
            color: #777;
            white-space: nowrap;
            font-size: 14px;
        }
        .tag{
            position: absolute;
            left: 0px;
            bottom: 0px;
            align-self: flex-end;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            li{
                margin-right: 10px;
                border-radius: 17px;
                color: #bbb;
                transition: 1s;
            }
            li:hover{
                color: #8bc34a;
                transform: translateX(10px);
             } 
        }
        
     }
 } 

 
 @media screen and (max-width: 500px) {
  .wrapper{
      width:80% !important;
    /*   margin: auto; */
      .article{
          margin-top:30px;
          h3{
             font-size: 18px;
          }
      }
      .tags{
          width:90%;
          margin: 0px;
          span{
              font-size: 16px;
              padding: 3px 10px;
          }
      }
  } 
}
</style>
