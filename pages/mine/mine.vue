<template>
	<!-- 我的 -->
	<view>
		<view class="mine">
			我的
		</view>
		<view class="myBox">
			<image class="portrait" src="../../static/avatar_default.png" mode=""></image>
			<view class="username">care</view>
		</view>
		<order></order>
	</view>

</template>

<script>
	import order from '../../components/mine/order.vue';
	export default {
		components: {
			order
		},
		props: {},
		data() {
			return {}
		},
		methods: {
			getUpdateHistory() {
				this.$api.getUpdateHistory().then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			},
			getCoupon(){
				this.$api.getCoupon().then(res => {
					console.log(res);
				}).catch(err => {
					console.log(err);
				})
			}
		},
		mounted() {
			// this.getUpdateHistory()
			// this.getCoupon()
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.mine {
		width: 100%;
		height: 145rpx;
		line-height: 180rpx;
		text-align: center;
		font-size: 18px;
		background-color: #ffc437;
		color: #ffffff;
	}

	.myBox {
		background-color: #ffc437;
		display: flex;
		padding: 20rpx 20rpx 100rpx 20rpx;
	}

	.portrait {
		width: 120rpx;
		height: 120rpx;
	}

	.username {
		font-size: 40rpx;
		font-weight: bolder;
		margin: 40rpx;
	}
</style>
