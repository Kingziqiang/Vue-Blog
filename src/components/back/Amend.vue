<template>
	<div class='title_list'>
		<div class="wrapper">
			<p class="head">所有文章</p>
			<table>
				<tr v-for='item in getShortArticles'>
						<td class="title">{{item.title}}</td>
						<td class="tags"><span v-for='tag in item.tags'>{{tag}}</span></td>	
						<td class="time">{{item.date}}</td>			
						<td class="operate">
							<router-link tag="span" :to="{name: 'editor',params: {type:'article',aid:item._id}}">编辑</router-link>
							<span @click="remove(item._id)">删除</span>
						</td>				
				</tr>
			</table>
			<div class="turn_page">
				<span @click="prePage">上一页</span>
				<span>第{{ page }}页</span>
				<span @click="nextPage">下一页</span>
			</div>
		</div>		
	</div>
</template>
<script>

import {mapActions,mapState,mapMutations,mapGetters} from 'vuex'
export default {
	data () {
		return {
			page: 1
		}
	},
	created () {
		this.getArticles({limit:8,skip:0})
	},
	computed:{
		...mapState(['articles','dialog_box']),
		...mapGetters(['getShortArticles'])
	},
	methods: {
		...mapMutations(['set_dialog']),
		...mapActions(['getArticles', 'removeArtical']),

		remove:function (aid) {
			var _this = this
			this.set_dialog({
				show:true,
				tip:"确定要删除吗(๑＞ڡ＜)☆",
				hasTwobtn:true,
				resolved: () => {
					_this.removeArtical({aid: aid})
					.then(function(){
						_this.dialog_box.show = false;
						_this.getArticles({limit:8});

					})
					.catch( (err) => {console.log(err)})
				},
				reject: () => {
				_this.dialog_box.show = false;
				}
			})

		},
		prePage: function () {
			if(this.page>1){
				this.page--;
				this.getArticles({limit:8,skip:(this.page-1)*8})
			}
		},
		nextPage: function () {
			if(this.articles.length == 8){
				console.log(this.articles.length)
			  this.page++;
			  this.getArticles({limit:8,skip:(this.page-1)*8})
			 }
		}
	}
}
</script>

<style type="stylesheet/scss" scoped>

.title_list{
	position: relative;
	display: inline-block;
	width: 100%;
	height: 92%;
	position: relative;
	top:8%;
	font-size: 20px;
}
.wrapper{
	width: 52%;
	position: relative;
	margin:auto;
	top:50%;
	left: 3%;
	transform: translateY(-50%);	
}
 table{
	width: 100%;
	table-layout:fixed;		
}
.head{
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	color: #444;
	margin-bottom: 20px;	
}
table tr{
	width: 100%;
	height: 60px;
	
}
tr .title{
	text-align: left;
	text-overflow: ellipsis; 
	white-space: nowrap; 
	overflow: hidden; 
}
tr .time{
	text-overflow: ellipsis; 
	white-space: nowrap; 
	overflow: hidden; 
	color: #aaa;
}
tr .tags span{
	margin:10px;
	float: left;
}
tr .operate{
	text-align: right;
	white-space: nowrap;
}
.operate span{
	color: #888;
	padding: 4px 9px;
	border-radius: 10px;
} 
.turn_page{
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	color: #42b983;
}


@media screen and (max-width: 440px) {
	.wrapper {
		width: 75%;
		
	}
	.head{
		display: none;
	}
	tr{
		height: 0.6rem !important;
	}
	.turn_page{
		margin-top: 10px;
	}

} 
</style>