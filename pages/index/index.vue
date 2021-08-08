<template>
	<view>
		<!-- 首页 -->
		<view class="WeChat"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="WeChat1">

		</view>
		<!-- #endif -->
		<view class="roof">
			<view>
				<image class="img" src="../../static/navi_title_v6.png" mode=""></image>
			</view>
			<view class="search">
				<u-search  placeholder="日照香炉生紫烟" v-model="keyword" :show-action="false"></u-search>
			</view>
		</view>
		<view class="carousel">
			<u-swiper height="300rpx" :list="list" ></u-swiper>
		</view>
		<view class="revelry">
			<view class="box" v-for="(item,index) in arr" :key="index">
				<image class="graph" :src="item.pic_url" mode=""></image>
				<view class="text">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="drawing">
			<image class="drawing1" :src="chart1.pic_url" mode=""></image>
			<image class="drawing1" :src="chart2.image" mode=""></image>
		</view>
		<view class="floor">
			<subclassification v-if="classification.length>0" :classification="classification"></subclassification>
			<crowdfunding v-if="JSON.stringify(goods) !== '{}'" :goods="goods"></crowdfunding>
			<market v-if="JSON.stringify(sell) !== '{}'" :sell="sell"></market>
			<restrict v-if="JSON.stringify(limit) !== '{}'" :limit="limit"></restrict>
			<variety v-if="JSON.stringify(kind) !== '{}'" :kind="kind"></variety>
		</view>
		<tabs  v-if="JSON.stringify(obj) !== '{}'" :obj="obj"></tabs>
	</view>
</template>

<script>
	import subclassification from "../../components/index/subclassification.vue"
	import crowdfunding from "../../components/index/crowdfunding.vue"
	import market from "../../components/index/market.vue"
	import restrict from "../../components/index/restrict.vue"
	import variety from "../../components/index/variety.vue"
	import tabs from "../../components/index/tabs.vue"
	export default {
		components: {
			subclassification,
			crowdfunding,
			market,
			restrict,
			variety,
			tabs
		},
		props: {},
		data() {
			return {
				keyword: "",
				// 轮播图
				list: [],
				// 狂欢
				arr: [],
				chart1: [],
				chart2: [],
				// 小分类
				classification: [],
				// 微淘众筹
				goods: {},
				// 热销
				sell: {},
				// 限时购
				limit: {},
				// 特卖汇
				kind: {},
				// tabs
				obj: {}

			}
		},
		methods: {
			// 首页数据
			getHomeData() {
				this.$api.getHomeData().then((res) => {
					// console.log(res);
					// 轮播图
					res.homepage.floors[1].data.items.map(item => {
						this.list.push(item.item.pic_url)
					})
					// this.list = res.homepage.floors[1].data.items
					// 狂欢
					res.homepage.floors[2].data.items.map(item => {
						this.arr.push(item.item)
					})
					this.chart1 = res.homepage.floors[4].data
					this.chart2 = res.homepage.floors[3].data._hotspot
					this.classification = res.homepage.floors[5].data.rows
					// 微淘众筹
					this.goods = res.homepage.floors[7].data
					// 热销
					this.sell = res.homepage.floors[8]
					// 限时
					this.limit = res.homepage.floors[9]
					// 特卖汇
					this.kind = res.homepage.floors[10]
					// tabs
					this.obj = res.homepage.floors[11]

				}).catch((err) => {
					console.log(err)
				})
			}

		},
		mounted() {
			this.getHomeData()


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
	.img {
		width: 60rpx;
		height: 60rpx;
	}

	.revelry {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		font-size: 30rpx;
	}
	.revelry .text{
		margin: 10rpx 0;
	}

	.box {
		width: 20%;
		height: 180rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.graph {
		width: 100rpx;
		height: 100rpx;
	}

	.drawing {
		font-size: 0;
	}

	.drawing1 {
		width: 100%;
		height: 200rpx;

	}

	.floor {
		width: 100%;
		background-color: #E84241;
		padding: 12rpx 0;
	}

	/* #ifdef H5 */
	.search {
		width: 500rpx;
		margin-left: 30rpx;
	}

	.roof {
		width: 100%;
		height: 68rpx;
		background-color: #ff8166;
		padding: 10rpx 20rpx;
		display: flex;
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
	}

	.carousel {
		background-color: #ff8166;
		padding: 10rpx;
	}

	.picture {
		height: 200px;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.search {
		width: 400rpx;
		margin-left: 30rpx;
	}

	.roof {
		width: 100%;
		height: 68rpx;
		background-color: #ff8166;
		padding: 10rpx 20rpx;
		display: flex;
		position: fixed;
		top: 25px;
		z-index: 999;
	}

	.carousel {
		background-color: #ff8166;
		padding: 10rpx;
	}

	/* #endif */
</style>
