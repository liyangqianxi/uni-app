<template>
	<view>
		<view class="specification" @click="goods = true">
			<view class="name"><text class="selected">已选:</text> <text>{{size}}</text></view>
			<image src="../../static/icon/arrow_right.png" class="img"></image>
		</view>
		<u-popup v-model="goods" height="1000rpx" mode="bottom" :closeable='true'>
			<view style="display: flex;margin-top: 20rpx;">
				<image class="chart" :src="price.compressedImg800" mode=""></image>
				<view>
					<view class="price">
						￥{{price.priceMin/100}}
					</view>
					<view class="size">
						{{size}}
					</view>
				</view>
			</view>
			<view v-if="rule" v-for="(item,index) in rule" :key="index" class="choice">
				<view style="font-size: 40rpx;font-weight: bolder;margin-bottom: 10rpx;">
					{{item.name}}
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(item1,index1) in item.tags" :class="{'red': check(index,index1)}" :key="index1">
						<view class="hue" @click="select(item1,index,index1)">{{item1.name}}</view>
					</view>
				</view>
			</view>
			<view class="quantity">
				<view style="font-size: 40rpx;font-weight: bolder;margin-bottom: 10rpx;">
					数量
				</view>
				<view>
					<u-number-box :min="1" :input-width="100" :input-height="60" v-model="value" @change="valChange">
					</u-number-box>
				</view>
			</view>
			<view class="base">
				<!-- <view v-for="(item,index) in btn" :key="index">
					<view class="btn" style="background-color:{{colorArr[index]}} ;">
						{{item.text}}
					</view>
				</view> -->
				<!-- <u-button type="warning">加入</u-button> -->
				<u-button type="primary" @click="goods = false">确认</u-button>
			</view>

		</u-popup>
		<view class="specification">
			<view class="name">送达至河南 郑州 有货 </view>
			<image src="../../static/icon/arrow_right.png" class="img"></image>
		</view>
		<view class="specification" @click="show = true">
			<view class="box">
				<view class="serve" v-if="serve" v-for="(item,index) in serve" :key="index">
					<view style="margin-top: -2rpx;margin-right: 8rpx;">
						<image src="../../static/checked.png" class="img"></image>
					</view>
					<view style="margin-right: 5rpx;">
						{{item.text}}
					</view>
				</view>
			</view>
			<image src="../../static/icon/arrow_right.png" class="img"></image>
		</view>
		<u-popup v-model="show" mode="bottom" :closeable='true'>
			<view class="particular">
				<view class="explain">
					说明
				</view>
				<view v-for="(item,index) in serviceList" :key="index">
					<view class="expressage">
						<view>
							<image src="../../static/checked.png" class="img"></image>
						</view>
						<view style="font-weight: bolder;">
							{{item.name}}
						</view>
					</view>
					<view class="descList">
						{{item.descList[0]}}
					</view>
				</view>
			</view>
		</u-popup>
		<view class="buttomBOX">
			<view style="width: 400rpx;">
				<u-grid :col="3">
					<u-grid-item>
						<image  src="../../static/service.png" class="badge-icon"></image>
						<view class="grid-text">客服</view>
					</u-grid-item>
					<u-grid-item>
						<image  src="../../static/store.png" class="badge-icon"></image>
						<view class="grid-text">店铺</view>
					</u-grid-item>
					<u-grid-item>
						<u-badge :count=badge :offset="[20, 20]"></u-badge>
						<image src="../../static/shopping.png" class="badge-icon" mode=""></image>
						<view class="grid-text">购物车</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="button">
				<view class="join" @click="add">
					加入购物车
				</view>
				<view class="buy" @click="purchase">
					立即购买
				</view>
			</view>
		</view>
		<view>
			<u-toast ref="uToast" />
		</view>
	</view>

</template>
<script>
	export default {
		components: {},
		props: {
			// 规格
			rule: {
				type: Array,
				required: true
			},
			// 服务
			serve: {
				type: Array,
				required: true
			},
			// 说明
			serviceList: {
				type: Array,
				required: true
			},
			price: {
				type: Object,
				required: true
			},
			// btn
			btn: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				// 商品规格
				goods: false,
				// 说明
				show: false,
				// 商品选择规格
				size: "请选择规格",
				value: 1,
				tinct: -1,
				name: "",
				arr: [],
				message: [],
				index: null,
				goodsInfo: null
			}
		},
		methods: {
			select(item1, index, index1) {
				this.arr = this.arr.filter(a => {
					return a.i1 !== index
				})
				this.arr.push({
					i1: index,
					i2: index1,
					name: item1.name
				})
				let str = ''
				this.arr.map(item => { //拼接选择的商品信息
					str += ` ${item.name}`
				})
				this.name = str
				this.size = this.name + "X" + this.value

			},
			check(index, index1) {
				return this.arr.some(item => {
					return item.i1 == index && item.i2 == index1
				})
			},
			valChange(e) {
				// console.log('当前值为: ' + e.value)
				if (this.rule.length == 0) {
					this.size = `${this.value}件`
				} else {
					this.value = e.value
					this.size = `${this.name}X${this.value}`
				}

			},
			add() {
				uni.setStorageSync('falg', false)
				this.determine()
			},
			purchase() {
				uni.setStorageSync('falg', true)
				this.determine()
			},
			determine() {
				if (this.arr.length !== this.rule.length) { //未选择商品提示用户
					this.$refs.uToast.show({
						title: '请选择商品详情',
					})
				} else {
					this.goodsInfo = uni.getStorageSync('goodsInfo')
					this.$set(this.goodsInfo, "num", this.value)
					this.$set(this.goodsInfo, "specification", this.name)
					// this.$set(this.goodsInfo, 'Specifications', this.name)
					// this.$set(this.goodsInfo, 'num', this.value)
					let info = {
						info: this.goodsInfo,
						name: this.arr
					}
					let obj = { //直接购买
						list: [{
							info: this.goodsInfo
						}],
						sum: (this.goodsInfo.priceMin / 100) * this.value,
						time: new Date(),
					}
					this.showPopup = false
					if (uni.getStorageSync('falg')) { //是直接购买就直接储存价格信息
						let arr1 = []
						let a = uni.getStorageSync('order')
						if (a) { //如果已经储存
							arr1 = a
							arr1.unshift(obj)
						} else { //没有储存，就储存成数组
							arr1.unshift(obj)
						}
						this.$refs.uToast.show({
							title: `结算成功，共支付${(this.goodsInfo.priceMin / 100) * this.value}元`,
						})
						uni.setStorageSync('order', arr1) //订单
						// uni.navigateTo({
						// 	url: `/pages/order/order`
						// })
					} else { //加入购物车，
						// console.log(this.arr);
						let flag = false
						let list = null
						let num = 0
						let Cart = uni.getStorageSync('Cart')
						// console.log(Cart);
						if (Cart) { //如果储存过
							Cart.map(item => {
								if (item.info.gid === this.goodsInfo.gid) { //如果有一样的id
									this.arr.map(item1 => {
										let temp = item.name.some(item2 => { //查找是否有一样的规格
											return item1.name === item2.name
										})
										if (temp) num++
										if (num === this.arr.length) { //如果name和和num的数量一样，就表示规格一样让num++
											flag = true
											item.info.num = item.info.num + this.value
										}
									})
								}
							})
							if (flag) {
								uni.setStorageSync('Cart', Cart)
							} else {
								Cart.unshift(info)
								uni.setStorageSync('Cart', Cart)
							}
						} else { //没储存过
							Cart = [info]
							uni.setStorageSync('Cart', Cart)
						}
						uni.setStorageSync('num', Cart.length)
						this.$stores.commit("setBadge", Cart.length)
						this.$refs.uToast.show({
							title: `添加成功`,
						})
					}
				}
			}
		},
		mounted() {
			if (this.rule.length == 0) {
				this.size = `${this.value}件`
			}

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			badge() {
				if (this.$stores.state.badge == 0) {
					return "";
				} else {
					return this.$stores.state.badge;
				}

			},
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 60rpx;
		height: 60rpx;
	}

	.grid-text {
		margin-left: -36rpx;
		font-size: 28rpx;
		margin-top: 40rpx;
	}

	.selected {
		color: #989898;
		margin-right: 40rpx;
	}

	.specification {
		padding: 0 20rpx;
		margin: 30rpx 0;
		display: flex;
		justify-content: space-between;
	}

	.name {
		font-size: 34rpx;
		color: #989898;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
	}

	.box {
		padding: 7rpx 0;
		font-size: 30rpx;
		display: flex;
		flex-wrap: wrap;

	}

	.serve {
		margin-right: 8rpx;
		display: flex;
		color: #989898;
	}

	.explain {
		font-size: 40rpx;
		text-align: center;
		padding: 20rpx;
		font-weight: bolder;
	}

	.particular {
		height: 700rpx;
		padding: 10rpx;
	}

	.expressage {
		margin: 10rpx 0;
		display: flex;
	}

	.descList {
		margin: 40rpx 0;
		margin-left: 40rpx;

	}

	.expressage .img {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}

	.chart {
		width: 270rpx;
		height: 270rpx;
		margin: 20rpx;
		border: 2rpx solid #E8E8E8;
		border-radius: 20rpx;
	}

	.price {
		color: #CC9900;
		font-size: 50rpx;
		font-weight: bolder;
		margin-top: 100rpx;
	}

	.size {
		margin-top: 20rpx;
		color: #C0C0C0;
	}

	.choice {
		padding: 20rpx;
	}

	.hue {
		padding: 15rpx;
		margin: 10rpx 0;
		margin-right: 10rpx;
		border: 2rpx solid #FFFFFF;
		border-radius: 10rpx;
	}

	.quantity {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.red {
		border-radius: 10rpx;
		border: 2rpx solid #CC9900 !important;
		color: #CC9900;
	}


	.base {
		padding: 5rpx;
		margin: 20rpx;
	}

	.buttomBOX {
		border-top: 2rpx solid #C0C0C0;
		z-index: 999;
		height: 102rpx;
		padding: 8rpx 10rpx;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
	}

	.photograph {
		width: 60rpx;
		height: 60rpx;
	}

	.button {
		line-height: 100rpx;
		width: 478rpx;
		display: flex;
		color: #FFFFFF;
	}

	.join {
		width: 50%;
		height: 102rpx;
		background-color: #CC9900;
		text-align: center;
		border-top-left-radius: 20rpx;
		border-bottom-left-radius: 20rpx;
	}

	.buy {
		width: 50%;
		height: 102rpx;
		background-color: #FF0000;
		text-align: center;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}
</style>
