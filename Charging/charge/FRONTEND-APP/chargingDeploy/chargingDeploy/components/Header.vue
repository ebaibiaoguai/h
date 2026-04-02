<template>
<view>
<!-- :class="['item-wrap', tabType==='workCircle' ? 'active' :''] " 
 -->	<view @click="back" :class="['define-header-wrap', hasReturn===true? 'title-background-image':'title-background-color']">
		<view class="left">
			<!-- 23摄氏度多云 -->
		</view>
		<text class="center">{{title}}</text>
		
	</view>	
</view>	
</template>

<script>
	import define from '@/utils/define'
	
	export default {
		props:{
			title:{
				type: String,
				default: ''
			},
			hasReturn:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				baseURL: define.baseURL,
			}
		},
		computed:{
			userInfo() {
				return this.$store.state.user.userInfo
			},
		},
		methods: {
			back(){
				this.$emit("back")
			},
			navToPerson(){
				uni.navigateTo({
					url:'/pages/person/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.define-header-wrap{
	display:flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height:45px;
	//padding:62rpx 52rpx 16rpx 38rpx;
	// padding:16rpx 40rpx 16rpx 40rpx;
	position:relative;
	
	background-size:110% 130%;
	background-position:-26rpx -20rpx;
	
	.left{
		font-size: 24rpx;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 34rpx;
	}
	.center{
		font-size: 32rpx;
		font-weight: 500;
		color: #000000;
		line-height: 45rpx;
		position:absolute;
		left:50%;
		// top:80rpx;
		bottom:26rpx;
		transform: translate(-50%, 0);
	}
	.right{
		width: 72rpx;
		height: 72rpx;
		border: 2rpx solid #FFFFFF;
		border-radius:36rpx;
	}
	
}

.title-background-image{
	background-image: url(/static/title-return-background.png);	
}
.title-background-color{
	background-color: #FFFFFF;
}
</style>
