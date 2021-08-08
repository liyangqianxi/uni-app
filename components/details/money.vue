<template>
	<view>
		<view class="details">
			<view style="line-height: 100rpx;">
				<text style="color:	#FF0000;">￥{{price.priceMin/100}}</text>
				<text style="text-decoration: line-through;margin-left: 20rpx;">￥{{price.marketPrice/100}}</text>
			</view>
			<view @click="like">
				<image v-if="show===true" class="enshrine" @click="abolish" src="../../static/icon/product_favor.png" mode=""></image>
				<image v-if="show===false" class="enshrine" @click="History" src="../../static/icon/product_unfavor.png"
					mode=""></image>
			</view>
		</view>
		<view class="shortName">
			<view class="name">
				{{price.shortName}}
			</view>
			<view style="color:	#888888; margin-bottom: 10rpx;">
				{{price.summary}}
			</view>
			<view style="color:	#FF0000;margin: 10rpx 0;">
				{{price.businessName}}
			</view>
		</view>
		<view class="tabulate" v-if="text !== ''" @click="jump(jumpUrl)">
			<view style="display: flex;">
				<image class="img" src="../../static/notice.png" mode=""></image>
				<view style="margin-left: 10rpx;">
					{{text}}
				</view>
			</view>
			<view class="">
				<image class="img" src="../../static/icon/arrow_right_brown.png" mode=""></image>
			</view>
		</view>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			price: {
				type: Object,
				required: true
			},
			text: {
				type: String,
				required: true
			},
			jumpUrl: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				show: false,
			}
		},
		methods: {
			like() {
				this.show = !this.show
			},
			//跳转页面
			jump(url) {
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: url,
					success: function() {}
				});
				// #endif
				// #ifndef MP-WEIXIN
				window.location.href = url
				// #endif
			},
			// 收藏
			History() {
				this.$utils.saveHistory({
					key: 'like',
					data: this.price,
					attr: 'gid',
				})
			},
			// 判断收藏
			judge() {
				// 之前已经存储过了
				// console.log(uni.getStorageSync("likeHistory"));
				let arr = uni.getStorageSync("likeHistory");
				// 检测数据是否已经存在
				let item = null;
				if (arr.length>0) {
					// console.log(this.price.gid);
					item = arr.find(i => {
						// console.log(i.gid);
						return i.gid === this.price.gid;
					});
				}
				// console.log(item);
				if (!item) {
					this.show = false
				}else{
					this.show = true
				}
			},
			// 取消收藏
			abolish(){
				let arr = uni.getStorageSync("likeHistory");
				let index = arr.findIndex(i => {
					return i.gid === this.price.gid;
				});
				arr.splice(index,1)
				uni.setStorageSync('likeHistory', arr)
			}
		},
		mounted() {
			this.judge()
			// console.log(this.price.gid);

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
	.details {
		font-size: 40rpx;
		padding: 0 20rpx;
		padding-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.enshrine {
		width: 100rpx;
		height: 100rpx;
	}

	.shortName {
		padding: 0 20rpx;
	}

	.tabulate {
		display: flex;
		justify-content: space-between;
		margin: 20rpx auto;
		width: 95%;
		padding: 10rpx 10rpx;
		border-radius: 10rpx;
		background-color: #FFFFCC;
	}

	.name {
		font-size: 40rpx;
		font-weight: bolder;
		margin-bottom: 10rpx;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
	}
</style>
