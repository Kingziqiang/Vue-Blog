<template>
	<div class="login posts animated fadeIn">
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
			var _this = this;
			this.msg="登陆中......";			
			this.login({username:username,password:password})
			.then((res) => {
				this.msg='';
				if(res.body){
					this.set_user({username: res.body.username, status: true})
					this.$router.push('/admin/amend')					
				}else{
					this.set_dialog({show:true, tip:"验证失败，请确认您的输入噢(*ﾟﾛﾟ)", resolved(){ this.show = false}})
				}
			})
			.catch((err)=>{
				console.log(err);
				this.msg='';
				this.set_dialog({show:true, tip:"网络好像不太好,稍后再试下吧(*ﾟﾛﾟ)", resolved() {this.show = false}})
			})
		}
	}
}
</script>
<style lang="scss" type="stylesheet/scss" scoped>
$border-color: #000;
.login{
	position: relative;
	width: 100%;	
	display: flex;
	justify-content: center;
	align-items: center;
	.login_form{
		width:300px;
		position: relative;
		top: 130px;
		li{
			margin:60px auto;
			height: 30px;
			display: flex;
			justify-content: center;
			input{
			 	width: 375px;
				flex-shrink: 1;
			  	border-bottom:1px solid $border-color;
			  	padding: 4px 5px;
			  	background-color: rgba(255,255,255,0);
			  	font-size:16px;
			}
			button{
				line-height: 3px;
				padding:6px ;
				width: 100%;
				font-size:16px;
				border:1px solid $border-color;
				border-radius: 20px;
				transition: 0.5s;
				&:hover{
					background-color:  $border-color;
					border-radius:0px;
					color: #fff;
				}
			}
		}
	}
}


@media screen and (max-width: 440px) {
  .login_form{
	width:3.9rem !important;
   }
   .login_form li{
   	margin: 0.8rem auto !important;
   }
}


</style>