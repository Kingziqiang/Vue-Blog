<template>
  	<div class="footer">
   	  	<canvas id="foot-bg" ></canvas> 
		<ul>
			<li>Copyright © 2017 wangfang</li>
			<li>Powered by Vue, Designed by me<router-link to="/login" tag="span">站长登录</router-link></li>
		</ul>	 
 	</div>
</template>

<script>
export default {
	mounted() {
		this.paint();
		const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
		window.addEventListener(resizeEvent, this.paint, false)
   	},
   	methods: {
   		paint() {
   			const canvas = document.querySelector("#foot-bg"),
		      	  ctx    = canvas.getContext('2d'),
			      height = canvas.height=250 ,
			      offset = 40,
			      width  = canvas.width  = window.innerWidth;		
			ctx.beginPath();
	        ctx.moveTo(0,offset);
	        ctx.bezierCurveTo(width/3,2*offset, width*2/3, 0,width,offset);
	        ctx.lineTo(width,height);
	        ctx.lineTo(0,height);
	        ctx.lineTo(0,0)
	        ctx.closePath();
	        ctx.fillStyle = "#f8f8f8";
	        ctx.fill();
   		}
   	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.footer{
	  width:100%;
	  display: block;
	  position: relative;
	  margin-top: 30px;
	  height:250px;
	  	z-index: 6;
	  #foot-bg{		
			position: absolute;
			left: 0px;
			bottom: 0px;
	  }
	  ul{		
		position: relative;
		top: 70%;
		transform: translate(0, -50%);
		li{
			margin-top: 10px;
			span{
				border-left: 1px solid #999;
				margin-left: 20px;
				padding-left: 5px;
				color: #acc0d7;
				cursor:pointer;
				font-weight: bold;

			}
			span:hover{
				
			}
	    }
	  } 
} 


</style>
