<template>
	<div id="addArticle">
		<ul class="form">
				<li class="switch">
					<span :class="{checked:!isMarked}" @click="isMarked = false">原文</span>
					<span :class="{checked:isMarked}" @click="isMarked = true">预览</span>
				</li>
				<li>
					<input v-focus type="text" class="title" placeholder="标题"  v-model.trim="title">
					
				</li>
				<li>
					<input type="text" class="tag" placeholder="标签,用空格' '分隔" v-model.trim="tags">
				</li>

				<li>
					<textarea class="content" placeholder="来写点儿啥呗~" 
					v-model="content"
					v-if = "!isMarked"
					></textarea>
					<div  class="mdContent" v-if="isMarked" v-html="mdContent"></div>
				</li>

				<li class="btns">
					<div class="btn" @click="submitArticle()">发布文章</div>
					<div class="btn" @click="submitDraft()">存为草稿</div>
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
			tags: this.tags,
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
<style type="stylesheel/scss" scoped>
 #addArticle{
	position: relative;
	display: inline-block;
	width: 100%;
	height: 92%;
	position: relative;
	top:8%;
	font-size: 20px;

}

#addArticle .form{
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

#addArticle .form li{
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
#addArticle .form .switch span{
	display: inline-block;
	height:35px;
	line-height: 35px;
	width:100px;
	border:1px solid #42b983; 
}

#addArticle .form .switch .checked{
	background-color: #42b983;
	color: #fff;
}

#addArticle .form li .title{
	width: 100%;
	height: 40px;
	background-color: #ebebeb;
	text-align: center;
	font-size: 22px;
}
#addArticle .form li .title::placeholder{
	text-align: center;
}
#addArticle .form li .tag{
	width:1rem;
	min-width: 170px;
	border-bottom:1px solid #999;
	padding: 3px;

}
#addArticle .form li .content{
	width: 100%;
	height: 340px;
	
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
#addArticle .form .btns{
	justify-content: space-around;

}
#addArticle .form .btn{		
		color: #42b983;
		padding: 6px 8%;
		border-radius: 3px;
		border:1px solid #42b983;
		font-size: 20px;
		position: relative;
		z-index:2;
}
.btn::before{
	content: '发布文章';
	position:absolute;
	left:0px;
	top:0px;
	background-color: #42b983;
	width:0px;
	height:100%;
	transition: 1s;
	box-sizing: border-box;
	border-radius: 3px;
	z-index: 1;
	color:rgba(255,255,255,0);
	padding-top: 7px;
}
.btns:hover .btn::before{
		width: 100%;
		color: #fff;

}

@media screen and (max-width: 450px) {
	::placeholder{
	font-size: 18px;
	}
	#addArticle .form{
	width: 90%;
		font-size: 18px;
	}
	.form li{
		margin-top:0.2rem !important;
	}
	#addArticle .form .switch{
		justify-content: center;
	}
	#addArticle .form .switch span{
		width:1rem;
		height: 0.42rem;
	}
	#addArticle .form li .title{
		height: 0.4rem;
		font-size: 18px;
	}
	#addArticle .form li textarea{	
		height:4rem;
	}
	#addArticle .form .btn button{
		font-size: 18px;
		padding: 4px 12px;
		border-radius: 12px;
	}

}
</style>