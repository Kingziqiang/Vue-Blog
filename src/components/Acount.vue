<template>
	<div class="acount">
		<p>{{msg}}</p>
		<div class="acount_form">
			<li>
				<input type="text" placeholder="新用户名" v-model.trim="username">
			</li>
			<li><input type="password" placeholder="密码" v-model.trim="password1"></li>
			<li><input type="password" placeholder="请再次输入密码" v-model.trim="password2"></li>
			<li><button  @click="submit()">确认修改</button></li>
		</div>
	</div>
</template>
<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
	data(){
		return{
			username:'',
			password1:'',
			password2:'',
			msg:''
		}
	},
	computed:{
		...mapState(['dialog_box'])
	},
	methods:{
		...mapMutations(['set_dialog']),
		...mapActions(['alterUser']),
		submit:function(){
			this.set_dialog({tip:"确定要修改吗(*´ﾟ∀ﾟ｀)ﾉ ",hasTwobtn:true,show:true});

			let user = {
				username:this.username,
				password:this.password1 
			}
			console.log(user);
			var _this = this;

			this.dialog_box.resolved = () => {
				_this.msg = "正在提交......"
				_this.alterUser(user).then(() => {
					_this.msg = ""
				})
			};

			this.dialog_box.reject = () => {
				_this.dialog_box.show = false;
			}
			
		}
	}
}
</script>

<style type="stylesheet/scss">
.acount{
	position: absolute;
	height: 100%;
	width: 100%;
	display:block;
}
.acount p{
	position: absolute;
	top:6%;
	font-size: 20px;
}
.acount_form{
	width:390px;
	margin: 200px auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.acount_form li{
	margin-bottom:70px;
	width:100%;
	height: 30px;
	display: flex;
	justify-content: center;
}
label img{
	height: 90%;
	margin-right:10px;
}
 input{
 	width: 375px;
	flex-shrink: 1;
  	border-bottom:1px solid #8bc34a;
  	padding: 4px 5px;
  	font-size:20px;
  	background-color: rgba(255,255,255,0);
}
.acount_form button{
	font-size: 20px;
	line-height: 3px;
	padding:18px ;
	width: 100%;
	/* background-color: #8bc34a; */
	border:1px solid #8bc34a;
	border-radius: 20px;
	transition: 0.5s;

}

.acount_form button:hover{
	background-color:  #8bc34a;
	border-radius:0px;
	color: #fff;
}
/*
input[type="text"]:focus{
	border: 1px solid #d1d8e6;
}
input[type="button"]{
	border-radius: 15px;
	border: 1px solid #d1d8e6;
	
}
 */
@media screen and (max-width: 440px) {
  .acount_form{
	width:3.9rem !important;
   }
   .acount_form li{
   	margin-bottom: 0.7rem;
   }
   input{
   	font-size:18px;
   }
}


</style>