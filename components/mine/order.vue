<template>
	<view>
		<view class="order">
			<u-section font-size="35" title="我的订单" sub-title="全部订单" :show-line="false" @click="goto('pages/orderForm/orderForm')"></u-section>
			<view class="fourBox">
				<view class="function">
					<image class="ico" src="../../static/user/daifukuan.png" mode=""></image>
					<view class="text">
						待付款
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/daishouhuo.png" mode=""></image>
					<view class="text">
						待收货
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/daipingjia.png" mode=""></image>
					<view class="text">
						待评价
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/shouhou.png" mode=""></image>
					<view class="text">
						退款/售后
					</view>
				</view>
			</view>
		</view>
		<view class="myFunction">
			<u-section font-size="35" title="我的功能" :right="false"  :show-line="false"></u-section>
			<view class="fourBox" >
				<view class="function" @click="goto('pages/coupon/coupon')">
					<image class="ico" src="../../static/user/youhuiquan.png" mode=""></image>
					<view class="text">
						12张优惠券
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/hongbao.png" mode=""></image>
					<view class="text">
						我的红包
					</view>
				</view>
				<view class="function" @click="goto('pages/like/like')">
					<image class="ico" src="../../static/user/shoucang.png" mode=""></image>
					<view class="text">
						我的收藏
					</view>
				</view>
				<view class="function" @click="goto('pages/glanceOver/glanceOver')">
					<image class="ico" src="../../static/user/liulanjilu.png" mode=""></image>
					<view class="text">
						浏览记录
					</view>
				</view>
			</view>
		</view>
		<view class="myFunction">
			<u-section font-size="35" title="更多工具" :right="false"  :show-line="false"></u-section>
			<view class="fourBox">
				<view class="function">
					<image class="ico" src="../../static/user/qianbao.png" mode=""></image>
					<view class="text">
						我的钱包
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/kefu.png" mode=""></image>
					<view class="text">
						官方客服
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/yonghufankui.png" mode=""></image>
					<view class="text">
						用户反馈
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/zizhizhengzhao.png" mode=""></image>
					<view class="text">
						资质证照
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/xieyiguize.png" mode=""></image>
					<view class="text">
						协议规则
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/xianxiamendian.png" mode=""></image>
					<view class="text">
						线下门店
					</view>
				</view>
				<view class="function">
					<image class="ico" src="../../static/user/update.png" mode=""></image>
					<view class="text">
						更新日志
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {}
		},
		methods: {
			goto(name){
				uni.navigateTo({
					url:`../../${name}`
				})
			}
		},
		mounted() {

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
	.order {
		width: 90%;
		margin: 0 auto;
		padding: 30rpx;
		border-radius: 30rpx;
		margin-top: -80rpx;
		background-color: #FFFFFF;
	}

	.fourBox {
		font-size: 30rpx;
		display: flex;
		flex-wrap: wrap;
		padding: 50rpx 5rpx;
	}

	.function {
		width: 25%;
		margin: 20rpx 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}

	.ico {
		width: 100rpx;
		height: 100rpx;
	}
	.myFunction{
		width: 90%;
		margin: 0 auto;
		padding: 30rpx;
	}
</style>
