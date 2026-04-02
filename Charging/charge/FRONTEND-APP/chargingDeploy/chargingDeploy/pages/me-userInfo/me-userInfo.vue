<template>
	<view class="page-background device-width">
		<Header title="修改我的信息" :hasReturn="true" @back="back"/>
		<view class="page-padding">
			<view class="center">
				<image class="profilePhoto" src="../../static/me-profilePhoto.png"></image>
			</view>
			<uni-list>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							会员名
						</view>
					</template>

					<template v-slot:footer>
						<text><input placeholder="请输入会员名" placeholder-style='text-align:right' /></text>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							生日
						</view>
					</template>

					<template v-slot:footer>
						
						<input placeholder="2000/10/10" type="" placeholder-style='text-align:right' />
					
					</template>
				</uni-list-item>

				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							性别
						</view>
					</template>

					<template v-slot:footer>
						<radio-group >
							<label class="radio">
								<radio value="r1" checked="true" />男
							</label>
							<label class="radio">
								<radio value="r2" />女
							</label>
						</radio-group>
					</template>
				</uni-list-item>
				<uni-list-item>
					<template v-slot:header>
						<view class="slot-box">
							邮箱
						</view>
					</template>

					<template v-slot:footer>
						<text><input placeholder="请输入邮箱" placeholder-style='text-align:right' /></text>
					</template>
				</uni-list-item>
			</uni-list>

			<view>
				<button class="blue-btn btn-margin" @click="onSaveClick">保存</button>
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

			}
		},
		methods: {
			maskClick(e) {
				console.log('----maskClick事件:', e);
			},
			onSaveClick(){
				uni.navigateTo({
					url:"/pages/me/me"
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
	.profilePhoto {
		width: 132rpx;
		height: 132rpx;
		margin: 48rpx;
	}
	.date-picker{
		z-index: 10000;
	}
</style>
