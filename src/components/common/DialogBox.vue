<template>
	<div class="dialog_box" v-if="dialog_box.show">
		<div class="shadow">
			
		</div>
		<div class="dialog">
			<p>{{dialog_box.tip}}</p>
			<div class="btn_group">
				<button @click="comfirm()">确定</button>
				<button v-if='dialog_box.hasTwobtn' @click="cancel()">取消</button>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
	computed:{
		...mapState(['dialog_box'])
	},
	methods:{
		comfirm: function (){
			this.dialog_box.resolved()
		},
		cancel: function (){
			this.dialog_box.reject()
			/*this.dialog_box.show = false;*/
		}
	}
	

}	
</script>
<style type="stylesheel/scss" scoped>
.dialog_box{
	width: 100%;
	height: 100%;
	position: fixed;
	display: block;
	top:0px;
	display: block;
}
.shadow{
	width: 100%;
	height: 100%;
	display: block;
	position: absolute;
	background-color: rgba(0,0,0,0.15);
	top:0px;
	z-index: 3;
}

.dialog{
	width: 1.3rem;
	height: 0.9rem;
	min-width: 300px;
	min-height: 200px ;
	display:block;
	background-color: #fff;
	position: absolute;
	z-index: 10;
	top:0px;
	bottom: 0px;
	left: 0px;
	right: 0px;
	margin:auto;
	border-radius: 4px;
}

@media screen and (max-width: 440px) {
	.dialog{
		width: 3.6rem !important;
		height: 2.7rem !important;
	}
}

.dialog p{
	text-align: center;
	margin: 15% auto;
	font-size: 20px;
	color: #555;
}
.dialog .btn_group{
	width: 100%;
	position: absolute;
	bottom: 20%;
	display: flex;
	justify-content: space-around;
}
.dialog button{
	font-size: 18px;
	position: relative;
	transition: 0.5s;
}
.dialog button:hover{
	color:#8bc34a;
}
</style>