<template>
	<view>
		<view class="forYou">
			为你推荐
		</view>
		<view class="goods">
			<view v-for="(item,index) in list" :key="index" class="box" @click="goto(item,index)">
				<image class="picture" :src="item.data.goods.imgHorizon" mode=""></image>
				<view class="name">
					{{item.data.goods.name}}
				</view>
				<view class="money">
					￥{{item.data.goods.priceMin/100}}
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
				type: 7,
				offset: "1",
				limit: 10,
				// 推荐
				list: []
			}
		},
		methods: {
			getRecommend() {
				// this.$api.getRecommend(this.type,this.offset,this.limit).then(res => {
				// 	console.log(res);
				// 	this.list = res.data.recommendResponseList
				// }).catch(err => {
				// 	console.log(err);
				// })
				this.$api.getRecommend(this.offset).then(res => {
					// console.log(res);
					this.list = res.data.recommendResponseList
				}).catch(err => {
					console.log(err);
				})
			},
			goto(item,index){
				// console.log(item.data.goods.gid);
				uni.navigateTo({
					url:`../../pages/details/details?id=${item.data.goods.gid}`
				})
			}
		},
		mounted() {
			this.getRecommend()
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
	.forYou {
		text-align: center;
		padding: 30rpx 0;
		font-weight: bolder;
		font-size: 36rpx;
		color: #CC9900;
	}

	.picture {
		width: 220rpx;
		height: 220rpx;
		border-radius: 30rpx;
	}

	.goods {
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.goods .box {
		width: 200rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
		
	}

	.money {
		color: #CC9900;
	}

	.name {
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-all;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		display: -webkit-box;
	}
</style>
