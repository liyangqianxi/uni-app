<template>
	<view>
		<!-- 优惠券 -->
		<u-navbar title="优惠券"></u-navbar>
		<view class="box1">
			<view :class="index===0 ? 'bu':'wei'" @click="onclick1">未使用</view>
			<view :class="index===1 ? 'bu':'wei'" @click='onclick2'>不可用</view>
		</view>
		<view class="" v-if="index===0">
			<view class="" v-for="(item,index) in list" :key='index'>
				<view class="like">
					<image src="../../static/usable_left.png" class="tu">
						<view class="value">￥{{item.value/100}}.00</view>
						<view class="bottomPrice">买满{{item.bottomPrice/100}}可用</view>
						<view class="yi">快过期</view>
					</image>
					<view class="box3">
						<view class="name1">{{item.couponDesc.nameDesc}}</view>
						<view class="shi">有效期至1970-9-10</view>
					</view>
				</view>
				<view class="scopeDesc">{{item.couponDesc.scopeDesc}}</view>
			</view>
		</view>
		<view class="" v-if="index===1">
			<view class="" v-for="(item,index) in list" :key='index'>
				<view class="like">
					<image src="../../static/disabled_left.png" class="tu">
						<view class="value">￥{{item.value/100}}.00</view>
						<view class="bottomPrice">买满{{item.bottomPrice/100}}可用</view>
						<view class="guo">已过期</view>
					</image>
					<view class="box3">
						<view class="name1">{{item.couponDesc.nameDesc}}</view>
						<view class="shi">有效期至1970-9-10</view>
					</view>
				</view>
				<view class="scopeDesc">{{item.couponDesc.scopeDesc}}</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				index: 2,
				list: []
			}
		},
		methods: {
			run() {
				uni.navigateBack({

				})
			},
			onclick1() {
				this.index = 0
				// console.log(this.index)
				this.getCoupon()
			},
			onclick2() {
				this.index = 1
				this.getCoupon()
				// console.log(this.index)
			},
			getCoupon() {
				this.$api.getCoupon(this.index).then((res) => {
					// console.log(res)
					this.list = res.data.couponInfos
					// console.log(this.list)
				}).catch((err) => {
					console.log('请求失败', err)
				})
			}
		},
		mounted() {
			this.index = 0
			this.getCoupon()
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
	.box {
		margin-top: 10rpx;
		width: 100%;
		display: flex;
	}

	.img {
		margin-left: 20rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.name {
		font-size: 20px;
		width: 80%;
		display: flex;
		justify-content: center;
	}

	.box1 {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 100%;
		display: flex;
	}

	.wei {
		font-size: 17px;
		width: 50%;
		display: flex;
		justify-content: center;
	}

	.bu {
		color: red;
		font-size: 17px;
		width: 50%;
		display: flex;
		justify-content: center;
	}

	.like {
		position: relative;
		margin: 20rpx 0;
		width: 100%;
		display: flex;
	}

	.tu {
		margin-left: 20rpx;
		width: 300rpx;
		height: 200rpx;
	}

	.value {
		position: absolute;
		top: 30rpx;
		left: 110rpx;
		font-size: 18px;
		color: #ffffff;
	}

	.bottomPrice {
		position: absolute;
		top: 130rpx;
		left: 90rpx;
		font-size: 16px;
		color: #ffffff;
	}
	.yi{
		display: flex;
		justify-content: center;
		background-color: red;
		right: 0;
		color: #ffffff;
		width: 100rpx;
		position: absolute;
	}
	.guo{
		display: flex;
		justify-content: center;
		background-color: #808080;
		right: 0;
		color: #ffffff;
		width: 100rpx;
		position: absolute;
	}
	.name1 {
		width: 400rpx;
		margin-top: 60rpx;
		font-size: 15px;
	}

	.box3 {
		width: 400rpx;
	}

	.shi {
		margin-left: 40rpx;
		margin-top: 60rpx;
	}

	.scopeDesc {
		width: 90%;
		margin-left: 30rpx;
		color: gray;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
