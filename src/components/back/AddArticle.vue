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

				<li class="btn">
					<button  @click="submit()">发布文章</button>
			    	<button >存为草稿</button>
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
			title:'',
			tags:[],
			isMarked:false,
			content:''
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
		...mapState(['dialog_box']),
		mdContent: function() {
			return marked(this.content)
		},
		newArticle: function() {
			return{
				title:this.title,
				tags:this.tags.split(' '),
				content:this.content,
				date:new Date()
			}
		},
	},
	methods:{
		...mapActions(['saveArticle']),
		...mapMutations(['set_dialog']),
		submit:function (){
			let _this = this; 
			this.saveArticle(this.newArticle)
			.then(_this.set_dialog({
				show : true,
				tip :  '发布成功了哟(๑╹◡╹)ﾉ"""',
				hasTwobtn : false,
    			resolved : () => {
    				_this.dialog_box.show = false; 
    				_this.$router.push('/admin/amend')}
			}))
			.catch((err) => {console.log(err)})
			
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
#addArticle .form .btn{
	justify-content: space-around;

}
#addArticle .form .btn button{		
		color: #42b983;
		padding: 6px 8%;
		border-radius: 15px;
		border:1px solid #42b983;
		font-size: 20px;
		transition: 0.6s;
}
.btn button:hover{
		color: #fff !important;		
		background-color: #42b983;
		
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