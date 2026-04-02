<template>
	<view class="page-background device-width">
		<Header title="我的"/>
		<view class="page-padding">
			<view class="center">
				<image @click="toUserInfo" class="profilePhoto" src="../../static/me-profilePhoto.png"></image>
			</view>
			<uni-list>
				<uni-list-item thumb="/static/me-point.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					title="我的积分" />
				<uni-list-item thumb="/static/me-wallet.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					title="我的钱包" />
				<uni-list-item thumb="/static/me-order.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					title="我的订单" />
				<uni-list-item thumb="/static/me-coupon.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					title="优惠卷" />
				<uni-list-item clickable @click="toCarAuth" thumb="/static/me-carAuth.png" :show-extra-icon="true" showArrow
					:extra-icon="extraIcon" title="车辆认证" />
				<uni-list-item thumb="/static/me-settings.png" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
					title="设置" />
			</uni-list>
		</view>
		<tab-bar tabType="me"></tab-bar>
	</view>
</template>

<script>
		import TabBar from '@/components/TabBar'
		import Header from '@/components/Header.vue'
	export default {
		components:{ TabBar,Header },
		data() {
			return {
				extraIcon: {
					color: '#4cd964',
					size: '22',
					type: 'gear-filled'
				}
			}
		},
		methods: {
			toCarAuth(){
				uni.navigateTo({
					url:"/pages/me-carAuth/me-carAuth"
				})
			},
			toUserInfo() {
				uni.navigateTo({
					url: "/pages/me-userInfo/me-userInfo"
				})
			}
		}
	}
</script>

<style>
	.profilePhoto {
		width: 132rpx;
		height: 132rpx;
		margin: 48rpx;
	}
</style>
