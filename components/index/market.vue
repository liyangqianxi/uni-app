<template>
	<!-- 热销 -->
	<view class="market">
		<view class="title">
			<view>
				<text>{{sell.data.title}}</text>
				<text style="font-size: 26rpx; color: #A8A8A8; margin-left: 20rpx;">{{sell.data.subtitle}}</text>
			</view>
			<view style="font-size: 24rpx;margin-top: 10rpx;">
				更多>
			</view>
		</view>
		<scroll-view scroll-x="true" style="width: 100%; white-space:nowrap">
			<view class="box" v-for="(item,index) in sell.data.items" :key="index" @click="goto(item,index)">
				<view class="mark">{{index+1}}</view>
				<image class="picture" :src="item.item.pic_url" mode=""></image>
				<view class="tltle">{{item.item.recommend}}</view>
				<view class="name">
					{{item.item.name}}
				</view>

			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			sell: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {
			goto(item,index){
				// console.log(item.item);
				uni.navigateTo({
					url:`/pages/details/details?id=${item.item.gid}`
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
	.market {
		background-color: #FFFFFF;
		border-radius: 20rpx;
		width: 95%;
		margin: 30rpx auto;
	}

	.box {
		display: inline-block;
		margin: 20rpx;
		width: 250rpx;
		position: relative;
	}

	.picture {
		width: 220rpx;
		height: 250rpx;
	}

	.tltle {
		font-size: 26rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		padding: 0 20rpx;
		background-color: #FF6600;
		color: #FFFFFF;
	}

	.name {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		text-align: center;
		background-color: #fff3c2;
		color: #FFCC66;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
	.mark{
		color: #FA3534;
		width: 50rpx;
		height: 50rpx;
		background-color: #fff3c2;
		text-align: center;
		position: absolute;
	}
</style>
