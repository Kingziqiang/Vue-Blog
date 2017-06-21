<template>
	<div class="login">
		<p>{{msg}}</p>
		<ul class="login_form">
			<li>
				<label for="name"><!-- <img src="../assets/img/user_icon.png"> --></label>
				<input id="name" type="text" placeholder="User name" v-model='username'>
			</li>
			<li><label for="pwd"><!-- <img src="../assets/img/pwd_icon.png"> --></label>
				<input id="pwd"type="password" placeholder="Password" v-model='password'>
			</li>
			<li><button @click="comfirm(username,password)">Login in</button></li>
		</ul>
	</div>
</template>

<script>
import {mapActions,mapMutations,mapState} from 'vuex'
export default {
	data () {
		return{
			username:'',
			password:'',
			msg:''
		}
	},
	computed: {
		...mapState(['user','dialog_box'])
	},
	methods: {
		...mapMutations(['set_user','set_dialog']),
		...mapActions(['login']),
		comfirm (username,password) {
			this.msg="登陆中......";
			this.dialog_box.resolved = () => {this.dialog_box.show = false}; //设置comfirm的回调函数

			this.login({username:username,password:password})
			.then((res) => {
				this.msg='';
				if(res.body){
					this.set_user(res.body)
					this.$router.push('/admin/amend')					
				}else{
					this.dialog_box.reject = () => {this.dialog_box.show = false};
					this.set_dialog({show:true,tip:"验证失败，请确认您的输入噢(*ﾟﾛﾟ)",hasTwobtn:false})
				}
			})
			.catch((err)=>{
				console.log(err);
				this.msg='';
				this.set_dialog({show:true,tip:"服务好像出了点问题,稍后再试下吧(*ﾟﾛﾟ)",hasTwobtn:false})
			})

		}
}
}
</script>
<style type="stylesheet/scss">
.login{
	position: relative;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.login p{
	position: absolute;
	top:6%;
	font-size: 20px;
}
.login_form{
	width:390px;
}

.login_form li{
	/* background-color: red; */
	margin-bottom:70px;
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
.login_form button{
	font-size: 20px;
	line-height: 3px;
	padding:18px ;
	width: 100%;
	/* background-color: #8bc34a; */
	border:1px solid #8bc34a;
	border-radius: 20px;
	transition: 0.5s;

}

.login_form button:hover{
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
  .login_form{
	width:3.9rem !important;
   }
   .login_form li{
   	margin-bottom: 0.7rem;
   }
   input{
   	font-size:18px;
   }
}


</style>