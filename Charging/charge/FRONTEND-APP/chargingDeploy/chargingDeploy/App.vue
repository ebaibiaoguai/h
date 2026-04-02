<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* html,body{
	height: 100%;
	max-width:60px;
	margin:0 auto;
} */

	.device-width {
		max-width: 750px;
		margin: 0 auto;
	}

	.page-background {
		background-color: #F5F5F5;
		height: 100vh;
	}

	.page-padding {
		padding: 24rpx;
	}

	/*每个页面公共css */


	.cardlist {
		display: flex;
		flex-direction: column;
		padding: 8px;
		margin: 12px;
		border-radius: 5px;
		// 卡片阴影
		box-shadow: 0 0 5px 1px #000000;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card {
		border: 1px solid #999999;
		border-radius: 4rpx;
		margin: 24rpx;
		padding: 24rpx;
		box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
		background-color: #FFFFFF;
	}

	.blue-btn {
		background-color: #1DB3F3;
		height: 45px;
		width: 600px;
		border-radius: 42rpx;
		color: #FFFFFFFF;
		font-size: 36rpx;

	}

	.yellow-btn {
		background-color: #F5BA62;
		height: 45px;
		width: 600px;
		border-radius: 42rpx;
		color: #FFFFFFFF;
		font-size: 36rpx;

	}

	.btn-margin {
		margin-top: 48rpx;
	}

	.station-name {
		font-size: 34rpx;
		color: #333333;
	}

	.station-address {
		font-size: 24rpx;
		color: #999999;
	}

	.station-desc {
		font-size: 24rpx;
		color: #3880FF;
	}

	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.row {
		flex-flow: row;
		justify-content: flex-start;
		display: flex;
	}
</style>
