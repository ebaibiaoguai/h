<template>
	<view class=" page-background device-width">
		<Header title="扫码充电"/>
		
		<view>
			<button class="blue-btn btn-padding-top" @click="scan" > 扫充电桩</button>
			<button class="yellow-btn btn-margin" @click="scan"> 扫枪</button>
		</view>
		<tab-bar tabType="scanCharging"></tab-bar>
	</view>
</template>

<script>
	import TabBar from '@/components/TabBar'
	import Header from '@/components/Header.vue'
	export default {
		components: {
			TabBar,
			Header
		},
		data() {
			return {

			}
		},
		methods: {
			scan() {
				//浏览器中运行
				uni.navigateTo({
					url: "../chargingProgress/chargingProgress"
				})
				// 调起条码扫描
				uni.scanCode({
					scanType: ['qrCode'],
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
						uni.navigateTo({
							url: "../chargingProgress/chargingProgress"
						})
					}
				});
			}
		},
		onLoad() {
			console.log("scanCharging onLoad")

		},
		onShow() {
			console.log("scanCharing onShow()")
			//debugger

		}
	}
</script>

<style>
 .btn-padding-top{
	 margin-top: 300px;
 }
</style>
