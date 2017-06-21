<template>
	<div class="article">
		<h3>{{article.title}}</h3>
		<time>{{article.date}}</time>
		<p>{{article.content}}</p>
		<ul>
			<li></li>
		</ul>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data () {
		return {
			aid: this.$route.params.aid
		}
	},
	watch:{
		'aid':(to,from) => {
			this.getArticle({aid: to})
		}
	},
	created (){
      this.getArticle({aid: this.aid})
	},
	computed: {
      ...mapState(['article'])
	},
	methods: {
      ...mapActions(['getArticle'])
	}
}	
</script>

<style type="stylesheet/scss" scoped>
.article{
	position: relative;
	width: 60%;
	background-color: #fff;
  	margin:30px auto;
 	border: 7px solid #fff;
  	border-radius: 3px;
  	box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); 
  	padding:30px 20px;
  	text-align: left;
}

.article h3{
	text-align: center;
	font-weight: normal;
	margin-bottom: 30px;
	color: #444;
	font-size:30px;
}

.article h3:hover{
	color: #8bc34a;
}
.article time{
	margin-bottom:30px;
	color: #ccc;
}
.article p{
	margin-top:40px;
}
</style>