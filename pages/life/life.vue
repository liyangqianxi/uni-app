<template>
	<!-- 生活 -->
	<view>
		<view class="cephalosome">
			有品生活
		</view>
		<scroll-view scroll-x="true" style="width: 100%; white-space:nowrap;background-color: #ffc437;color: #FFFFFF;">
			<view class="box" v-for="(item,index) in tab" :key="index" v-if="tab" :class="index==sign? 'red':''"
				@click="exchange(item,index)">
				<view class="name">
					{{item.title}}
				</view>
			</view>
		</scroll-view>
		<view class="wrap">
			<u-swiper :list="banner" name="picUrl" :effect3d="true" bg-color="#ffc437"></u-swiper>
		</view>
		<view class="five">
			<view class="myBox" v-for="(item1,index1) in kkong" :key="index1">
				<image class="logo" :src="item1.picUrl" mode=""></image>
				<view class="myName">
					{{item1.title}}
				</view>
			</view>
		</view>
		<view v-if="commodity.length>0">
			<scroll-view scroll-y="true" style="height: 100vh;margin-top: 20rpx;" @scrolltolower="scroll">
				<u-waterfall v-model="commodity">
					<template v-slot:left="{leftList}">
						<view v-for="(item, index) in leftList" :key="index">
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<image class="pic" :src="item.pic" mode=""></image>
							<view class="title1">
								{{item.title}}
							</view>
							<view class="author">
								<view style="display: flex;">
									<view >
										<image class="backgroundPic" :src="item.author.backgroundPic" mode=""></image>
									</view>
									<view class="nickname">
										{{item.author.nickname}}
									</view>
								</view>
								<view class="readingNum">
									{{item.readingNum}}阅读
								</view>
							</view>
						</view>
					</template>
					<template v-slot:right="{rightList}">
						<view v-for="(item, index) in rightList" :key="index">
							<!-- 这里编写您的内容，item为您传递给v-model的数组元素 -->
							<image class="pic" :src="item.pic" mode=""></image>
							<view class="title1">
								{{item.title}}
							</view>
							<view class="author">
								<view style="display: flex;">
									<view >
										<image class="backgroundPic" :src="item.author.backgroundPic" mode=""></image>
									</view>
									<view class="nickname">
										{{item.author.nickname}}
									</view>
								</view>
								<view class="readingNum">
									{{item.readingNum}}阅读
								</view>
							</view>
						</view>
					</template>
				</u-waterfall>
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
				// 头部tabs
				tab: [],
				sign: 0,
				banner: [],
				kkong: [],
				uuid: "",
				page: 1,
				pageSize: 10,
				commodity: []

			}
		},
		methods: {
			// 生活首页数据
			getBktrSimple() {
				this.$api.getBktrSimple().then(res => {
					// console.log(res);
					this.tab = res.data.tab
					this.banner = res.data.banner
					// console.log(this.banner);
					this.kkong = res.data.kkong
					this.uuid = res.data.tab[0].id
					// console.log(this.kkong);
					this.getSimilarFeed()
				}).catch(err => {
					console.log(err);
				})
			},
			exchange(item, index) {
				this.commodity = []
				this.sign = index
				// console.log(item);
				this.uuid = item.id
				this.getSimilarFeed()
			},
			// 推荐文章
			getSimilarFeed() {
				this.$api.getSimilarFeed(this.uuid, this.page, this.pageSize).then(res => {
					// console.log(res);
					// this.commodity = res.data
					this.commodity = this.commodity.concat(res.data)
					// console.log(this.commodity);
				}).catch(err => {
					console.log(err);
				})
			},
			scroll() {
				this.page++
				// this.pageSize++
				this.getSimilarFeed()
			}

		},
		mounted() {
			this.getBktrSimple()
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
	/* #ifdef MP-WEIXIN */
	.cephalosome {
		width: 100%;
		height: 145rpx;
		line-height: 180rpx;
		text-align: center;
		font-size: 18px;
		background-color: #ffc437;
		color: #ffffff;
	}

	/* #endif */
	/* #ifdef H5 */
	.cephalosome {
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 18px;
		background-color: #ffc437;
		color: #ffffff;
	}

	/* #endif */
	.box {
		display: inline-block;
		margin: 20rpx 37rpx;
		width: 80rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: bolder;
		padding: 10rpx 0;

	}

	.red {
		border-bottom: 8rpx solid #FFFFFF;
	}

	.wrap {
		padding: 40rpx;
		background-color: #ffc437;
	}

	.five {
		display: flex;
	}

	.myBox {
		margin: 10rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		width: 150rpx;
		height: 170rpx;
	}

	.five .logo {
		width: 120rpx;
		height: 120rpx;
	}

	.myName {
		width: 120rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
	}

	.pic {
		width: 340rpx;
		height: 300rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.title1 {
		font-size: 32rpx;
		font-weight: 700;
	}

	.backgroundPic {
		border-radius: 100%;
		width: 60rpx;
		height: 60rpx;
		margin: 10rpx;
	}
	.author{
		
		display: flex;
		justify-content: space-between;
	}

	.nickname {
		font-size: 28rpx;
		margin: 10rpx;
		width: 120rpx;
		flex-wrap: wrap;
	}

	.readingNum {
		font-size: 24rpx;
		margin-right: 32rpx;
		margin-top: 10rpx;
	}
</style>
