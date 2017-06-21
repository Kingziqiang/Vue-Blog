<template>
	<div id="addArticle">
		<ul class="form">
				<li>
					<input type="text" class="text" placeholder="标题" v-model="title">
					<input type="text" class="text" placeholder="标签,用‘,’分隔" v-model="tags">
				</li>

				<li>
					<textarea class="text" placeholder="来写点儿什么呗~" v-model="content"></textarea>
				</li>

				<li>
					<button  @click="submit()">submit</button>
			    	<button >resert</button>
			    </li>
		</ul>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	data(){
		return {
			title:'',
			tags:[],
			content:''

		}
	},
	computed:{
		newArticle: function() {
			return{
				title:this.title,
				tags:this.tags.split(','),
				content:this.content,
				date:new Date()
			}
		},
	},
	methods:{
		...mapActions(['saveArticle']),
		submit:function (){
			console.log(this.newArticle)
			this.saveArticle(this.newArticle)
			.then(() => {

			})
			.catch((err) => {console.log(err)})
			this.$router.push('/admin/amend');
		}
	}
}
</script>
<style type="stylesheel/scss" scoped>
#addArticle{
	position: relative;
	display: inline-block;
	width: 90%;
	height: 100%;
	position: relative;
}
#addArticle .form{
	width: 3rem;
	position: relative;
	margin:0.5rem auto;

}

#addArticle .form li{
	margin-bottom:0.1rem !important;
	padding:0px !important;
	
}
.form li:first-child{
	position: relative;
	overflow: hidden;
}

input[type="text"]{
	width: 1.3rem;
	float: right;
	display: inline-block;
	border: 1px solid #8bc34a;
	border-radius: 4px;
	padding:6px 4px;
	font-size: 18px;
	
}
input[type="text"]:first-child{
	float: left;
}

textarea{
	width: 100%;
	height: 320px;
	font-size: 18px;
	border: 1px solid #8bc34a;

}

button{
	margin:0 0.1rem;
	padding:6px 10px;
	border-radius: 10px;
	border:1px solid #8bc34a;
	font-size: 18px;
	width:30%;
}

@media screen and (max-width: 450px){
	
	.form{
		width: 100%;
		margin-top: 2rem;
	}
	.form li{
		margin-bottom:0.2rem !important;
	}

	input[type="text"]{
	width: 1.7rem;
	float: right;
	display: inline-block;
	}

	textarea{
		width: 97%;
		height:3rem;
		border: 1px solid #8bc34a;
		font-size: 20px;
	}
}
</style>