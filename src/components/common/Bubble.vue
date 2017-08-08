<template>
	<div class = 'wrap'>
		<canvas class="canvas">你的浏览器好像不支持canvas(⊙o⊙)噢，换个浏览器试试吧~</canvas>
	</div>
</template>
<script type="text/javascript">
import { mapState,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				top: 300
			}
		},
		mounted() {
			function random(min, max) {
				return Math.floor(min + Math.random()*(max-min))
			}
			
			const canvas   = document.querySelector(".canvas"),
				  ctx      = canvas.getContext('2d'),
				  width    = canvas.width  = window.innerWidth,				  
				  height = canvas.height = window.innerHeight,
				  maxr = 10,
				  minr = 4,
				  offset = 3,
				  count = 2;
	
				
		     
				const bubble = () => {	
					ctx.clearRect(0,0,width,height);	
					for(let i = 0; i < balls.length; i++){
						balls[i].count++;
						balls[i].count = balls[i].count%100;
						let rx = Math.floor(balls[i].x + offset*Math.sin(Math.PI*balls[i].count/12+Math.PI*i/4));
					      let  ry = Math.floor(height-balls[i].count*balls[i].v);
					  
					    ctx.save();
					    ctx.beginPath();
					    ctx.arc(rx, ry , balls[i].r, 0, Math.PI*2);
						ctx.fillStyle = 'rgba(150,150,150,0.5)';
						ctx.closePath();
						
						ctx.fill();
						ctx.restore();	
					}
					requestAnimationFrame(bubble)						
				};							

				const balls = new Array(count).fill(0).map( () => {
					return {
						x: random(0, width),
						r: random(minr, maxr),
						count: 0,
						v: random(0.5,6)
					}
				});
	
				requestAnimationFrame(bubble)
						

			
		}
	}
</script>
<style lang="scss" type="stylesheel/scss" scoped>
	.canvas{
		z-index:0;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;
		 /* background-color: #fff; */ 
	}
</style>