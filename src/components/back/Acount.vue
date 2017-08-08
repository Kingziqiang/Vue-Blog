<template>
	<div class="acount">		
		<ul class="acount_form">			
			<li>
				<input type="text" placeholder="新用户名" v-model.trim="username">
			</li>
			<li><input type="password" placeholder="密码" v-model.trim="password1"></li>
			<li><input type="password" placeholder="请再次输入密码" v-model.trim="password2"></li>
			<li><p>{{msg}}</p><button  @click="submit({username, password1, password2})">确认修改</button></li>
		</ul>
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
		submit(payload) {
			const {username, password1, password2} = payload;
			if(username.length === 0 || password1.length === 0){
				this.set_dialog({tip: "还有必填项没有填噢(ﾟﾛﾟﾉ)ﾉ", show: true, resolved() {this.show = false}})
			}
			else if(password1 !== password2){
				this.set_dialog({tip: "两次密码输入不一致噢(ﾟﾛﾟﾉ)ﾉ", show: true, resolved() {this.show = false}})
			}
			else{
				const _this = this;
				function resolved(){
					const __this = this;
					_this.alterUser({username, password: password1})
					.then(function() {__this.show = false;})
					.catch(function(err) {
						if(err){
							_this.set_dialog({tip: "网络好像不太好噢，稍后试试吧(ﾟﾛﾟﾉ)ﾉ", show: true, resolved() {this.show = false}});
							console.log(err);
						}
					})
				}
				this.set_dialog({tip: "确定要修改吗(ﾟﾛﾟﾉ)ﾉ", hasTwobtn: true, show: true, resolved, reject() {this.show = false}})				
			} 
		}
	}
}
</script>

<style lang="scss" type="stylesheet/scss" scoped>
$border_color: #000;

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
	width:310px;
	margin: 200px auto auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	li{
		margin-bottom:40px;
		width:100%;
		height: 32px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		input{
		 	width: 100%;
			flex-shrink: 1;
		  	border-bottom:1px solid $border_color;
		  	padding: 4px 0px 4px 5px;		  
		  	background-color: rgba(255,255,255,0);
		}
		button{			
			padding:10px auto;
			height: 100%;
			width: 100%;
			border:1px solid $border_color;
			border-radius: 20px;
			transition: 0.5s;
		}
		button:hover{
			background-color:  $border_color;
			border-radius:0px;
			color: #fff;
		}
	}
}


@media screen and (max-width: 440px) {
  .acount_form{
	width:3.9rem !important;
   }
   .acount_form li{
   	margin-bottom: 0.7rem;
   }
   input{

   }
}


</style>