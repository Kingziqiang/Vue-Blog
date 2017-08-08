<template>
  <div class="container">
		<section class="Articles posts animated fadeIn" >
      <p class="new">New</p>
			<div class="article" v-for="article in getShortArticles" >
          <div class="box" >
              <div class="art_header">
                <router-link :to="{ name: 'article', params:{aid: article._id} }" tag='h3'>{{article.title}}</router-link>
                <time>{{article.date}}</time>
              </div>
              <p>{{article.content}}</p>
              <div class="art_footer"> 
                <div class="tags">
                 in
                  <span v-for="tag in article.tags">{{tag}}</span>
                </div>
                <router-link :to="{ name: 'article', params:{aid: article._id} }" class="detail">more...</router-link>
              </div> 
  			   </div>       
      </div>
		</section>
	</div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data () {
    return {
      limit: 5
    }
  },
  created () {
    this.set_title('Welcome to my blog')
    this.getArticles({limit: this.limit,skip: 0})
  },
  components: {
  },
  computed: {
    ...mapGetters(['getShortArticles'])
  },
  methods: {
    ...mapActions(['getArticles']),
    ...mapMutations(['set_title'])
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.container{
  width: 100%;
  height: 100%;
  position: relative;
  border: none;
  margin-top:70px;
  z-index:2;
  .new{
    background-color: #acc0d7;
    width: 65px;
    height: 65px;
    display: inline-block;
    line-height: 65px;
    text-align: center;
    color: #fff; 
    border-radius: 65%;
    font-weight: bold;
    transform: rotate(-25deg);
  }
}

.Articles{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  	width: 63%;
    min-height:400px;
    position: relative;
    margin: 20px auto;
    color:rgba(0,0,0,0.54);
    .article{
        width: 100%;
        transition:0.2s;
        margin:30px auto auto auto;
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
        min-height: 100px;
        display: block;
        position: relative;
        margin:0 auto;
        
        .art_header{
            position: relative;
            display: block;
            width: 100%;
            height: auto;
            overflow: hidden;
            h3{
               font-weight: normal;
               margin-top: 20px;
               padding: 10px 0px;
               float: left;
               display: inline-block;
               color: #333;
               cursor: pointer;
            }
            time{
                position: relative;
                right: 0px;
                display: inline-block;
                float: right;
                margin-top: 30px;
            }
         }
         p{
            width: 100%;
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: left;
            position: relative;
            display: block;
            padding-bottom:70px;
            font-size:14px;

          }
         .art_footer{
            padding-top: 10px;
            border-top:1px solid #eee;
            width: 100%;
            height: 25px;
            line-height: 25px;
            display: block;
            position: absolute;
            bottom: 0px;
            font-size:14px;
              .tags{
                  position: relative;
                  float: left;
                  span{            
                    margin-left:10px;
                    display: inline-block;
                    transition: 1s;
                     color: #ff4081;
                  }
                  span:hover{
                    transform: translateX(10px);
                  }
              }
              .detail{
               float: right;
               color:#3f51b5;
                padding: 3px 9px;
                background-color: #f5f5f5;
                text-decoration: none;
                transition: 1s;
              }
              .detail:hover{
                 background-color: #e5e5e5;
              }
          }
    }

}




 


@media screen and (max-width: 450px) {
  .newArticles {
    width:83%;
  }
}

</style>
