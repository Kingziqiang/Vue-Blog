<template>
	<div class="about_me posts animated fadeIn">
	
		<div class="base-info">
			<!-- <img src="../../assets/img/qtc_avatar.png" class="avatar"> -->
			<ul>
				<li><span>邮箱</span><span>1770147149@qq.com</span></li>
				<li><span>学校</span><span>中南民族大学</span></li>			
				<li><span>QQ</span><span>1770147149</span></li>
				
			</ul>
		</div>
		<!-- <div class="write" id="write">
			<p class="title">来唠嗑呗~</p>
			<p class="declar">电子邮件地址不会被公开。 必填项已用*标注</p>
			<label for="comment"> <span>内容</span> <textarea id="comment" v-model="content"></textarea> </label>
			<label for="name"> <span>称呼*</span> <input type="text" name="" id="name" v-model="name"> </label>
			<label for="email"> <span>电子邮件*</span> <input type="text" name="" id="email" v-model="email"> </label>
			<button @click="submit({content, name, email})">与我联系</button>
		</div> -->
	</div>
</template/>

<script>
import {mapActions, mapState,mapGetters,mapMutations} from 'vuex'

export default {
	created (){
		this.set_title('About me');
	},
	methods: {
	  ...mapMutations(['set_title']),
	}
}

</script>

<style lang="scss" type="stylesheet/scss" scoped>
.about_me{	
	width: 60%;
	position: relative;
	margin: 30px auto;
}
.base-info{
	display: block;	
	margin:80px auto;
	position: relative;	
	border-radius: 4px;
	/* background-color: rgb(227, 223, 240); */
	ul{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
/* 		padding: 50px auto; */
		li{
			position: relative;
			display: flex;
			width: 70%;
			justify-content: space-between;
			margin: 20px auto;
			color: #4C555C;
			font-weight: bold;
			font-size: 16px;
			span{
				justify-content: space-between;
			}
			span:nth-child(2){
				background-color: #f8f8f8;
				padding: 4px 10px;
			}		
		}
	}
	
}

.write{
	display:flex;
	flex-direction:column;
	justify-content:space-around;
	align-items:flex-start;
	text-align: left;
	.title{
	
	font-size:16px;
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
		background-color: #f5dcb9;;
		color:#4C555C;
		font-size:15px;
		cursor: pointer;
		position: relative;
		border-radius: 10px;
		margin-top: 10px;
		opacity: 0.8;
		font-weight: bold;
		&::after{
			content:'';
			width: 0px;
			height: 0px;
			position: absolute;
			right: -6px;
			bottom: 0px;
			border-bottom: 14px solid #f5dcb9;
			border-right: 14px solid transparent;
		}
		&:hover{
			/* color: #fff; */
			background-color: #f8f8f8;
			&::after{
				border-bottom: 14px solid #f8f8f8;
			}
		}
	}	
}	

 @media screen and (max-width: 500px) {
 	.about_me{	
		width: 85%;
	}
 }
</style>