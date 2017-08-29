<template>
	<div class ="wrap" v-show="isLoading">
		<ul>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>
<script type="text/javascript">
import { mapState} from 'vuex'
	export default {
		computed: {
			...mapState(['isLoading'])
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
		display: flex;
		justify-content: center;
		align-items: center;
		ul{
			display: flex;
			position: relative;
			&::before{
				content: "正在加载......";
				position: absolute;
				top: -40px;
				left: 0;
				right: 0;
				margin: auto;
			}
			li{
				background-color: #3f86b5;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				margin: 2px;
				
			}
			li:nth-child(1){
				animation: loading 1s ease 0ms infinite;
			}
			li:nth-child(2){
				animation: loading 1s ease 100ms infinite;
			}
			li:nth-child(3){
				animation: loading 1s ease 200ms infinite;
			}
			li:nth-child(4){
				animation: loading 1s ease 300ms infinite;
			}
			li:nth-child(5){
				animation: loading 1s ease 400ms infinite;
			}
			li:nth-child(6){
				animation: loading 1s ease 500ms infinite;
			}
			li:nth-child(7){
				animation: loading 1s ease 600ms infinite;
			}
			li:nth-child(8){
				animation: loading 1s ease 700ms infinite;
			}
		}
	}
	
	@keyframes loading{
		0%{
			transform: scale(1);
			
		}
		100%{
			transform: scale(.3);
			opacity: 0.1;
		}
	}

@media screen and (max-width: 500px) {
	.wrap ul li{
		width:0.3rem;
		height: 0.3rem;
	}
}
</style>