<template>
	<view class="page-background device-width">
		<Header title="充电进度" :hasReturn="true" @back="back"/>
		<uni-card>
			<view class="center">
				<view class="progress_background">
					<text class="progress_info"> {{progress}}%</text>
				</view>
			</view>


			<view>
				<view class="detail_info">
					<view>
						<view class="center">电价(元/度)</view>
						<view class="center">1.50</view>
					</view>
					<view>
						<image src="../../static/line.png" class="line"></image>
					</view>
					<view>
						<view class="center">充电时长(min)</view>
						<view class="center">{{(count/60).toString().substr(0,4)}}</view>
					</view>

					<view>
						<image src="../../static/line.png" class="line"></image>
					</view>
					<view>
						<view class="center">充电金额(元)</view>
						<view class="center">{{(count/60*2).toString().substr(0,4)}}</view>
					</view>

				</view>
			</view>
		</uni-card>
		<button hover-class="btn-hover" class="stop-btn blue-btn" @tap="stopCharging">
			{{stopBtnText}}</button>
		<!-- 
		 -->

	</view>
</template>

<script>
	import {
		apiProgress
	} from '@/apis/progress.js';
		import Header from '@/components/Header.vue'

	export default {
		components:{Header },
		data() {
			return {
				progress: "",
				interval: null,
				count: 1,
				isOver: false
			}
		},
		computed: {
			stopBtnText: function() {

				return this.isOver ? "返回" : "停止充电"
			}
		},
		methods: {
			back(){
				uni.navigateTo({
					url: "/pages/scanChanging/scanChanging"
				})
			},
			stopCharging() {

				// if (this.isOver) {
				// 	uni.navigateTo({
				// 		url: "/pages/scanChanging/scanChanging"
				// 	})
				// 	return
				// }
				// this.isOver = !this.isOver

				clearInterval(this.interval)
				//this.count = 0
				let time = (this.count / 60).toString().substr(0, 4)
				let money = (this.count / 60 * 2).toString().substr(0, 4)
				uni.navigateTo({
					url: "/pages/order-detail/order-detail?time=" + time + "&money=" + money
				})

			},
			getProgress() {
				apiProgress(1).then(res => {
					console.log(res)
					this.progress = res.data.chargingCapacity * 100 / res.data.totalCapacity
					if (this.progress >= 100) {
						this.progress = 100
						clearInterval(this.interval)
						uni.showModal({
							content: "已充满"
						})
					}
				})
			}
		},
		onLoad() {

			uni.showModal({
				content: "你扫描的是模拟充电枪，显示的是模拟数据"
			})
			this.getProgress()

			var vue = this;
			this.interval = setInterval(function() {
				console.log("interval")
				vue.getProgress()
				vue.count++
			}, 1000)

		},
		onHide(){
			console.log("onHide")
			clearInterval(this.interval)
		}
	}
</script>

<style>
	.progress_background {
		background-image: url(../../static/charging_progress@2x.png);
		background-size: cover;
		width: 396rpx;
		height: 396rpx;
		margin-top: 56rpx;
	}

	.progress_info {
		position: relative;
		top: 248rpx;
		left: 160rpx;
		font-size: 32rpx;
	}

	.detail_info {
		font-size: 28rpx;
		color: #0091FF;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 24rpx;
	}



	.stop-btn {
		margin-top: 48rpx;
	}

	.line {
		width: 2rpx;
		height: 52rpx;
		margin-left: 24rpx;
		margin-right: 24rpx;
	}

	.full {
		width: 100%;
		height: 100vh;
	}



	.chargingInfo {
		width: 100%;
		margin: 48rpx;
	}

	.list-box {
		color: blue;
		column-count: 3;
	}

	.topSize {
		width: 128px;
		height: 35px;
	}

	.lineSize {
		width: 95px;
		height: 22px;
	}

	.bottomSize {
		width: 128px;
		height: 43px;
	}

	.infoWidth {
		width: 33.3vw;
		padding: 0px;
		margin: 0px;
		/* background-color: red;
		border: #00FF00 1px solid; */
	}

	.chargingInfoTitle {
		font-size: 24rpx;
	}

	.gridStyle {
		color: blue;

	}

	.itemHeight {
		height: 50px;
	}


	.textRight {
		text-align: right;
	}

	.btn-hover {
		background-color: #009166;
	}
</style>
