<template>
	<!-- 详情 -->
	<view style="position: relative;">
		<!-- #ifdef MP-WEIXIN -->
		<view class="cephalosome"></view>
		<!-- #endif -->
		<view class="btn" @click="goto">
			<image class="png" src="../../static/backtrack.png" mode=""></image>
			<image class="png" style="margin-left: 30rpx;" src="../../static/more.png" mode=""></image>
		</view>
		<view>
			<swiper class="img_img" indicator-dots="true" interval="2000" duration="500" circular="true"
				v-if="carouselMapList.length>0">
				<swiper-item v-if="video!=''">
					<video :src="video" id="myVideo" style="width: 100%; height: 100%;" controls='false' loop='true'
						autoplay='true'></video>
				</swiper-item>
				<swiper-item v-for="(item,index) in image_list" :key="index">
					<image :src="item.url" class="img_img"></image>
				</swiper-item>
			</swiper>
		</view>
		<money v-if="JSON.stringify(price) !== '{}'" :price="price" :text="text" :jumpUrl="jumpUrl"></money>
		<specification
			v-if="JSON.stringify(rule) !== '{}' && serve.length > 0 && serviceList.length > 0 && JSON.stringify(price) !== '{}' && btn.length>0"
			:rule="rule" :serve="serve" :serviceList="serviceList" :price="price" :btn="btn"></specification>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
		<remark v-if="JSON.stringify(comment) !== '{}'" :comment="comment" :inquire="inquire" :gid="gid"></remark>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
		<recommend></recommend>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
		<store v-if="JSON.stringify(shop) !== '{}'&&introExt.length>0" :shop="shop" :introExt="introExt"></store>
	</view>
</template>

<script>
	import money from '../../components/details/money.vue';
	import specification from '../../components/details/specification.vue';
	import remark from '../../components/details/remark.vue';
	import recommend from '../../components/details/recommend.vue';
	import store from '../../components/details/store.vue';

	export default {
		components: {
			money,
			specification,
			remark,
			recommend,
			store
		},
		props: {},
		data() {
			return {
				gid: "",
				video: '',
				image_list: '',
				// 轮播图
				carouselMapList: [],
				pages: [],
				// 价格
				price: {},
				// 规格
				rule: {},
				// 服务
				serve: [],
				// 说明
				serviceList: [],
				// 动态支付按钮
				btn: [],
				// 评论
				comment: {},
				//问答
				inquire: {},
				// 店铺
				shop: {},
				introExt: [],
				// 榜
				text: "",
				jumpUrl: "",
				goods:null

			}
		},
		methods: {
			browseHistory() {
				this.$utils.saveHistory({
					key: "browse",
					data:this.goods ,
					attr: "gid"
				})
			},
			// 商品详情
			getGoodsDetail() {
				this.$api.getGoodsDetail(this.gid).then(res => {
					// console.log(res, "商品详情");
					this.goods=res.data
					// 轮播图
					this.carouselMapList = res.data.goods.carouselMapList
					let p1 = this.carouselMapList[0].url
					if (this.getFileType(p1) == 'video') {
						this.video = p1
						this.image_list = this.carouselMapList.filter(item => this.getFileType(item.url) !=
							'video')
					} else {
						this.image_list = this.carouselMapList
					}
					// 价格
					this.price = res.data.goods.goodsInfo
					uni.setStorageSync('goodsInfo', this.price)
					// 规格
					this.rule = res.data.goods.shopTags
					// 服务
					this.serve = Object.values(res.data.goods.services)
					// 说明
					this.serviceList = res.data.serviceInfo.serviceList
					// 动态支付按钮
					this.btn = res.data.button.gidButton
					// 评论
					this.comment = res.data.comment
					// 店铺
					this.shop = res.data.goods.brand
					this.introExt = res.data.goods.goodsInfo.introExt
					// console.log(this.comment, "评论");
					this.browseHistory()

				}).catch(err => {
					console.log(err);
				})
			},
			getFileType(fileName) {
				// 后缀获取
				let suffix = '';
				// 获取类型结果
				let result = '';
				try {
					const flieArr = fileName.split('.');
					suffix = flieArr[flieArr.length - 1];
				} catch (err) {
					suffix = '';
				}
				// 图片格式
				const imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif'];
				// 进行图片匹配
				result = imglist.find(item => item === suffix);
				if (result) {
					return 'image';
				}
				// 匹配 视频
				const videolist = ['mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'];
				result = videolist.find(item => item === suffix);
				if (result) {
					return 'video';
				}
			},
			goto() {
				uni.navigateBack({})
			},
			//获取更多问答列表
			getAskInfo() {
				this.$api.getAskInfo(this.gid).then(res => {
					// console.log(res,"问答");
					this.inquire = res.data
					// console.log(this.inquire, "问答");
				}).catch(err => {
					console.log(err);
				})
			},
			// 详情页推荐商品-排行榜-问答
			getComposeTwo() {
				this.$api.getComposeTwo(this.gid).then(res => {
					// console.log(res);
					if (res[1].data) {
						this.text = res[1].data.text
						this.jumpUrl = res[1].data.baseInfo.jumpUrl
					}
					// console.log(this.text);
					// console.log(this.jumpUrl)
				}).catch(err => {
					console.log(err);
				})
			}
		},
		mounted() {
			this.getGoodsDetail()
			this.getAskInfo()
			this.getComposeTwo()
			// console.log(this.price);
		},
		onLoad(gid) {
			this.gid = gid.id
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
		width: 100%;
		height: 55rpx;
	}

	.img_img {
		height: 600rpx;
		width: 100%;
	}

	.png {
		width: 40rpx;
		height: 40rpx;
	}



	/* #ifdef H5 */
	.btn {
		position: absolute;
		left: 10rpx;
		top: 20rpx;
		z-index: 999;
		width: 140rpx;
		padding: 10rpx;
		border-radius: 30rpx;
		background-color: rgba(0, 0, 0, 0.2);
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.btn {
		position: absolute;
		left: 10rpx;
		top: 65rpx;
		z-index: 999;
		width: 140rpx;
		padding: 10rpx;
		border-radius: 30rpx;
		background-color: rgba(0, 0, 0, 0.2);
	}

	/* #endif */
</style>
