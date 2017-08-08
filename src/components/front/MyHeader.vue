<template>
    <div class="header"> 
        <div class = "shadow"></div>
        <div class="catolog" :class="{nav: isShow}">    
            <div class="search_box">
                <input type="text" placeholder="请输入文章标题"class="search" 
                  v-model="search_title" 
                  @keyup.enter="search({search_title:search_title})"
                  />
                <img src="../../assets/img/search.png" @click="search({search_title:search_title})">
            </div>
        <ul >
            <router-link to='/home' tag="li">Home</router-link>
            <router-link to='/articles' tag="li">Articles</router-link>
            <router-link to='/aboutMe' tag="li">About</router-link>
            <li>Contract</li>
        </ul>
        </div>
        <span class="title">{{title}}</span>
        <canvas id="wave" >你的浏览器好像不支持canvas(⊙o⊙)哦，换个浏览器试试吧~</canvas>
     </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      search_title:'',
      isShow: false
    }
  },
  computed: {
    ...mapState(['title'])
  },

  mounted() {
    this.paintWave();
    window.addEventListener('scroll', this.handleShow, false); // 监听滚动处理导航栏是否出现
    const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';  
    window.addEventListener(resizeEvent, this.paintWave, false); // 监听窗口resize事件，重绘波浪
  },

  beforeRouteLeave (to, from, next) {
     window.removeEventListener('scroll', this.paintWave);
     const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
     window.removeEventListener('resizeEvent', this.paintWave);
     next()
  },

  methods:{
    ...mapActions(["searchArticles"]),
     search(params) {
        let _this = this;
        this.searchArticles(params)
        .then(function () {
          _this.$router.push('/articles')
        })
    },
    handleShow() {
      if(document.querySelector("body").scrollTop > 300){
        this.isShow = true;
      }else{
        this.isShow = false;
      }
    },
    paintWave() {
        const canvas  = document.querySelector("#wave"),
              width   = canvas.width  = window.innerWidth,
              height  = canvas.height = document.querySelector('.header').offsetHeight,

              offset  = [40,40],  // 波浪偏移距离
              waves   = ["rgba(255,255,255,1)","rgba(255,255,255,.5)"], // 波浪颜
              context = canvas.getContext('2d');
        let count = 0;    
        function loop(){
            context.clearRect(0,0, width, height);
            count ++;       
            for(let i = 0; i < waves.length; i++){
              const startY = height*4/5 + offset[i] * Math.sin(Math.PI*count/96 + Math.PI*i/2),
                    cpx1   = width/3,
                    cpy1   = height*4/5 + offset[i] * Math.sin(Math.PI*count/96 + Math.PI*i/2 + Math.PI/2),
                    cpx2   = width*2/3,
                    cpy2   = height*4/5 + offset[i] * Math.sin(Math.PI*count/96 + Math.PI*i/2 + 2*Math.PI/2),           
                    endY   = height*4/5 + offset[i] * Math.sin(Math.PI*count/96 + Math.PI*i/2 + 3*Math.PI/2);
              context.save()
              context.beginPath();
              context.moveTo(0,startY);
              context.bezierCurveTo(cpx1,cpy1,cpx2,cpy2,width,endY );
              context.lineTo(width,height);
              context.lineTo(0,height);
              context.lineTo(0,0)
              context.fillStyle=waves[i];
              context.closePath();
              context.fill();
              context.restore();
            }    
           requestAnimationFrame(loop)
        } 
      requestAnimationFrame(loop)
    },
  }
 
}


</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.header{
    background-image: url('../../assets/img/bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100% ;
    background-color: #000;
    height: 450px;
    display: block;
    width: 100%;
    background-position:center 0px;
    position: relative;
    overflow: hidden;


}
.shadow{
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,.3);
  z-index: 1;
  top: 0px;
  left: 0px;
}
.title{
  position: relative;
  margin:auto;
  top:45%;
  z-index: 3; 
  transform: translate(0, -50%);
  display: inline-block;
  font-size: 0.11rem;
  padding: 10px 0px;
   background:linear-gradient(to right,#fff,#acc0d7 25%,#fff 50%,#acc0d7 75%,#fff);
  background-clip : text;
  -webkit-background-clip: text;
  color:transparent;
  background-size:200% 100%;
  animation: flowlight 1s linear infinite, changeWidth 500ms ease-in-out 0ms 1;
  &::before, &::after{
    content:'';
    width: 85%;
    height: 1px;
    background-color: #fff;
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
  }
  &::after{
    bottom: 0px;
    top: auto;
  }

}
@keyframes changeWidth {
  0%{
    font-size: 0px;
  }
  100%{
    font-size: 0.11rem
  }
} 
@keyframes flowlight {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0; /*  background-position属性百分比计算公式，（容器宽度-背景宽度）*百分比=××px; */
  }
}

.search_box{
    border:1px solid #eee;
    border-radius: 4px;
    position: relative;
    top:50%;
    transform: translateY(-50%);
    float: left;
    height:37px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left:0.4rem;
    padding: 0 10px 0 10px;
    .search{
        width: 2rem;
        max-width: 210px !important;
        background-color: rgba(255,255,255,0);
        &::placeholder{
          color:rgba(255,255,255,.6);
        }
    }
    img{
       width: 25px;
    }
    img:hover{
      opacity:0.6;
    }
}
.catolog{
    width:100%;
    position: fixed;
    top:0px;
    z-index: 40;
    height: 55px;
    line-height:55px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #fff;
   background-color: rgba(255,255,255,.4);
    /* box-shadow: 1px 1px 4px #444; */
    ul{
        list-style: none;
        display:flex;
        justify-content: space-around;
        margin-right:0.4rem;
        padding-bottom: 0px;
        
        li{
           cursor:pointer;
           opacity: 0.8;
           margin-left: 40px;
           flex-grow: 0;
           padding-left:10px;
           padding-right:10px;
          /*  font-weight: bold; */
         /* text-shadow: 1px 1px 1px #999; */
        }
        li:hover{
          color:#686868;
        }
    }
}
.nav{
  background-color: rgba(255,255,255,0.8);
  box-shadow: 2px 2px 2px #999;
  color: #000;
}

#wave{
  z-index: 3;
  position: relative;
}

.router-link-active{
  color:#000 !important;
}
@media screen and (max-width: 950px) {
  .header{
     background-size:auto 100%;
  }
  .catolog{
    justify-content: center;
    align-items: center;
    order: 1;
  }
  .catolog ul{
    list-style: none;
    display:flex;
    width: 100%;
    justify-content:space-around;
    margin-left:auto;
  }
  .header ul li{
 
   margin-left: 0.1rem !important;
}
.search_box{
   order: 2;
   margin:auto;
}
.search{
  width: 3rem;
 
  max-width: 310px !important;
  background-color: rgba(255,255,255,0);
}

.title{
  font-size: 0.3rem;
  animation:title2 0.8s ease-in-out 0ms 1;
}
}
@media screen and (max-width: 450px) {
  .header{
    height: 350px;
     background-size:auto 100%;
  }
}

</style>
