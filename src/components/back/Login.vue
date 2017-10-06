<template>
	<div class="login posts animated fadeIn">
		
		
		<ul class="login_form">
			<img class="login-img" src="../../assets/img/login.png"/>
			<li>
				<label for="name"><!-- <img src="../assets/img/user_icon.png"> --></label>
				<input id="name" type="text" placeholder="User name" v-model='username'>
			</li>
			<li><label for="pwd"><!-- <img src="../assets/img/pwd_icon.png"> --></label>
				<input id="pwd"type="password" placeholder="Password" v-model='password'>
			</li>
			<li><button @click="comfirm(username,password)">Login in</button></li>
		</ul>
		<p>{{msg}}</p>
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
		...mapMutations(['set_user','set_dialog', 'set_alert']),
		...mapActions(['login']),
		comfirm (username,password) {
			this.msg="登陆中......";
			this.login({username:username,password:password})
			.then((res) => {
				this.msg='';
				if(res.body){
					this.set_user({username: res.body.username, status: true});
					this.set_alert({show: true, text: '登录成功', delay: 1000});
					this.$router.push('/admin/amend');					
				}else{
					this.set_alert({show: true, text: '请确认您的输入', delay: 1000});
				}
			})
			.catch((err)=>{
				this.msg='';
				this.set_alert({show:true, text:"网络好像不太好,稍后再试下吧(*ﾟﾛﾟ)", delay: 1000});
			})
		}
	}
}
</script>
<style lang="scss" type="stylesheet/scss" scoped>
$border-color:#444 ;
.login{
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	img.login-img{
		position: absolute;
		width: 60px;
		left: 0;
		right: 0;
		margin: auto;
		margin-top: -17.5%;	
	}
	.login_form{
		width:260px;
		position: relative;
		li{
			margin:55px auto;
			height: 25px;
			display: flex;
			justify-content: center;
			input{
			 	width: 260px;
			  	border-bottom:1px solid $border-color;
			  	padding: 4px 5px;
			  	
			}
			button{
				line-height: 3px;
				padding:6px ;
				width: 100%;
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