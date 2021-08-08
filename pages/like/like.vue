<template>
	<!-- 我的收藏 -->
	<view class="like" v-if="obj">
		<u-navbar  title="我的收藏"></u-navbar>
		<view v-for="(item,index) in obj" :key="index">
			<view class="box" @click="goto(item,index)">
				<view class="leftBox">
					<image class="img" :src="item.compressedImg800" mode=""></image>
				</view>
				<view class="">
					<view class="name">
						{{item.name}}
					</view>
					<view class="summary">
						{{item.summary}}
					</view>
					<view class="priceMin">
						￥{{item.priceMin/100}}
					</view>
				</view>
				<view class="shoppingBox" @click="add">
					<image class="shopping"  src="../../static/shopping.png" mode=""></image>
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
			return {
				obj: []
			}
		},
		methods: {
			add(){
				console.log("111");
			},
			goto(item,index){
				// console.log(item.gid);
				uni.navigateTo({
					url:`../../pages/details/details?id=${item.gid}`
				})
			}
		},
		mounted() {
			this.obj = uni.getStorageSync('likeHistory')
			// console.log(this.obj);
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
	.like {
		padding: 10rpx;
	}
	.leftBox{
		width: 240rpx;
		height: 240rpx;
	}

	.img {
		width: 240rpx;
		height: 240rpx;
		margin-right: 20rpx;
	}

	.box {
		position: relative;
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 2rpx solid #C0C0C0;
	}

	.name {
		font-weight: bolder;
		display: flex;
		flex-wrap: wrap;
	}
	.summary{
		margin: 10rpx 0;
	}

	.priceMin {
		color: #FF0000;
		margin: 10rpx 0;
	}
	.shoppingBox{
		right: 20rpx;
		bottom: 50rpx;
		position: absolute;
		width: 50rpx;
		height: 50rpx;
		border-radius: 100%;
		background-color:#C0C0C0;
	}
	.shopping{
		width: 50rpx;
		height: 50rpx;
	}
</style>
