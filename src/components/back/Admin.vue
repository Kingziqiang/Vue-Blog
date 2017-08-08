<template>
	<div class="container">
		<div id="admin_header">
			<div class="hello">
				<!-- <img src="../../assets/img/home.png"> -->
				<span >Hello,{{name}}</span>
			</div>
			<!-- <div class="search_box">
				<input type="text" placeholder="您要搜索的文章标题"class="search" 
					v-model="search_title" 
					@keyup.enter="searchArticles({search_title:search_title})"
					/>
				<img src="../../assets/img/search.png" @click="searchArticles({search_title:search_title})">
			</div> -->
			<ul id="menu">
				<router-link to="/admin/amend" tag="li">文章</router-link>
				<router-link :to="{name:'addArticle',params: {type: 'new'}}" tag="li">新建</router-link>
				<router-link to="/admin/draft" tag="li">草稿</router-link>
				<router-link to="/admin/acount" tag="li">账户</router-link>
			</ul>

			
		</div>
			
			
		<router-view></router-view>
	</div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
	data(){
		return{
			search_title:''
		}
	},
	created(){
		if(!this.$store.state.user){
			this.$router.push('/login')
		}
	},
	computed:{
		...mapState(['user']),
		name: () => localStorage.user
	},
	methods:{
		...mapActions(["searchArticles"])
	}
}
</script>

<style lang="scss" type="stylesheet/scss" scoped>
$main_color: #acc0d7;
.container{
	width: 100%;
	height: 100%;
	position: relative;
	display: block;

}
#admin_header{
	height:12%;
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	position: fixed;
	top:0px;
	/* background-color:#fcfcfc; */
	box-shadow: 0 0 2px rgba(0,0,0,0.25);
	z-index: 20;
	.hello{
		height: 50%;
		margin-left:0.2rem;
		position: relative;
		top:50%;
		transform: translateY(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28px;
		font-weight: bold;
		padding: 5px;
		border-top: 2px solid $main_color;
		border-bottom: 2px solid $main_color;
	}
	.hello span{
		color:$main_color;
		margin-left:10px;
	}
	ul{
		display: flex;
		justify-content: space-around;
		flex-direction: row;
		align-items:center;
		position: relative;
		height: 100%;
		li{	
			flex-shrink: 0;	
			margin: 15px;
			color: #4e5e6a;
			
		/* 	font-weight: bold;	 */
		}
		li:hover{
			color: $main_color;
		}		
	}
}


.search_box{
	border:1px solid #ccc;
	position: relative;
	top:50%;
	height: 20px;
	transform: translateY(-50%);
	float: right;
	margin-right:0.4rem;
	padding-left: 15px;
	.search{
		position: relative;
		width: 2rem;
		height: 35px;
		max-width: 250px !important;
		background-color: rgba(255,255,255,0);
	}
	img{
		width: 25px;
		margin-right: 20px;
		display: inline-block;
		position: relative;
		top: 6px;
	}
	img:hover{
		opacity:0.6;
	}
}
 




/* input::placeholder{
     color:#ddd;
} */
.router-link-active{
	color: $main_color !important;
}

@media screen and (max-width: 520px) {
	#admin_header{
		li{
			margin: 8px !important;
		}
	}

 /*  #sidebar{
 	width: 100%;
 	height: auto;
 	position: fixed;
 	top:0px;
 	background-color: rgba(255,255,255,0.7);
 	ul{
 		display: flex;
 		flex-direction: row !important;
 		align-items:center;
 		justify-content: space-around;
 		height: 0.6rem;
 		li{
 			margin:auto;			
 		}
 	}
 	
 }
 
 .search_box{
 	margin-right:0.1rem;
 	.search{
 		width: 2rem;
 		height:0.3rem;
 		display: inline-block;
 		background-color: rgba(255,255,255,0);
 	}
 }
 .router-link-active{
 	border-bottom: 2px solid #999;
 	padding:3px 5px;
 } */

}
</style>