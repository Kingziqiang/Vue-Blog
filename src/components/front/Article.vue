<template>
	<div class="wrap">
		<div class="article page">
			<time>{{getFormArticle().date}}</time>
			<p class="content" v-html="getFormArticle().content"></p>
			<ul class="tags"><li v-for = "item in getFormArticle().tags">#{{item}}</li></ul>
			<comment :aid = "aid"></comment>			
		</div>
		<aside-nav></aside-nav>
	</div>
</template>

<script>
import {mapActions, mapState,mapGetters,mapMutations} from 'vuex'
import comment                           from './Comment.vue'
import AsideNav                           from '../common/AsideNav.vue'

var moment = require("moment");
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

export default {
    data () {
		return{
		    aid: this.$route.params.aid,	
		}
	},
	computed: {
		...mapState(['article'])
	},
	components: {
		comment,
		AsideNav
	},
	watch:{
		aid(to,from) {		
		    this.getArticle({aid: to})
		}
	},	
	created (){
	  this.set_loading(true);
      this.getArticle({aid: this.aid})
	  .then(() => {this.set_headLine({text: this.article.title, animate:'show2'});})
	},
	methods: {
	  ...mapMutations(['set_loading', 'set_headLine']),
      ...mapActions(['getArticle']),
      getFormArticle() {
      	let formArticle = {...this.article};
      	if(formArticle.content != null){
		    formArticle.content = marked(formArticle.content);
		    return formArticle;
		}
      }
     
	}
}	
</script>

<style lang="scss" type="stylesheet/scss" scoped>
.wrap{
	position: relative;
	width: 65%;
  	margin:30px auto;
	display: flex;
	justify-content: space-between;
}
.article{
	position: relative;
	align-self: center;
	width: 100%;
	overflow: hidden;
  	margin:30px auto;
  	padding:20px 0;
  	text-align: left;
  	time{
		margin-bottom:30px;
		color: #ccc;
		float: right;
	}
  	h1{
		text-align: center;
		font-weight: normal;
		margin-bottom: 30px;
		color: #444;
		font-size:30px;
		&:hover{
			color: #3f86b5;
		}
	}
	.content{
		margin: 10px 0;
	}
	.tags{
		color: #ff4081;
		display: flex;
		justify-content: center;
		li{
			margin-right: 5px;
		}
	}
}


@media screen and (max-width: 440px) {
	.wrap{
		width: 90%;
	}
}

</style>