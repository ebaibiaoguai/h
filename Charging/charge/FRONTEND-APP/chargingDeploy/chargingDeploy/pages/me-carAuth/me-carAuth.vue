<template>
	<view class="page-background device-width">
		<Header title="车辆认证" :hasReturn="true" @back="back"/>
		
		<view class="page-padding">
			<uni-list>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							品牌
						</view>
					</template>

					<template v-slot:footer>
						<text><input @click="toCarType" placeholder="请选择品牌车型"
								placeholder-style='text-align:right'  v-model="name"/></text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							认证我的车辆
						</view>
					</template>

					<template v-slot:footer>
						<evan-switch @change="onChagne" v-model="checked"></evan-switch>

					</template>
				</uni-list-item>
			</uni-list>
			<view v-show="checked">
				<view class="driver-cred center">
					<text class="driver-title">中华人民共和国机动车行驶证</text>

					<image src="/static/driver-credentials.png" class="driver-card"></image>


				</view>


				<button class="upload-btn">上传行驶证照片</button>


				<uni-list>
					<uni-list-item>
						<template v-slot:header>
							<view class="slot-box">
								车牌号
							</view>
						</template>

						<template v-slot:footer>
							<text><input placeholder="京A6699" placeholder-style='text-align:right' /></text>
						</template>
					</uni-list-item>
					<uni-list-item>
						<template v-slot:header>
							<view class="slot-box">
								车辆识别代码
							</view>
						</template>

						<template v-slot:footer>
							<text><input placeholder="LFVBA14B3Y3014078" placeholder-style='text-align:right' /></text>

						</template>
					</uni-list-item>
					<uni-list-item>
						<template v-slot:header>
							<view class="slot-box">
								发动机号码
							</view>
						</template>

						<template v-slot:footer>
							<text><input placeholder="E3E1E034465" placeholder-style='text-align:right' /></text>

						</template>
					</uni-list-item>
				</uni-list>
			</view>

			<view>
				<button class="blue-btn btn-margin" @click="back">保存</button>
			</view>
		</view>
	</view>

</template>

<script>
		import Header from '@/components/Header.vue'

	export default {
		components:{Header },
		data() {
			return {
				checked: false,
				name:""

			}
		},
		
		onLoad(options) {
			this.name=options.name
			//debugger
		},
		methods: {
			onChagne(e) {
				console.log(e)
				
			},
			toCarType() {
				uni.navigateTo({
					url: "/pages/me-carAuth_carType/me-carAuth_carType"
				})
			},
			back(){
				
				uni.navigateTo({
					url:"/pages/me/me"
				})
				console.log("back")
			}
		}
	}
</script>

<style>
	.driver-cred {
		display: flex;
		flex-direction: column;
		background-color: #D7D7D7;
		width: 100%;
		height: 360rpx;
	}

	.driver-title {
		color: #333333;
	}

	.driver-card {
		margin-top: 40rpx;
		width: 246rpx;
		height: 176rpx;
	}

	.upload-btn {
		background-color: #1DB3F3;
		height: 60rpx;
		width: 375px;
		border-radius: 42rpx;
		color: #FFFFFFFF;
		font-size: 24rpx;
		margin-top: 24rpx;
		margin-bottom: 24rpx;
	}
</style>
