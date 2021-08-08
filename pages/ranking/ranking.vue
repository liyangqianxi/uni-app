<template>
	<!-- 分类商品列表 -->
	<view>
		<u-navbar title="商品列表"></u-navbar>
		<view class="box1">
			<view class="name">
				{{this.name}}
			</view>
			<image src="../../static/arrange_list_black.png" class="img1" @click="goto"></image>
		</view>
		<view class="box3">
			<view v-for="(item,index) in list" :key='index'>
				<view>
					<view class="one" :class="{'fen':son===index}" @click="onclick(item,index)">
						{{item.name}}
						<view v-if="index===2">
							<u-icon name="arrow-up" v-if="flg"></u-icon>
							<u-icon name="arrow-down" v-if="!flg"></u-icon>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view class="box4">
			<view v-for="(item,index) in dataList" :key='index' :class="num===true ? 'three':'two'" @click="go(item)">
				<image :src="item.data.goodsInfo.imgSquare" :class="num===true ? 'tu':'img2'"></image>
				<view :class="num===true ? 'like':''">
					<view :class="num===true ? 'title':'title1'">{{item.data.goodsInfo.name}}</view>
					<view :class="num===true ? 'summary':'summary1'">{{item.data.goodsInfo.summary}}</view>
					<view class="middle">
						<view class="priceMin">￥{{item.data.goodsInfo.priceMin/100}}起</view>
						<view class="marketPrice">{{item.data.goodsInfo.marketPrice/100}}</view>
					</view>
					<view class="tail">
						<view v-for="(item1,index1) in item.data.label.normal" :key='index1' class="text">
							<view class="" v-if="index1<2">{{item1.text}}</view>
						</view>
					</view>
					<view class="di">
						<view class="count">
							{{item.data.comment.count}}条评论
						</view>
						<view class="positiveRate">
							{{item.data.comment.positiveRate}}%好评
						</view>
					</view>
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
			return {
				id: 0,
				name: "",
				dataList: [],
				list: [{ //// sortBy: 综合排序传0 销量排序传8  新品传7 价格降序传2 价格升序传1 信用排序传6
						name: '综合',
						id: 0
					}, {
						name: '新品',
						id: 7
					}, {
						name: '价格',
						id: 1
					},
					{
						name: '信用',
						id: 6
					},
					{
						name: '筛选',
					}
				],
				son: 0,
				num: false,
				flg: false,
				id: 0
			}
		},
		methods: {
			queryIdSearch() { //获取综合列表
				this.$api.queryIdSearch(
						[{
							queryName: this.name,
							queryType: 0,
							rule: []
						}],
						this.id,
						'searchPage')
					.then(res => {
						if (res.code === 0) {
							this.dataList = res.data.data.goods
							console.log(this.dataList);
							// console.log(res);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			like() {
				uni.navigateBack({})
			},
			onclick(item, index) {
				this.son = index
				if (index == 2) { //点击价格时
					this.flg = !this.flg
					if (this.flg) {
						this.id = 1
					} else {
						this.id = 2
					}
				} else {
					this.id = item.id
				}
				this.queryIdSearch()
			},
			goto() {
				this.num = !this.num
			},
			go(item) {
				// console.log(item)
				uni.navigateTo({
					url: `../details/details?id=${item.data.goodsInfo.gid}`
				})
			}
		},
		mounted() {
			this.queryIdSearch()
		},
		onLoad(item) {
			console.log(item)
			this.name = item.name
			console.log(this.name)
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
		width: 100%;
		display: flex;
	}

	.img {
		margin-left: 10rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.shop {
		width: 70%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}

	.name {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 150rpx;
		height: 60rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
		border-radius: 30rpx;
		background-color: #f4f4f5;
		color: gray;
		border: 1px solid gray;
	}

	.box1 {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.img1 {
		margin-top: 20rpx;
		width: 100rpx;
		height: 100rpx;
	}

	.box3 {
		width: 100%;
		display: flex;

	}

	.one {
		width: 154rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		margin-top: 5px;
	}

	.fen {
		width: 154rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		margin-top: 5px;
		color: red;
	}

	.box4 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.middle {
		display: flex;
	}

	.tail {
		display: flex;
	}

	.di {
		display: flex;
		margin-top: 20rpx;
	}

	.img2 {
		margin: 0 50rpx;
		width: 300rpx;
		height: 300rpx;
	}

	.tu {
		margin: 40rpx 40rpx;
		width: 300rpx;
		height: 200rpx;
	}

	.title {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 80%;
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title1 {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 40%;
		font-size: 18px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	.summary {
		width: 80%;
		color: gray;
		margin-left: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.summary1 {
		width: 40%;
		color: gray;
		margin-left: 20rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.two {
		margin: 20rpx 0;
		width: 50%;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
	}

	.three {
		margin: 20rpx 0;
		width: 100%;
		display: flex;
	}

	.priceMin {
		margin: 10rpx;
		font-size: 18px;
		color: red;
	}

	.marketPrice {
		margin: 10rpx;
		color: gray;
		font-size: 16px;
		text-decoration: line-through;
	}

	.text {
		background-color: #ec7f81;
		color: #ffffff;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50rpx;
		margin: 0 14rpx;
	}

	.count {
		font-size: 17px;
		margin: 0 10rpx;
		color: gray;
	}

	.positiveRate {
		font-size: 17px;
		margin: 0 10rpx;
		color: gray;
	}

	.like {
		width: 500rpx;
		display: flex;
		flex-direction: column;
	}
</style>
