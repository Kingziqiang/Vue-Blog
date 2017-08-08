<template>
	<div class="wrapper">
		<p class="head">所有草稿</p>
		<table>
			<tr v-for='item in drafts'>
				<td class="title">{{item.title}}</td>
				<!-- <td class="tags"><span v-for='tag in item.tags'>{{tag}}</span></td>	 -->
				<td class="time">{{item.date}}</td>			
				<td class="operate">
					<router-link tag="span" :to="{name: 'editor',params: {type:'draft',aid:item._id}}">编辑</router-link>
					<span @click="remove(item._id)">删除</span>
				  </td>				
			</tr>
		</table>
		<!-- 	<div class="turn_page">
			<span @click="prePage">上一页</span>
			<span>第{{ page }}页</span>
			<span @click="nextPage">下一页</span>
		</div> -->
	</div>	
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'

	export default {
		data() {
			return {
				limit: 10
			}
		},
		computed: {
			...mapState(['drafts','dialog_box'])
		},
		created() {
			this.getDrafts({limit:this.limit,skip:0})
		},
		methods: {
			...mapMutations(['set_dialog']),
			...mapActions(['getDrafts','dropDraft']),
			remove(_id){
			  const _this = this;
			  this.set_dialog({
			  	show:true,
		    	tip:'确定要删除吗(ﾉﾟ0ﾟ)ﾉ~',
		    	hasTwobtn:true,
		    	resolved() {
		    		const __this = this
		    		_this.dropDraft(_id)
		    		.then(() => _this.getDrafts({limit:_this.limit,skip:0}))
		    		.then(() => __this.show = false)
		    		.catch(err => console.log(err))
		    	},
		    	reject(){this.show = false}
			  })
			}

		}
	}
</script>

<style lang="scss" type="stylesheet/scss" scoped>
.wrapper{
	width: 52%;
	position: relative;
	margin:auto;
	top:50%;
	top: 320px;
	transform: translateY(-50%);	
}
.head{
	font-size: 24px;
	font-weight: bold;
	text-align: center;
	margin-bottom: 20px;	
}
 table{
	width: 100%;
	position: relative;
	margin: auto;
	table-layout:fixed;	
	tr{
		width: 100%;
		height: 35px;		
		.title{
			text-align: left;
			text-overflow: ellipsis; 
			white-space: nowrap; 
			overflow: hidden; 
			font-weight: bold;						
		}
		
		.time{
			text-overflow: ellipsis; 
			white-space: nowrap; 
			overflow: hidden; 
			color: #aaa;
		}
		.tags span{
			margin:10px;
			float: left;
		}
		.operate{
			text-align: right;
			white-space: nowrap;
			span{			
				padding: 4px 9px;
				border-radius: 10px;
			} 
		}		
	}	
}


.turn_page{
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	margin-top: 20px;
	
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