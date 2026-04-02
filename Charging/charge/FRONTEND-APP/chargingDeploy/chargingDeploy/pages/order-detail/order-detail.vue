<template>
	<view class="page-background  device-width">
		<Header title="订单详情" :hasReturn="true" @back="back"/>
		<view class="margin">
			<view class="title"><text>充电订单结束通知</text></view>
			<view class="row row-space">
				<view class="attribute-name"><text>订单编号:</text></view>
				<view class="value"><text class="value-left-space">65329577643</text></view>			
			</view>
			<view class="row row-space">
				<view class="attribute-name"><text>设备编号:</text></view>
				<view class="value"><text class="value-left-space">4GM00005548</text></view>
			</view>
			<view class="row row-space">
				<view class="attribute-name"><text>充电时长:</text></view>
				<view class="value"><text class="value-left-space">{{time}}分钟</text></view>
			</view>
			<view class="row row-space">
				<view class="attribute-name"><text>结束原因:</text></view>
				<view class="value"><text class="value-left-space">检测到负载功率降低为0</text></view>
			</view>
			<view class="row row-space">
				<view class="attribute-name"><text>消费金额:</text></view>
				<view class="value"><text class="value-left-space">{{money}}元</text></view>
			</view>
			
			<view class="row row-space">
				<view class="attribute-name"><text>备注信息:</text></view>
				<view class="value"><text class="value-left-space">充电之后帐户余额13.32元。</text>
				<!-- 本次充电之后帐户余额13.32元。造成该订单提交断电原因 1:充电器松动或脱落; 2:充电器待机,停止充电;如有疑问请致电运营商18912627609 -->
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
		import Header from '@/components/Header.vue'

	export default {
		components:{Header},
		data() {
			return {
				time:"",
				money:""
			}
		},
		methods: {
			back(){
				uni.navigateTo({
					url:"/pages/scanChanging/scanChanging"
				})
			}
		},
		onLoad(options) {
			this.time=options.time
			this.money=options.money
		}
	}
</script>

<style>
	.margin{
		padding:24px 48px;
	}
	.title{
		font-size: 48rpx;
		margin-bottom: 57.6rpx;
	}
	.row-space{
		margin-bottom: 24rpx;
	}
	.
 .attribute-name{
	
	 width: 187.5px;	 
	 color: gray;
 }
 .value{
	 width: 562.5px;
	 color: royalblue;
 }
 .value-left-space{
	 margin-left: 48rpx;
 }
</style>
