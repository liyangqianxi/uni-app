<template>
	<!-- tabs -->
	<view>
		<!-- <u-sticky offset-top="0"> -->
		<view v-if="JSON.stringify(arr) !== '{}'">
			<scroll-view scroll-x="true" style="width: 100%; white-space:nowrap;background-color: #FFFFFF;">
				<view class="box" v-for="(item,index) in arr.data.items" :key="index"
					:class="index==sign? 'red':'default'" @click="exchange(item,index)">
					<view class="headline">
						{{item.tabConfig.title}}
					</view>
					<view class="subtitle">
						{{item.tabConfig.subtitle}}
					</view>
				</view>
			</scroll-view>
		</view>	
		<!-- </u-sticky> -->
		
		<scroll-view scroll-y="true" style="height: 100vh;" @scrolltolower="scroll">
			<view class="commodity">
				<view class="details" v-for="(item,index) in goods" :key="index" v-if="item.data.goods"  @click="goto(item,index)">
					<image class="picture" :src="item.data.goods.imgHorizon" mode=""></image>
					<view class="name">
						{{item.data.goods.name}}
					</view>
					<view class="summary">
						{{item.data.goods.summary}}
					</view>
					<view style="display: flex; justify-content: space-between;">
						<view>
							<text class="priceMin">￥{{item.data.goods.priceMin/100}}</text>
							<text class="marketPrice">￥{{item.data.goods.marketPrice/100}}</text>
						</view>
						<view>
							<image class="logo" src="../../static/icon/menu/mini_menu.png" mode=""></image>
						</view>

					</view>
				</view>
			</view>
		</scroll-view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			obj: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				arr: {},
				sign: 0,
				query_id: "",
				index: 0,
				goods: []
			}
		},
		methods: {
			exchange(item, index) {
				this.goods=[]
				this.sign = index
				this.query_id = item.query_id
				this.getFeeds()
			},
			getFeeds() {
				this.$api.getFeeds(this.index, this.query_id).then(res => {
					// console.log(res);
					// this.goods = res.data.feeds.items
					this.goods = this.goods.concat(res.data.feeds.items)
					// console.log(this.goods, "1");
				}).catch(err => {
					console.log(err);
				})
			},
			scroll() {
				this.index++
				// this.index = this.index
				// console.log(this.index);
				this.getFeeds()
			},
			goto(item,index){
				// console.log(item.data.goods);
				// console.log(item.data.goods.gid);
				// let goods=[]
				// goods.push(item.data.goods)
				uni.navigateTo({
					url:`/pages/details/details?id=${item.data.goods.gid}`
				})
			}

		},
		mounted() {
			this.obj.data.items.map(item => {
				if (item.tabConfig.title === undefined) {
					item.tabConfig.title = "618"
				}
			})
			this.arr = this.obj
			this.query_id = this.arr.data.items[0].query_id
			this.getFeeds()

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
	// ::-webkit-scrollbar{
	// display: none !important;
	// width: 0;

	// }
	.uni-scroll-view ::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	/deep/::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		color: transparent;
		background: transparent;
	}

	.box {
		text-align: center;
		display: inline-block;
		margin: 10rpx 30rpx;
	}

	.default .headline {
		font-size: 40rpx;
	}

	.default .subtitle {
		font-size: 34rpx;
		color: #808080;
	}

	.red {
		color: #FF0000 !important;
	}

	.red .headline {
		font-size: 46rpx;
	}

	.red .subtitle {
		font-size: 37rpx;
	}

	.commodity {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
	}

	.commodity .details {
		margin: 0px 11px;
		margin-top: 50rpx;
		width: 44%;
	}

	.picture {
		width: 100%;
		height: 260rpx;
	}

	.commodity .name {
		font-size: 40rpx;
	}

	.commodity .summary {
		font-size: 26rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.commodity .priceMin {
		color: #FF0000;
		margin-right: 10rpx;
	}

	.commodity .marketPrice {
		color: #888888;
		text-decoration: line-through;
	}

	.commodity .logo {
		width: 45rpx;
		height: 15rpx;
	}

	/* #ifdef MP-WEIXIN */
	.commodity .details {
		margin: 0px 9px;
		margin-top: 50rpx;
		width: 44%;
	}

	/* #endif */
</style>
