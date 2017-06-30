<template>
  <div class="footer">
	  <ul>
	  	<li>Copyright © 2017 wangfang</li>
	  	<li>Powered by Vue, Designed by me<router-link to="/login" tag="span">站长登录</router-link></li>
	  </ul>    
  </div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" scoped>
.footer{
  width:100%;
  display: block;
  position: relative;
  margin-top: 30px;
  background-color: #ebebeb;
  padding: 40px 0px;
}
.footer ul{
	list-style: none;
	/* padding-bottom:20px; */
}
.footer li{
	margin-top: 10px;
}
.footer li span{
	border-left: 1px solid #999;
	margin-left: 20px;
	padding-left: 5px;
	color: #8bc34a;
	cursor:pointer;

}
.footer li span:hover{
	border-bottom: 2px solid #8bc34a;
}

</style>
