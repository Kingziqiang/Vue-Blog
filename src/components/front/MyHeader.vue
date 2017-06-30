<template>
<div class="header">
<!-- <img class="title" src="../../assets/img/welcome.png"/> -->
  <div class="catolog">    
    <ul>
      <router-link to='/home' tag="li">博客首页</router-link>
      <router-link to='/articles' tag="li">文章列表</router-link>
      <router-link to='/aboutMe' tag="li">关于我</router-link>
    </ul>

    <div class="search_box">
        <input type="text" placeholder="您要搜索的文章标题"class="search" 
          v-model="search_title" 
          @keyup.enter="search({search_title:search_title})"
          />
        <img src="../../assets/img/search.png" @click="search({search_title:search_title})">
    </div>
  </div>

 <canvas id="canvas" width="100%" height="100%">诶哟 你的浏览器不支持canvas噢~</canvas>

 </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      search_title:''
    }
  },
 mounted(){
      setInterval(draw,40)
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = 680;
      var waves = ["rgba(255, 255, 255, 0.8)","rgba(255, 255, 255, 1)"]
      var i = 0;
      function draw() {
        canvas.width = canvas.width;
        for(var j = waves.length - 1; j >= 0; j--) {
          var offset = i + 2*j * Math.PI * 100;
          ctx.fillStyle = (waves[j]);
          var randomLeft            = (Math.sin(offset/50)  + 1)       / 2 * 30;
          var randomRight           = (Math.sin((offset/50) + 10) + 1) / 2 * 30;
          var randomLeftConstraint  = (Math.sin((offset/60)  + 2)  + 1) / 2 * 60;
          var randomRightConstraint = (Math.sin((offset/60)  + 1)  + 1) / 2 * 60;
 
          ctx.beginPath();
          ctx.moveTo(0, randomLeft + 470);
          ctx.bezierCurveTo(canvas.width / 3, randomLeftConstraint*2+420, canvas.width / 3 * 2, randomRightConstraint*2+420, canvas.width, randomRight + 470);

          ctx.lineTo(canvas.width , canvas.height);
          ctx.lineTo(0, canvas.height);
          ctx.lineTo(0, randomLeft + 100);
          ctx.closePath();
          ctx.fill();
        }
        i = i + 3;
      }
 },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    ...mapActions(["searchArticles"]),
     search:function(params){
      let _this = this;
    this.searchArticles(params)
    .then(function () {
      _this.$router.push('/articles')
    })

  }
  }
 
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped>
.header{
  background-image: url('../../assets/img/bg.png');
  background-repeat: no-repeat;
  background-size:100%; 
  height: 600px;
  display: block;
  width: 100%;
  transition: background-size  2s;
   background-position: center;
   background-color: #fff;
   position: relative;
   overflow: hidden;
}
.title{
  position: absolute;
  display: inline-block;
  width: 450px;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom:0px;
  color: #fff;
  margin:auto;
  opacity: 0.7;
  animation:title1 1s ease-in-out 0ms 1;
}

 @keyframes title1 {
      0%{width:0px;}
      100%{width:450px;}
   } 
   @keyframes title2 {
      0%{width:0px;}
      100%{width:3.5rem;}
   } 

.header:hover{
  background-size:110%;
  background-position: center;
 
}
.catolog{
  width:100%;
  position: fixed;
  top:0px;
  z-index: 10;
  height: 65px;
  line-height:65px;
 display: flex;
 flex-wrap: wrap;
 justify-content: space-between;
  background-color: rgba(255,255,255,0.8);
  box-shadow: 2px 2px 2px #999;
}
.catolog ul{
  list-style: none;
  display:flex;
  justify-content: space-around;
  margin-left:0.4rem;
  padding-bottom: 0px;
}
.header ul li{
   color: #262626;
  margin-left: 60px;
  flex-grow: 0;
  padding-left:10px;
  padding-right:10px;
}

.header ul li:hover{
  color:#8bc34a;
}

.search_box{
  border:2px solid #fff;
  border-radius: 15px;
  position: relative;
  top:50%;
  transform: translateY(-50%);
  float: left;
  height:37px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:0.4rem;
  padding: 0 10px 0 10px;
}
 .search{

  width: 2rem;
  max-width: 310px !important;
  background-color: rgba(255,255,255,0);
}
.search_box img{
  width: 25px;

}
.search_box img:hover{
  opacity:0.6;
}
.router-link-active{
  color:#8bc34a !important;
  border-bottom: 4px solid #8bc34a;
}
@media screen and (max-width: 950px) {
  .catolog{
    justify-content: center;
    align-items: center;
  }
  .catolog ul{
    list-style: none;
    display:flex;
    width: 100%;
    justify-content:space-around;
    margin-left:auto;
  }
  .header ul li{
   color: #262626;
   margin-left: 0.1rem !important;
}
.search_box{
   margin:auto;
}
.search{
  width: 3rem;
 
  max-width: 310px !important;
  background-color: rgba(255,255,255,0);
}
.header{
  height: 4rem;
}
.title{
  width:3.5rem;
  animation:title2 0.8s ease-in-out 0ms 1;
}
}
</style>
