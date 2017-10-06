<template>
	<div class="alert articles posts animated fadeIn" v-if="alert.show">
		{{alert.text}}
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
	computed:{
		...mapState(['alert'])
	}
}	
</script>
<style lang="scss" type="stylesheel/scss" scoped>
.alert{
    width: 120.5px;
    height: 60px;
    background-color: rgba(0,0,0,0.2);
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top:200px;
    border-radius: 8px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
}
</style>