<template>
	<div id="editor">
		<ul class="form">
			<li>
				<input type="text" v-model.trim="article.title">
				<input type="text" v-model.trim="article.tags">
			</li>
			<li><textarea v-model.trim="article.content"></textarea></li>
			<li><input type="button" @click="submit()" value="submit"></li>
		</ul>
	</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
	data(){
		return{
			aid:this.$route.params.aid,
			originArticle:{}
		}
	},
	created(){
		this.getArticle({aid:this.aid}) //更新article的所有数据
	},
	computed:{
		...mapState(['article'])
	},
	watch: {
		'aid':(to,from) =>{
			this.getArticle({aid:to})
		},
	},

	methods:{
		...mapActions(['getArticle','alterArticle']),
		submit: function(){
			this.alterArticle(this.article)
		}
	}
} 
</script>
<style type="stylesheel/scss" scoped>
#editor{
	position: relative;
	display: inline-block;
}
#editor .form{
	width: 3rem;
	position: relative;
	margin-top:0.5rem;
}

#editor .form li{
	margin-bottom:0.1rem !important;
	padding:0px !important;
}
#editor .form li:first-child{
	position: relative;
	overflow: hidden;
}
#editor input,textarea{
	font-size: 18px;
	color: #666;
}

input[type="text"]{
	float: right;
	display: inline-block;
	width: 1.3rem;
	float: right;
	display: inline-block;
	border: 1px solid #8bc34a;
	border-radius: 4px;
	padding:6px 5px;
	
}
input[type="text"]:first-child{
	float: left;
}

textarea{
	width: 3rem;
	height: 300px;
	border: 1px solid #8bc34a;
}

input[type="button"]{
	background-color: rgba(255,255,255,0);
	padding:8px 10px;
	border-radius: 10px;
	border:1px solid #8bc34a;
	font-size: 18px;
}

</style>