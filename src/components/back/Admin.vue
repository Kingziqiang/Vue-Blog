<template>
	<div class="container">
		<div id="admin_header">
			<div class="hello">
				<img src="../../assets/img/home.png">
				<span >Hello,{{name}}</span>
			</div>
			<div class="search_box">
				<input type="text" placeholder="您要搜索的文章标题"class="search" 
					v-model="search_title" 
					@keyup.enter="searchArticles({search_title:search_title})"
					/>
				<img src="../../assets/img/search.png" @click="searchArticles({search_title:search_title})">
			</div>
		</div>
		<div id="sidebar">
		
			<ul>
				<router-link to="/admin/amend" tag="li">文章管理</router-link>
				<router-link :to="{name:'addArticle',params: {type: 'new'}}" tag="li">新建文章</router-link>
				<router-link to="/admin/draft" tag="li">我的草稿</router-link>
				<router-link to="/admin/acount" tag="li">修改账户</router-link>
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
		name: () => localStorage.name
	},
	methods:{
		...mapActions(["searchArticles"])
	}
}
</script>

<style type="stylesheet/scss" scoped>
.container{
	width: 100%;
	height: 100%;
	position: relative;
	display: block;
}
#admin_header{
	height:8%;
	width: 100%;
	display: block;
	position: fixed;
	top:0px;
	background-color:#fff;
	box-shadow: 0 0 2px rgba(0,0,0,0.25);
	z-index: 10;
}
.hello{
	float: left;
	height: 50%;
	margin-left:0.2rem;
	position: relative;
	top:50%;
	transform: translateY(-50%);
	display: flex;
	justify-content: center;
	align-items: center;
}
.hello img{
	height: 75%;
}

.hello span{
	font-size: 20px;
	color:#444;
	margin-left:10px;
}
.search_box{
	border:1px solid #ccc;
	border-radius: 15px;
	position: relative;
	top:50%;
	transform: translateY(-50%);
	float: right;
	margin-right:0.4rem;
	padding-left: 15px;
}
.search{
	position: relative;
	width: 2rem;
	height: 35px;
	max-width: 250px !important;
	background-color: rgba(255,255,255,0);
}
.search_box img{
	width: 25px;
	margin-right: 20px;
	display: inline-block;
	position: relative;
	top: 6px;

}
.search_box img:hover{
	opacity:0.6;
}
#sidebar{
	width: 13%;
	height: 100%;
	display: inline-block;
	z-index: 8;
	position: fixed;
	left: 0px;
	border-right: 1px solid #fff;
  	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); 
  	color: #444;
}


#sidebar ul{
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items:center;
	position: relative;
	margin-top:50px;
	
}
#sidebar ul li{
	font-size: 20px;
	margin-top:50px;


}
#sidebar ul li:hover{
	color: #ccc;
}


input::placeholder{
     color:#ddd;
}
.router-link-active{
	color:#ccc;
}

@media screen and (max-width: 520px) {
  #sidebar{
	width: 100%;
	height: auto;
	position: fixed;
	top:0px;
	background-color: rgba(255,255,255,0.7)
	
}
#sidebar ul{
		display: flex;
		flex-direction: row !important;
		align-items:center;
		justify-content: space-around;
		height: 0.6rem;
}
#sidebar ul li{
	margin:auto;
	font-size: 18px;
	
}
.search_box{
	margin-right:0.1rem;
}
.search{
	width: 2rem;
	height:0.3rem;
	display: inline-block;
	background-color: rgba(255,255,255,0);
}
.router-link-active{
	border-bottom: 2px solid #999;
	padding:3px 5px;
}

}
</style>