<template>
	<view class="tabBar-wrap device-width">
		<view :class="['item-wrap', tabType==='nearbyStation' ? 'active' :''] " @click="navToNearbyStation">	
<!-- 				
 -->			<image  :src="tabType==='nearbyStation' ?'/static/nearby_selected@2x.png':'/static/nearby_normal@2x.png'" style="width: 26px; height: 28px;"></image>
			<text class="txt">附近电桩</text>
		</view>

		<view :class="['item-wrap', tabType==='scanCharging' ? 'active' :''] " @click="navToScanCharing">			
			<image :src="tabType==='scanCharging' ?'/static/scan_selected@2x.png':'/static/scan_normal@2x.png'"  style="width: 28px; height: 26px;"></image>
			<text class="txt">扫码充电</text>
		</view>

		<view :class="['item-wrap', tabType==='me' ? 'active' :''] " @click="navToMe">			
			<image :src="tabType==='me' ?'/static/me-selected@2x.png':'/static/me-normal@2x.png'" style="width: 26px; height: 29px;"></image>
			<text class="txt">我的</text>
		</view>
	</view>
</template>

<script>
	const Watermark_uni_plugin = uni.requireNativePlugin("Watermark_uni_plugin")

	export default {
		props: {
			tabType: {
				type: String,
				default: 'nearbyStation'
			}
		},


		methods: {
			navToNearbyStation() { //跳转工作圈
				if (this.tabType == 'nearbyStation') return;
				uni.navigateTo({
					url: '/pages/nearbyStation/nearbyStation',
					animationType: 'none',
					animationDuration: 0
				})
			},
			navToScanCharing() { //跳转工单
				if (this.tabType == 'scanCharing') return;
				uni.navigateTo({
					url: '/pages/scanChanging/scanChanging',
					animationType: 'none',
					animationDuration: 0
				})
			},
			navToMe() { //跳转工单
				if (this.tabType == 'me') return;
				uni.navigateTo({
					url: '/pages/me/me',
					animationType: 'none',
					animationDuration: 0
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.tabBar-wrap {
		position: fixed;
		z-index: 100;
		left: 0;
		right: 0;
		bottom: 0;
		height: 55px;
		background: #fff;
		box-shadow: 0px 4rpx 28rpx 0rpx rgba(195, 195, 195, 0.5);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;

		.item-wrap {
			color: #B0BED4;
			display: flex;
			flex-direction: column;
			align-items: center;

			&.active,
			&.active .txt {
				color: #3D8AFF;
			}

			.iconfont {
				font-size: 38rpx;
			}

			.txt {
				font-size: 24rpx;
				font-weight: 400;
				color: #B0BED4;
				margin-top: 8rpx;
			}
		}


	}
</style>
