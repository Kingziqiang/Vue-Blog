<template>
	<div class="container">
		<div id="admin_header">
			<span class="hello">Hello&nbsp;&nbsp;{{user.username}}</span>
			<div id="search_box">
			<input type="text" placeholder="标题，日期，标签"id="search" />
			</div>
		</div>
		<div id="sidebar">
		
			<ul>
				<router-link to="/admin/amend" tag="li">文章管理</router-link>
				<router-link to="/admin/addArticle" tag="li">新建文章</router-link>
				<router-link to="/admin/acount" tag="li">修改账户</router-link>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	created(){
		if(!this.$store.state.user){
			this.$router.push('/login')
		}
	},
	computed:{
		...mapState(['user'])
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
	background-color:#b5bfc6;
	box-shadow: 1px 1px 1px 1px rgba(250,250,250,0.7); 
	z-index: 10;
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

.hello{
	float: left;
	height: 100%;
	font-size: 20px;
	line-height: 60px;
	margin-left:100px;
	color: #eee;
}
#search_box{

	background-color:#96a5ba;
	border-radius: 15px;
	position: relative;
	top:15px;
	float: right;
	margin-right:0.5rem;
	padding-left: 15px;
}
#search{
	position: relative;
	width: 2rem;
	max-width: 320px !important;
	height: 32px;
	background-color: rgba(255,255,255,0);
}
input::placeholder{
     color:#ddd;
}
@media screen and (max-width: 520px) {
  #sidebar{
	width: 100%;
	position: absolute;
	display: inline-block;

	height: 1rem;
	left: 0px;
	right: 0px;
	margin:auto;
}

	#sidebar ul{
		display: none;
		/* display: flex;
		flex-direction: row !important;
		align-items:flex-start;
		position: relative;
		justify-content: flex-start; */

	}

	#sidebar ul li{
		margin:3% auto;
		display: inline-block;
		padding:3px 8px;
		border-bottom: 1px solid #8ac;
		
	}

}
</style>