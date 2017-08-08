<template>
	<div class="wrapper">
		<my-header></my-header>
		<router-view></router-view>
		<my-footer></my-footer>
	</div>
</template>

<script>
import MyHeader from './MyHeader.vue'
import MyFooter from './MyFooter.vue'

export default {
  	components: {
      MyHeader,
      MyFooter
  	}
  }
</script>
<style type="stylesheet/scss" scoped>
.wrapper{
	width: 100%;
	position: relative;

	
}
</style>
