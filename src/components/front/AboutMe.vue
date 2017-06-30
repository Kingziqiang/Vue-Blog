<template>
	<div class="about_me posts animated fadeIn">
	
	<div class="wrapper">
		<img src="../../assets/img/qtc_avatar.png" class="avatar">
		<ul>
			<li><span>邮箱</span><span>1770147149@qq.com</span></li>
			<li><span>学校</span><span>中南民族大学</span></li>			
			<li><span>QQ</span><span>1770147149</span></li>
			<li><span>求职意向</span><span>前端实习</span></li>
		</ul>
	</div>
	</div>
</template/>

<style type="stylesheet/scss" scoped>
.about_me{
	height: 600px;
	width: 100%;
	position: relative;
}
.wrapper{
	display: block;
	background-color: #444;
	width:58%;
	margin:200px auto;
	position: relative;
	padding-bottom:30px; 
	color: #fff;
}
.avatar{
	width: 200px;
	margin-top: -10%;
	border-radius: 50%;

}

ul li{
	position: relative;
	margin:30px auto;
	display: flex;
	justify-content: space-between;
	padding:0 70px;
	font-size:24px;
}
span:first-child {
	display: inline-block;
	width:40%;
	float: left;
	text-align: left;

}
span:nth-child(2){
	text-align: left;
	width:30%;
	display: inline-block;
	/* float: right; */
}




</style>