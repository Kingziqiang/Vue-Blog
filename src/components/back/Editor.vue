<template>
  <div id="editor">
	<ul class="form">
	  <li class="switch">
		<span :class="{checked:!isMarked}" @click="isMarked = false">原文</span>
		<span :class="{checked:isMarked}" @click="isMarked = true">预览</span></li><li>
		<input v-focus type="text" class="title" placeholder="标题"  v-model.trim="title"></li>
	  <li>
	    <input type="text" class="tag" placeholder="标签,用空格' '分隔" v-model.trim="tags"></li>
	  <li>
	    <textarea class="content" placeholder="来写点儿啥呗~" 
		  v-model="content"
		  v-if = "!isMarked"
		  ></textarea>
		  <div  class="mdContent" v-if="isMarked" v-html="mdContent"></div></li>
	  <li class="btns">
	    <div class="btn" @click="submitArticle()">发布文章</div>
	    <div class="btn" @click="submitDraft()">存为草稿</div></li>
	</ul>
  </div>
</template>
<script>
import {mapActions,mapState,mapMutations} from 'vuex'

var marked = require('marked');  //引入markdown
var renderer = new marked.Renderer();


marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export default {

	data(){
		return {		
			isMarked:false,	
			title:'',
			tags:'',
			content:'',	
			type: this.$route.params.type,	
		}
	},
	watch: {
		type : function (to,from) {
			alert("jianshichenggong")
			init(this)
		}
	},
	directives: {
		focus: {
 			 inserted: function (el) {
 			 el.focus()
 		 	}
 		}
	},
	computed:{
		...mapState(['dialog_box','draft','article']),
		mdContent: function() {
			return marked(this.content)
		},
		newContent: function (){
		  let newContent = {
		    title: this.title,
			tags: this.tags.split(' '),
			content: this.content,
			date: new Date()
		  }
		  if(this.type !== 'new'){
		  	newContent._id = this.$route.params.aid;
		  }
		  return newContent;
		}
	},
	
	created() {
		let _this = this;
		this.init(_this);
	},

	methods:{
		...mapActions(['saveArticle','saveDraft','getDraft','getArticle','alterArticle','alterDraft','postDraft','articleToDraft']),
		...mapMutations(['set_dialog','set_article','set_draft']),
		submitArticle:function (){
			// 输入验证
			if(this.title.length == ' ') {this.set_dialog({show: true, tip: '标题不能为空噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}
			if(this.tags.length == ' ') {this.set_dialog({show: true, tip: '请设置至少一个标签噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}
			if(this.content.length == ' ') {this.set_dialog({show: true, tip: '内容不能为空噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}

			switch(this.type)
			{
				case "article":
				  this.alterArticle(this.newContent).then(() => {alert("修改成功了哟~")});
				  break;
				case "draft":
				  this.postDraft(this.newContent).then(() => {alert("草稿发布成功了哟~")});
				  break;
				case "new":
				  this.saveArticle(this.newContent).then(() => {alert("新文章发布成功了哟~")});
				  break;
			}			
		},
		submitDraft:function(){
			// 输入验证
			if(this.title.length == ' ') {this.set_dialog({show: true, tip: '标题不能为空噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}
			if(this.tags.length == ' ') {this.set_dialog({show: true, tip: '请设置至少一个标签噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}
			if(this.content.length == ' ') {this.set_dialog({show: true, tip: '内容不能为空噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }}); return;}

			switch(this.type)
			{
				case "article":
				  this.articleToDraft(this.newContent).then(() => {alert("文章存至草稿了哟~")});
				  break;
				case "draft":
				  this.alterDraft(this.newContent).then(() => {alert("草稿修改成功了哟~")});
				  break;
				case "new":
				  this.saveDraft(this.newContent).then(() => {alert("草稿新建成功了哟~")});
				  break;
			}	
		},
		init: function(_this) {		
			const params = _this.$route.params;
			switch(_this.type)
			{
				case "article":
					_this.getArticle({aid:params.aid})
					.then(function(){					
						({title: _this.title, tags: _this.tags, content:_this.content} = _this.article)
					})
					break;
				case "draft":
					_this.getDraft({aid:params.aid})
					.then(function(){
						({title: _this.title, tags: _this.tags, content:_this.content} = _this.draft)
					})
					break;
			}
		}
	}
}
</script>
<style lang="scss" type="stylesheel/scss" scoped>
$button_color: #acc0d7;
 #editor{	
	display: inline-block;	
	position:relative;
	width: 100%;
	top: 100px;
	margin: auto;
	font-size: inherit;
	z-index: 19;
	.form{
		width: 70%;
		position: relative;
		margin:auto;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		li{
			margin-top:0.06rem;	
			/* background-color: red; 	 */	
			width: 100%;
			display: flex;
			justify-content: flex-start;
					span{
					display: inline-block;
					height:26px;
					line-height: 26px;
					
					width:70px;
					border:1px solid $button_color; 
				}
				.checked{
					background-color: $button_color;
					font-weight: bold;
					color: #fff;
				}
			
			
			.title{
				width: 100%;
				/* height: 0px; */
				text-align: center;
				font-size: 22px;
				&::placeholder{
					text-align: center;
				}
			}
			.tag{
				width:1rem;
				min-width: 170px;
				background-color: #fafafa;
				padding: 3px;
				&::placeholder{
					font-weight: bold; 
					font-family: '微软雅黑';
		
				}
	
			}
			.content{
				width: 100%;
				height: 320px;	
				border:none;
				background-color: #fafafa;
				&::placeholder{
					font-weight: bold; 
					font-family: '微软雅黑';
		
				}
			}
			.mdContent{
				width: 100%;
				height: 320px;	
				border:none;
				background-color: #fafafa;
				overflow: scroll;
				text-align: left;
			}
			
		}
		.btns{
			justify-content: space-around;
			.btn{		
				/* color: $button_color; */
				padding: 6px 8%;
				border-radius: 3px;
				position: relative;
				z-index:2;
				font-weight: bold;
				 transition: 1s;/*
				border-top: 2px solid #666;
				border-bottom: 2px solid #666; */
				&:hover{
					color: #acc0d7;
				}
			}

		}
			
	}
}

 



 
/* #editor .form 
.btn
.btns:hover .btn::before{
		width: 100%;
		color: #fff;

} */

@media screen and (max-width: 450px) {
	::placeholder{
	/* font-size: 18px; */
	}
	#editor .form{
	width: 90%;
		/* font-size: 18px; */
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
		/* font-size: 18px;
			 */	}
	#editor .form li textarea{	
		height:4rem;
	}
	#editor .form .btn button{
		/* font-size: 18px; */
		padding: 4px 12px;
		border-radius: 12px;
	}

}
</style>