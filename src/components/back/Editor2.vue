<template>
	<div id="editor">
		<ul class="form">
			<li class="switch">
				<span :class="{checked:!isMarked}" @click="isMarked = false">原文</span>
				<span :class="{checked:isMarked}" @click="isMarked = true">预览</span>
			</li>
			<li>
				<input type="text" class="title" v-model.trim="article.title" v-focus>
			</li>
			<li>
				<input type="text" class="tag" placeholder="标签,用空格' '分隔" v-model.trim="article.tags">
			</li>
			<li>
				<textarea class="content" placeholder="来写点儿啥呗~" 
					v-model.trim="article.content"
					v-if = "!isMarked"
					></textarea>
				<div  class="mdContent" v-if="isMarked" v-html="mdContent"></div>
			</li>
			<li class="btn">
				<button type="button" @click="submit()" >发布文章</button>
			</li>
		</ul>
	</div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'

var marked = require('marked');  //引入markdown

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
	data(){
		return{
			aid:this.$route.params.aid,
			originArticle:{},
			isMarked:false,
		}
	},
	computed:{
		...mapState(['article','dialog_box']),
		mdContent:function() {
			return marked(this.article.content)
		}
	},
	created(){
		this.getArticle({aid:this.aid}) //更新article的所有数据
	},
	
	watch: {
		'aid':(to,from) =>{
			this.getArticle({aid:to})
		},
	},

	methods:{
		...mapActions(['getArticle','alterArticle']),
		...mapMutations(['set_dialog']),
		submit: function(){	
		 var _this = this		
			_this.set_dialog({
				show: true,
				tip:  '确认保存修改吗(๑╹◡╹)ﾉ"""',
				hasTwobtn: true,
				resolved: () =>{
					_this.alterArticle(_this.article)
					.then(()=> {_this.dialog_box.show = false;_this.$router.push('/admin/amend')})
				},
				reject: () =>{_this.dialog_box.show = false;}
			})
		}
	}
} 
</script>
<style type="stylesheel/scss" scoped>

 #editor{
	position: relative;
	display: inline-block;
	width: 100%;
	height: 92%;
	position: relative;
	top:8%;
	font-size: 20px;

}

#editor .form{
	width: 60%;
	position: relative;
	margin:auto;
	top:50%;
	transform: translateY(-50%);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

}

#editor .form li{
	margin-top:0.1rem;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	
}
::placeholder{
	font-size: 20px;
	color: #aaa;
	padding: 5px;
	font-family: '微软雅黑'
}
#editor .form .switch span{
	display: inline-block;
	height:35px;
	line-height: 35px;
	width:100px;
	border:1px solid #42b983; 
}

#editor .form .switch .checked{
	background-color: #42b983;
	color: #fff;
}

#editor .form li .title{
	width: 100%;
	height: 40px;
	background-color: #ebebeb;
	text-align: center;
	font-size: 22px;
}
#editor .form li .title::placeholder{
	text-align: center;
}
#editor .form li .tag{
	width:1rem;
	min-width: 170px;
	border-bottom:1px solid #999;
	padding: 3px;

}
#editor .form li .content{
	width: 100%;
	height: 340px;
	font-family: '微软雅黑';
	border:none;
	background-color: #ebebeb;
}
.mdContent{
	width: 100%;
	height: 340px;
	background-color: #ebebeb;
	text-align: left;
	overflow: scroll;
}
#editor .form .btn{
	justify-content: center;

}
 .btn button{
		
		color: #42b983;
		padding: 6px 8%;
		border-radius: 15px;
		border:1px solid #42b983;
		font-size: 20px;
		transition: 0.4s;
}
.btn button:hover{
		color: #fff !important;		
		background-color: #42b983;
		border-radius: 0px;
}
@media screen and (max-width: 450px) {
	::placeholder{
	font-size: 18px;
	}
	#editor .form{
		width: 90%;
		font-size: 18px;
	}
	.form li{
		margin-top:0.2rem !important;
	}
	#editor .form .switch{
		justify-content: center;
	}
	#editor .form .switch span{
		width:1rem;
		height: 0.42rem;
	}
	#editor .form li .title{
		height: 0.4rem;
		font-size: 18px;
	}
	#editor .form li textarea{	
		height:4rem;
	}
	#editor .form .btn button{
		font-size: 18px;
		padding: 4px 12px;
		border-radius: 12px;
	}

}

</style>