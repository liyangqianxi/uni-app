<script>
	export default {
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/theme.scss';
	.title {
		display: flex;
		justify-content: space-between;
		margin: 10rpx 0;
		padding: 30rpx 20rpx;
	}
	.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	
	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}
	/* #ifdef H5 */
	.WeChat {
		width: 100%;
		background-color: #ff8166;
		height: 80rpx;
	}
	/* #endif */
	/* #ifdef MP-WEIXIN */
	.WeChat1 {
		width: 100%;
		background-color: #ff8166;
		height: 150rpx;
	}
	.WeChat {
		width: 100%;
		background-color: #ff8166;
		height: 60rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	/* #endif */
	
</style>
