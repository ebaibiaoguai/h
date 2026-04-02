<template>
	<view class="page-background device-width">

		<view v-show="showList">

			<Header title="充电站列表" :hasReturn="true" @back="listReturnClick" />

			<scroll-view :scroll-top="0" scroll-y="true" :style="{ height: winHeight-100 + 'px' }">
				<uni-card v-for="station in stationList" v-on:click="stationClick(station,'showList')"
					:key="station.id">
					<view>
						<view class="row">
							<view style="width: 90%;">
								<view class="station-name">{{station.stationName}}</view>
								<view class="station-address">{{station.address}}</view>
							</view>
							<view style="width: 10%;">
								<image class="to-detail" src="/static/to-detail@2x.png"></image>
							</view>
						</view>

						<view class="station-desc">
							促销 | 充过 | 公共 | 自营<br>
						</view>
						<view class="station-price">
							直流桩 | 1.5元/度
						</view>
					</view>
				</uni-card>

			</scroll-view>

		</view>

		<view v-show="showMap">
			<Header title="附近电桩" />
			<view>
				<!-- <view class="page-body">
					<view class="page-section page-section-gap"> -->
				<map :scale="mapScale" v-bind:style="'width: 100%; height: 100vh;'" :latitude="latitude"
					:longitude="longitude" :markers="markers" @markertap="markertap">
				</map>

				<cover-view class="map-cover-view center">
					<input @click="showSearchClick" placeholder="  输入站点名称" class="station-input" />
					<view @click="isShowFilter=true"><text>筛选</text>
						<image class="filter-image" src="/static/filter@2x.png"></image>
					</view>


					<image @click="goList" class="cover-image" src="/static/list.png"></image>
				</cover-view>
				<cover-view v-show="isShowFilter" class="filter-cover-view">
					<uni-list>
						<uni-list-item>
							<template v-slot:footer>
								<text @click="reset">重置</text>
							</template>
						</uni-list-item>
						<uni-list-item>
							<template v-slot:header>
								<view class="slot-box">
									距离(KM)
								</view>
							</template>

							<template v-slot:footer>
								<view class="row"><input v-model="filter.distanceStart" class="input-border"
										style="margin-right: 48rpx;" />
									<input v-model="filter.distanceEnd" class="input-border" />
								</view>

							</template>
						</uni-list-item>
						<uni-list-item>
							<template v-slot:header>
								<view class="slot-box">
									电价范围
								</view>
							</template>

							<template v-slot:footer>
								<view class="row">
									<input v-model="filter.priceStart" class="input-border"
										style="margin-right: 48rpx;" />
									<input v-model="filter.priceEnd" class="input-border" />
								</view>

							</template>
						</uni-list-item>
						<uni-list-item>
							<template v-slot:header>
								<view class="slot-box">
									充电桩类型
								</view>
							</template>

							<template v-slot:footer>
								<text class="text-button" @click="speedSelect('fast')" style="margin-right: 48rpx;"
									:class="filter.fastChargingSelected?'speed-button-background':''">快充</text>
								<text class="text-button" @click="speedSelect('slow')"
									:class="filter.slowChargingSelected?'speed-button-background':''">慢充</text>
							</template>
						</uni-list-item>

					</uni-list>
					<button class="filter-submit-btn" @click="onFilterBtnClick">确定</button>
				</cover-view>

				<!-- </view>
				</view> -->
			</view>


		</view>

		<view v-show="showSearch">

			<Header title="查找充电站" :hasReturn="true" @back="searchReturnClick" />

			<view class="row" style="padding-left: 48rpx;">
				<input placeholder="双安" v-model="searchContent" class="station-input input-width" /><text class="search"
					@click="searchClick">搜索</text>
			</view>

			<uni-card v-for="station in searchStationList" v-on:click="stationClick(station,'showSearch')"
				:key="station.id">
				<view>
					<view class="station-name">{{station.stationName}}</view>
					<view class="station-address">{{station.address}}</view>
					<view class="station-desc">
						促销 | 充过 | 公共 | 自营<br>
					</view>
					<view class="station-price">
						直流桩 | 1.5元/度
					</view>
				</view>
			</uni-card>

		</view>
		<zwy-popup :ishide='isshow' width="350px" height="180rpx" radius="16rpx">
			<!-- 自定义展示内容 -->
			<view class="content">
				<view>
					<image class="station-icon" src="../../static/station-icon@2x.png"></image>
				</view>
				<view>
					<view><text>{{mapClickStation.stationName}}</text><text class="price-color">1.50元/度</text></view>
					<view class="line-space"></view>
					<view class="row">
						<image class="map-icon" src="../../static/nearby_normal@2x.png"></image>
						<text class="distance-color">{{showPopDistance}}M</text>
						<view class="go-charging" @click="stationClick(mapClickStation,'showMap')">详情</view>
					</view>
				</view>

			</view>
			<!-- 自定义关闭按钮 -->
			<view class="close" @click="isshow=false">✕</view>
		</zwy-popup>
		<view v-show="showDetail">

			<Header title="充电站详情" :hasReturn="true" @back="detailReturn" />
			<stationDetail :stationInfo="detailStation"></stationDetail>
		</view>
		<tab-bar tabType="nearbyStation"></tab-bar>
	</view>

</template>


<script>
	import {
		apiGetNearbyStation
	} from '@/apis/nearbyStation.js';
	import TabBar from '@/components/TabBar'
	import Header from '@/components/Header.vue'


	export default {
		components: {
			TabBar,
			Header
		},
		data() {
			return {
				showList: false,
				showMap: true,
				showSearch: false,
				showDetail: false,
				preState: "",
				stationList: [],
				searchStationList: [],
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.968092,
				longitude: 116.34213,
				mapScale: 12,
				markers: [],
				isshow: false,
				mapClickStation: {},
				isShowFilter: false,
				filter: {
					distanceStart: "",
					distanceEnd: "",
					priceStart: "",
					priceEnd: "",
					fastChargingSelected: false,
					slowChargingSelected: false
				},
				searchContent: "双安",
				detailStation: {},
				winHeight: 0
			}
		},
		computed: {
			showPopDistance: function() {
				//debugger
				let distance = this.mapClickStation.distance * 1000
				let string = distance + ""
				let index = string.indexOf(".", 0)
				if (index >= 1) {
					distance = string.substring(0, index)
				}
				return distance
			}
		},
		methods: {
			showMapFun() {
				this.showMap = true
				this.showDetail = false
				this.showList = false
				this.showSearch = false
			},
			showDetailFun() {
				this.showDetail = true
				this.showMap = false
				this.showList = false
				this.showSearch = false
			},
			showSearchFun() {
				this.showSearch = true
				this.showDetail = false
				this.showMap = false
				this.showList = false
			},
			showListFun() {
				this.showList = true
				this.showMap = false
			},
			searchClick() {
				//debugger
				this.searchStationList = []
				for (let i = 0; i < this.stationList.length; i++) {
					if (this.stationList[i].stationName.indexOf(this.searchContent) >= 0) {
						this.searchStationList.push(this.stationList[i])
					}
				}
			},
			showSearchClick() {

				this.showSearchFun()
				this.searchStationList = []
			},
			searchReturnClick() {
				this.showMapFun()
			},
			listReturnClick() {
				this.showMapFun()
			},
			speedSelect(speedType) {
				//debugger
				if (speedType == "fast") {
					this.filter.fastChargingSelected = true
					this.filter.slowChargingSelected = false
				}

				if (speedType == "slow") {
					this.filter.slowChargingSelected = true
					this.filter.fastChargingSelected = false
				}
			},
			reset() {
				this.filter.distanceStart = ""
				this.filter.distanceEnd = ""
				this.filter.priceStart = ""
				this.filter.priceEnd = ""
				this.filter.fastChargingSelected = false
				this.filter.slowChargingSelected = false
			},
			onFilterBtnClick() {
				this.isShowFilter = false
			},
			goList() {
				this.showListFun()
			},
			detailReturn() {
				if (this.preState == "showMap") {
					this.showMapFun()

				}
				if (this.preState == "showSearch") {
					this.showSearchFun()

				}
				if (this.preState == "showList") {
					this.showListFun()

				}

				// if (this.showList){
				// 	this.showMap = true
				// 	this.showList = false
				// }


			},
			stationClick(station, currentState) {
				this.detailStation = station
				this.preState = currentState
				if (this.showMap) {
					this.isshow = false
				}

				this.showDetailFun()

			},
			getNearbyStation(data) {

				//debugger
				apiGetNearbyStation(data).then(res => {
					console.log(res)
					this.stationList = res.data
					//debugger
					for (let i = 0; i < this.stationList.length; i++) {
						//console.log(i)
						let station = this.stationList[i]
						//不指定id 单击事件不执行
						let marker = {
							id: i,
							latitude: station.stationLat,
							longitude: station.stationLng,
							iconPath: '../../static/map_marker@2x.png'
						}
						this.markers.push(marker)
						//console.log(this.markers)
					}

				}, err => {
					console.log("联网失败了")
					console.log(err)
					//debugger
				})

			},
			markertap(marker) {
				console.log("markertap")
				console.log(marker)
				//debugger
				let id = marker.detail.markerId
				this.mapClickStation = this.stationList[id]
				this.isshow = true
				// this.popupId = station.id
				// this.popupName = station.stationName
				// this.popDistance = station.distance
				//debugger
				// uni.showModal({
				// 	title: _marker.stationName,
				// 	content: _marker.address,
				// 	confirmText: "去充电",
				// 	cancelText: "关闭",
				// 	success(res) {
				// 		if (res.confirm) {
				// 			uni.switchTab({
				// 				url: "/pages/scanChanging/scanChanging"
				// 			})
				// 		}
				// 	}
				// })
			}
		},
		onLoad() {
			console.log("nearbyStation onLoad5()")
			//debugger
			let vue = this


			//debugger
			let data = {
				longitude: 116.39742,
				latitude: 39.909,
				radius: 5000
			}
			vue.getNearbyStation(data)


			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					//部署时不要定位，定位到某个城市后，没有充电桩数据
					//debugger
					// console.log(this) //undefied
					// console.log('当前位置的经度5：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
					// vue.longitude = res.longitude
					// vue.latitude = res.latitude
					// let marker = {
					// 	id: -1,
					// 	latitude: res.latitude,
					// 	longitude: res.longitude,
					// 	iconPath: '../../static/location@3x.png'
					// }
					// vue.markers.push(marker)

					// //debugger
					// let data = {
					// 	longitude: res.longitude,
					// 	latitude: res.latitude,
					// 	radius: 5000
					// }
					// vue.getNearbyStation(data)
				},
				fail: function(error) {
					console.log("fail")
					console.log(error)
				}
			});



		},
		onShow() {
			console.log("nearbyStation onShow()")

		},
		created() {
			let winHeight = uni.getSystemInfoSync().windowHeight;
			this.winHeight = winHeight;
		}


	}
</script>

<style>
	.station-price {
		margin-top: 48rpx;
		font-size: 24rpx;
		color: #63665D;
	}



	.content {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: left;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-bottom: 24rpx;
	}

	.image {
		width: 115rpx;
		height: 115rpx;
		border-radius: 50%;
		background: #4CD964;
	}

	.title {
		font-size: 36rpx;
		margin: 70rpx 0 40rpx 0;
	}

	.info {
		margin: 40rpx 0;
		font-size: 24rpx;
		text-align: center;
		background: #F5F5F5;
		border-radius: 16rpx;
		padding: 16rpx 20rpx;
	}

	.btn {
		width: 210rpx;
		height: 60rpx;
		font-size: 26rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 30rpx;
		background: linear-gradient(-90deg, #FEEF43, #E9D81B);
	}

	.close {
		width: 60rpx;
		height: 60rpx;
		color: #FFFFFF;
		line-height: 60rpx;
		text-align: center;
		border-radius: 50%;
		border: 1px solid #FFFFFF;
		position: relative;
		bottom: -25%;
		left: 50%;
		transform: translate(-50%, -50%);
	}


	.map-icon {
		width: 36rpx;
		height: 36rpx;
		margin-right: 8rpx;
	}

	.station-icon {
		width: 120rpx;
		height: 120rpx;
		margin-right: 24rpx;
	}

	.line-space {
		height: 24rpx;
	}

	.price-color {
		color: #0091FF;
	}

	.distance-color {
		color: #999999;
	}

	.go-charging {

		background-color: #1DB3F3;
		width: 140rpx;
		height: 42rpx;
		border-radius: 42rpx;
		color: #FFFFFFFF;
		font-size: 36rpx;
		padding-left: 24rpx;
		padding-top: 6rpx;
		padding-bottom: 6rpx;
		margin-left: 48rpx;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.cover-image {
		width: 32rpx;
		height: 28rpx;
		margin-left: 48rpx;
	}

	.map-cover-view {
		position: absolute;
		top: 45px;
		left: 50%;
		transform: translateX(-50%);

		width: 750px;
		height: 112rpx;
		background-color: #EEEEEE;

		display: flex;
		flex-direction: row;

		padding-top: 12rpx;
		padding-bottom: 12rpx;
	}

	.returnArrow {
		width: 31rpx;
		height: 36rpx;
		margin-left: 48rpx;
	}

	.filter-image {
		width: 16rpx;
		height: 24rpx;
		margin-left: 8rpx;

	}

	.station-input {
		background-color: #FFFFFF;
		height: 64rpx;
		border-radius: 32rpx;
		margin-left: 24prx;
		margin-right: 24rpx;
		padding-left: 32rpx;
	}

	.input-width {
		width: 50%;
	}

	.filter-cover-view {
		position: absolute;
		top: 112px;
		left: 50%;
		transform: translateX(-50%);

		width: 750px;
		height: 520rpx;
		background-color: #FFFFFF;
	}

	.filter-submit-btn {
		background-color: #1DB3F3;
		height: 60rpx;
		width: 204rpx;
		color: #FFFFFFFF;
		font-size: 24rpx;
		margin-top: 48rpx;

	}

	.input-border {
		width: 96rpx;
		border: 1px solid #999999;
	}

	.text-button {
		width: 96rpx;
		border: 1px solid #999999;

		text-align: center;
	}

	.speed-button-background {
		background-color: lightblue;
	}

	.search {
		margin-top: 6rpx;
	}

	.to-detail {
		width: 76rpx;
		height: 76rpx;

	}
</style>
