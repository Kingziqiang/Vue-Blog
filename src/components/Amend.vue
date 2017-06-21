<template>
	<div class='title_list'>
		<ul>
			<li v-for='item in articles'>
					<span class="title">{{item.title}}</span>	
					<time>{{item.date}}</time>			
					<div class="operate">
						<router-link tag="span" :to="{name: 'editor',params: {aid:item._id}}">编辑</router-link>
						<span @click="remove(item._id)">删除</span>
					</div>				
			</li>
		</ul>
		
	</div>
</template>
<script>

import {mapActions,mapState,mapMutations} from 'vuex'
export default {
	created () {
		this.getArticles({limit:10})
	},
	computed:{
		...mapState(['articles','dialog_box'])
	},
	methods: {
		...mapMutations(['set_dialog']),
		...mapActions(['getArticles', 'removeArtical']),
		remove:function (aid) {
			var _this = this;
			this.set_dialog({tip:"确定要删除吗(๑＞ڡ＜)☆",hasTwobtn:true,show:true});

			this.dialog_box.resolved = function(){
				_this.removeArtical({aid: aid})
				.then(function(){
					_this.dialog_box.show = false;
					_this.getArticles({limit:10});
					
					console.log("我调用了");

				})
				.catch( (err) => {console.log(err),console.log("我失败了")})
			}

			this.dialog_box.reject = function(){
				_this.dialog_box.show = false;
			}
			
		}
	}
}
</script>

<style type="stylesheet/scss" scoped>

.title_list{
	position: relative;
	float: right;
	display: flex;
	width: 86%;
}

.title_list ul{
	width: 50%;
	align-items: center;
	flex-direction: column;
	color: #000;
	padding-top:5%;
	position: relative;
	left:16%;
	top:100px;
}

.title_list li{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin:40px;
}

.title_list li .title{
	font-size: 20px;
	text-align: left;
	width: 150px;
}
.operate{
}

.title_list li time{
	color: #ccc;
	align-self:center;
}

.operate span{
	margin-left:15px;
	color: #888;
	border: 1px solid #888;
	padding: 4px 9px;
	border-radius: 10px;
} 

/* 


*/
</style>