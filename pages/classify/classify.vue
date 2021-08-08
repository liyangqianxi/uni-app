<template>
	<!-- 分类 -->
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="cephalosome"></view>
		<!-- #endif -->
		<view class="head">
			分类
		</view>
		<view class="search">
			<u-search placeholder="日照香炉生紫烟" v-model="keyword" :show-action="false"></u-search>
		</view>
		<view class="classify">
			<scroll-view scroll-y="true" class="leftBox">
				<view class="kind" v-for="(item,index) in arr" :key="index" :class="index==sign? 'red':''"
					@click="exchange(item,index)" v-if="arr">
					<view class="name">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="rightBox">
				<view v-if="JSON.stringify(second) !== '{}'">
					<image class="picture" :src="second.banner" mode=""></image>
					<view v-for="(item,index) in second.children" :key="index">
						<view class="headLine">
							{{item.name}}
						</view>
						<view class="particulars">
							<view class="box" v-for="(item1,index1) in item.children" :key="index1"
								v-if="item1.smallImgCard" @click="click(item1)">
								<image class="graph " :src="item1.smallImgCard.img" mode=""></image>
								<view class="header">
									{{item1.smallImgCard.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				keyword: "",
				// 一级
				arr: [],
				sign: 0,
				catId: "",
				// 二级
				second: {}
			}
		},
		methods: {
			// 一级
			getCategorylist() {
				this.$api.getCategorylist().then((res) => {
					this.arr = res.data
					// console.log(this.arr);
					this.catId = this.arr[0].id
					// console.log(this.catId);
					this.getCategorydetail()
				}).catch(err => {
					console.log(err);
				})
			},
			exchange(item, index) {
				this.sign = index
				this.catId = item.id
				// console.log(this.catId);
				this.getCategorydetail()
			},
			// 二级
			getCategorydetail() {
				this.$api.getCategorydetail(this.catId).then(res => {
					console.log(res);
					this.second = res.data
					// console.log(this.second);
				}).catch(err => {
					console.log(err);
				})
			},
			click(item1) {
				// console.log(item1)
				uni.navigateTo({
					url: `../ranking/ranking?name=${item1.smallImgCard.name}`
				})
			},

		},
		mounted() {
			this.getCategorylist()
			// console.log(this.second.children[0].children);
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
	.cephalosome {
		height: 60rpx;
	}

	.head {
		padding: 10rpx;
		text-align: center;
		font-size: 42rpx;
	}

	.search {
		width: 95%;
		margin: 20rpx auto;
	}

	.classify {
		display: flex;
	}

	.kind {
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
		margin: 30rpx 0;
	}

	.leftBox {
		width: 250rpx;
		height: 1050rpx;
		color: #888888;
	}

	.red {
		border-radius: 30rpx;
		background-color: #FF0000 !important;
		color: #FFFFFF;
	}

	.rightBox {
		width: 555rpx;
		height: 1050rpx;
		padding: 10rpx;
	}

	.rightBox .picture {
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx
	}

	.headLine {
		margin: 10rpx 0;
		font-size: 40rpx;
		font-weight: bolder;
	}

	.graph {
		width: 150rpx;
		height: 150rpx;
	}

	.rightBox .box {
		width: 150rpx;
		text-align: center;
		margin: 5rpx;
	}

	.particulars {
		display: flex;
		flex-wrap: wrap;
	}
</style>
