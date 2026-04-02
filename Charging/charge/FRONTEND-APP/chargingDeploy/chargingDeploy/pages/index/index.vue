<template>
	<view class="content page-background device-width logo-page">
		<view class="content">
			<!-- <image class="logo" src="/static//logo.jpg"></image> -->
			<!-- <cu-progress class="progress space" :value="value" infoSize="16px" handleSize="16px"  handleColor="#0091FF"
			 activeColor="#2EABFF" noActiveColor="#FFFFFF"></cu-progress> -->
			
		</view>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '达易充充电管理系统',
				value:1,
				interval:{},
				
			}
		},
		onLoad() {
			let vue=this
			this.interval=setInterval(function(){
				vue.value++
				console.log("value="+vue.value)
				if (vue.value>=100){
					clearInterval(vue.interval)
						uni.navigateTo({
							url: '/pages/nearbyStation/nearbyStation'
						});
				}
			},30)
			// setTimeout(function() {
			// 	uni.navigateTo({
			// 		url: '/pages/nearbyStation/nearbyStation'
			// 	});
			// }, 3000)
		},
		methods: {

		}
	}
</script>

<style>
	.logo-page{
		background-image: url(/static/logo.jpg);
		background-size: cover;
		width: 750px;
		height: auto;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
	}

	.logo {
		height: 162rpx;
		width: 162rpx;
	}
	.space{
		margin-top: 48px;
	}

</style>
