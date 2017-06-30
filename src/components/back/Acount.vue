<template>
	<div class="acount">
		
		<div class="acount_form">
			
			<li>
				<input type="text" placeholder="新用户名" v-model.trim="username">
			</li>
			<li><input type="password" placeholder="密码" v-model.trim="password1"></li>
			<li><input type="password" placeholder="请再次输入密码" v-model.trim="password2"></li>
			<li><p>{{msg}}</p><button  @click="submit()">确认修改</button></li>
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
			var user = {
				username:this.username,
				password:this.password1 
			}
			var _this = this;
			this.set_dialog({
				tip:"确定要修改吗(*´ﾟ∀ﾟ｀)ﾉ ",
				hasTwobtn:true,
				show:true,
				resolved : () => {
					_this.msg = "正在提交......"
					_this.dialog_box.show = false
					_this.alterUser(user)
					.then(() => {
						console.log("fsdfsdfsfd")
						_this.msg = "修改成功";

						/*_this.$router.push('/login')*/
					})
					.catch((err) => {_this.msg = '网络貌似不太好噢~';console.log(err)})
				},
				reject: () => {
					_this.dialog_box.show = false;
				}
			})
		}
	}
}
</script>

<style type="stylesheet/scss" scoped>
.acount{
	position: absolute;
	height: 100%;
	width: 100%;
	display:block;
}
.acount p{
	text-align: left;
	margin-bottom: 5px;
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
	flex-direction: column;
	justify-content: center;
}
label img{
	height: 90%;
	margin-right:10px;
}
.acount_form input{
 	width: 375px;
	flex-shrink: 1;
  	border-bottom:1px solid #42b983;
  	padding: 4px 5px;
  	font-size:20px;
  	background-color: rgba(255,255,255,0);
}
.acount_form button{
	font-size: 20px;
	line-height: 3px;
	padding:18px ;
	width: 100%;
	/* background-color: #42b983; */
	border:1px solid #42b983;
	border-radius: 20px;
	transition: 0.5s;

}

.acount_form button:hover{
	background-color:  #42b983;
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