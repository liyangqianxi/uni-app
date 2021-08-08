<template>
	<!-- 限时购 -->
	<view class="restrict">
		<view class="title">
			<view>
				<text>{{limit.data.title}}</text>
				<text style="font-size: 26rpx;  margin:0 20rpx;">{{limit.lt}}点场</text>
				<u-count-down :timestamp="timestamp" color="#ffffff" bg-color="#CC9933"></u-count-down>
			</view>
			<view style="font-size: 24rpx; margin-top: 10rpx;">
				更多>
			</view>
		</view>
		<scroll-view scroll-x="true" style="width: 100%; white-space:nowrap">
			<view class="box" v-for="(item,index) in limit.data.goods" :key="index">
				<image class="picture" :src="item.item.imgs.img_square" mode=""></image>
				<view>
					<text class="price">￥{{item.item.flash_price/100}}</text>
					<text class="market_price">￥{{item.item.market_price/100}}</text>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			limit: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				timestamp: 0,
			}
		},
		methods: {},
		mounted() {
			// this.timestamp=this.limit.data.start_time

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
	.restrict {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		width: 95%;
		margin: 30rpx auto;
	}

	.box {
		display: inline-block;
		margin: 20rpx;
		width: 220rpx;
	}

	.picture {
		width: 220rpx;
		height: 250rpx;
	}

	.price {
		color: #FF0000;
		margin-right: 5rpx;
	}
	.market_price{
		color: #C0C0C0;
		text-decoration: line-through;
	}
</style>
