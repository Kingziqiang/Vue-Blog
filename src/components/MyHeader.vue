<template>
<div class="header">
<!-- <span class="welcome">Welcome to my blog</span> -->
<!--  <span class="title">Welcome to my blog</span> -->
  <div class="catolog">
 
    <ul >
      <router-link to='/home' tag="li">首页</router-link>
      <router-link to='/articles' tag="li">文章列表</router-link>
      <router-link to='/aboutMe' tag="li">关于我</router-link>
    </ul>
  </div>
 <!--  <canvas id="canvas" width="100%" height="100%">诶哟 你的浏览器不支持canvas噢~</canvas> -->
 </div>
</template>

<script>
export default {
 /*mounted(){
      setInterval(draw,20)
      var canvas = document.getElementById('canvas');
      var ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var waves = ["rgba(255, 255, 255, 1)"]
      var i = 0;
      function draw() {
        canvas.width = canvas.width;
        for(var j = waves.length - 1; j >= 0; j--) {
          var offset = i + j * Math.PI * 100;
          ctx.fillStyle = (waves[j]);
          var randomLeft            = (Math.sin(offset/100)  + 1)       / 2 * 30;
          var randomRight           = (Math.sin((offset/100) + 10) + 1) / 2 * 30;
          var randomLeftConstraint  = (Math.sin((offset/60)  + 2)  + 1) / 2 * 30;
          var randomRightConstraint = (Math.sin((offset/60)  + 1)  + 1) / 2 * 30;
 
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
 }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped>
.header{
  background-image: url('../assets/img/bg.png');
  background-repeat: no-repeat;
  background-size:100%; 
  height: 500px;
  display: block;
  width: 100%;
  transition: background-size  1s;
   background-position: center;
   background-color: #fff;
   position: relative;
}
.title{
  position: absolute;
  display: inline-block;
  font-size: 50px;
  height: 200px;
  line-height: 200px;
  width: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom:0px;
  color: #fff;
  margin:auto;
  opacity: 0.5;

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
 
  background-color: rgba(255,255,255,0.8);
  box-shadow: 2px 2px 2px #999;
}
.catolog ul{
  list-style: none;
  display:flex;
  justify-content: flex-end;
  padding-right: 150px;
}
.header ul li{
   color: #262626;
  margin-left: 60px;
}

.header ul li:hover{
  color:#8bc34a;
}

@media screen and (max-width: 500px){
  .catolog ul{
    list-style: none;
    display:flex;
    justify-content: flex-end;
    padding-right:0.3rem !important;
  }
  .header ul li{
   color: #262626;
   margin-left: 0.1rem !important;
}
.header{
  height: 4rem;
}
}
</style>
