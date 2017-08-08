<template>
	<div class ="wrap" v-show="isLoading">
		<canvas class="canvas" v-show="isLoading">你的浏览器好像不支持canvas(⊙o⊙)噢，换个浏览器试试吧~</canvas>
	</div>
</template>
<script type="text/javascript">
import { mapState,mapMutations} from 'vuex'
	export default {
		computed: {
			...mapState(['isLoading'])
		},
		mounted() {
			const canvas   = document.querySelector(".canvas"),
				  ctx      = canvas.getContext('2d'),
				  width    = canvas.width  = window.innerWidth,
				  height   = canvas.height = window.innerHeight,
				  distance = 40,
				  balls    = [
				    {raidus:14, color: "rgba(255,0,0,0.1)", offset: 20},
				    {raidus:10, color: "rgba(0,0,255,0.2)", offset: 27},
				    {raidus:16, color: "rgba(0,255,0,0.1)", offset: 23}
				  ];
			let count = 0
			const loop = () => {
				count++;
				ctx.clearRect(0, 0, width, height);
				for(let i = 0; i < balls.length; i++){					
					ctx.save();
					ctx.beginPath();
					ctx.arc(width/2-distance*i, height/2 + balls[i].offset*Math.sin(Math.PI/2*i+Math.PI*count/24), balls[i].raidus, 0,Math.PI*2);
					ctx.fillStyle = balls[i].color;
					ctx.closePath();
					ctx.fill();
					ctx.restore();
				}
				requestAnimationFrame(loop)
			}
			requestAnimationFrame(loop);
		}
	}
</script>
<style lang="scss" type="stylesheel/scss" scoped>
	.wrap{
		z-index:39;
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:100%;
		background-color: #fff;
	}
</style>