<template>
	<div class="wrap">
		<div class = "comment" :class= "{isManager: item.isManager}" v-for="item in comments">
			<div class = "avatar"></div>
			<div class = "box">
				<span class = "name">{{item.name}}说:</span>
				<time><em>{{item.date}}</em></time>
				<p class = "content">{{item.content}}</p>
				<div class = "action">				
				    <a  class="reply" @click = "reply(item.name)">回复</a>
				    <div class = "agree" 
				    	:class="{agreed: localStorage.getItem(item._id) == 'agreed'}" 
				    	@click='agree(item)'>{{item.agree}}
				    	</div>				
				</div>
			</div>
		</div>		
		<div class="write" id="write">
			<p class="title">说点儿啥呗~</p>
			<p class="declar">电子邮件地址不会被公开。 必填项已用*标注</p>
			<label for="comment"> <span>评论</span> <textarea id="comment" v-model="content"></textarea> </label>
			<label for="name"> <span>称呼*</span> <input type="text" name="" id="name" v-model="name"> </label>
			<label for="email"> <span>电子邮件*</span> <input type="text" name="" id="email" v-model="email"> </label>
			<button @click="submit({content, name, email, aid, isManager})">发表评论</button>
		</div>
	</div>
</template>

<script >
import {mapActions, mapState, mapMutations} from 'vuex'
import util from '../../util.js'
  export default {
	data() {
		return {
			content: '',
			name: '',
			email: '',
			isManager: typeof(localStorage.user) !== 'undefined',
			localStorage: localStorage
		}
	},
	computed: {
		...mapState(['comments'])
	},
	props: ['aid'], /*通过prop拿到父组件的aid*/
	watch: {
		aid(to, from) {
			this.getComments({aid: to})
		}
	},
	created() {
		this.getComments({aid: this.aid})

	},
	methods: {
		...mapActions(['submitComment','getComments','subAgree']),
		...mapMutations(['set_dialog']),
		submit(payload) {
			let {name, email, content} = payload;			
			if(content.length < 5 || content.length > 200){
				this.set_dialog({show: true, tip: '内容长度请在5-200之间噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }})
			}
			else if(name.length === 0){
				this.set_dialog({show: true, tip: '姓名不能为空噢~', resolved() {this.show = false }})
			}
			else if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email)){
				this.set_dialog({show: true, tip: '请输入合法的邮箱地址噢ᓫ(°⌑°)ǃ~', resolved() {this.show = false }})
			}
			else{
				this.submitComment(payload)
			}
		},
		reply(to) {
			this.content = `@${to}: `;
			this.name = '';
			this.email = '';
			util.slideTo(document.querySelector('#write'))
			
		},
		agree(item) {
			if(localStorage.getItem(item._id)!== 'agreed'){
				item.agree++;
				localStorage.setItem(item._id, "agreed");
				this.subAgree(item)
			}else{
				item.agree--;
				localStorage.setItem(item._id, "cancel");
				this.subAgree(item)
			}
			
		},
	},
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrap{
	width:100%;
}
.comment{
	width: 100%;
	margin:30px 0px;
	padding: 20px 0;
	display: flex;
	justify-content: flex-start;
	/* border-top: 1px solid #ddd; */
	.avatar{
		order: 1;
		width: 0.9rem;
		height:  0.9rem;
		flex-shrink: 0;
		max-width: 95px;
		max-height:95px;
		border-radius: 10px;
		border-radius:50%;
		margin-right: 4%;
		background-image: url('../../assets/img/default_avatar.png');
		background-size: 100%;
		box-shadow: 2px 2px 4px #999;
		}
	.box{	
		order:2;
		height: 100%;
		width:60%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: flex-start;
		background-color: #f8f8f8;
		border-radius: 8px;
		color: #4c555c;
		padding: 10px;
		position:relative;
		word-break:break-all;
		text-align: left;
		time{
			font-size: 14px;
			margin: 6px 0;
		}
		.action{
			width: 100%;
			display: flex;
			justify-content: flex-end;
			.reply{

			}
			.agree{
				margin:auto 40px ;
				position: relative;
				&::before{
					content:'';
					display: inline-block;
					width: 10px;
					height: 16px;
					background-color: #c0c1c3;
					position:absolute;
					left: -20px;
					transform: rotate(-45deg);
					border-top-right-radius: 50%;
					border-top-left-radius: 50%;
				}
				&::after{
					content:'';
					position:absolute;
					left: -15px;
					display: inline-block;
					width: 10px;
					height: 16px;
					background-color: #c0c1c3;
					transform: rotate(45deg);
					border-top-right-radius: 50%;
					border-top-left-radius: 50%;
				}	
			}
			.agreed::before,.agreed::after{
				background-color: #f35186;
			}
			
		}
	}
	.box::before{
		content:'';
		position:absolute;
		width: 20px;
		height:20px;
		left:-9px;
		background-color: inherit;
		transform:rotate(45deg);
		border-radius: 4px;
	}
}

.isManager{
	justify-content: flex-end;
	.avatar{
		order: 3;
		margin:auto 0px auto 35px;
		background-image: url('../../assets/img/qtc_avatar.png');
	}	
	.box{
		width:60%;
		/* background-color: #9f8771; */
		/* color: #fff; */
	}
	.box::before{
		display: none;
	}
	.box::after{
		content:'';
		position:absolute;
		width: 20px;
		height:20px;
		right:-9px;
		background-color: inherit;
		transform:rotate(45deg);
		border-radius: 4px;
	}
}


.write{
	display:flex;
	flex-direction:column;
	justify-content:space-around;
	align-items:flex-start;
	text-align: left;
	color: #4C555C;
	.title{		
	font-size:16px;
	font-weight: bold;
	}
	.declar{
		color: #838383;
		font-size: 14px;
		margin-top: 15px;
	}
	label{
		display:flex;
		justify-content:flex-start;
		width:100%;
		margin:10px 0;	
		span{
			width:80px;
			text-align:left;
			display:inline-block;
			flex-shrink:0;			
		}
		
		input[type = "text"]{
			border:1px solid rgb(169, 169, 169);
			flex-grow:1;
			flex-shrink:1;
			max-width:200px;
		}
		#comment{
			height:160px;
			flex-grow:1;
			border:1px solid rgb(169, 169, 169);
		}
	}
	button{
		padding:5px 20px;
		background-color:  #acc0d7;
		font-size:15px;
		cursor: pointer;
		position: relative;
		border-radius: 10px;
		margin-top: 10px;
		opacity: 0.8;
		color: #fff;
	}
	button::after{
		content:'';
		width: 0px;
		height: 0px;
		position: absolute;
		right: -5px;
		bottom: 0px;
		border-bottom: 14px solid  #acc0d7;
		border-right: 14px solid transparent;
	}
	
}	
	
</style>