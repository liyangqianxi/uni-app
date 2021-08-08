<template>
	<!-- 购物车 -->
	<view>
		<view class="">
			<view class="fuckyou">购物车</view>
			<view class="fuckyoua">
				<view class="fuckyoub" v-for="(item, index) in list" :key="index">
					<u-checkbox v-model="item.checked" @change="amanza($event,item)">
						<view class="shiftadd">
							<image style="width: 100px;height: 100px;" :src="item.info.picUrl" mode=""></image>
							<view class="gouwu">
								<view class="text-text">{{item.info.shortName}}</view>
								<view class="text-name">{{item.info.shortSummary}}</view>
								<view class="text-fuck">￥{{item.info.marketPrice/100}}</view>
							</view>
						</view>
					</u-checkbox>
					<u-number-box v-model="item.info.num" :min="1" :max="100" :input-width="60" :input-height="30">
					</u-number-box>
				</view>

			</view>
			<shoping></shoping>
		</view>
		<view class="post">
			<view class="quanxuan">
				<view style="margin-top: 15rpx;">
					<u-checkbox-group>
						<u-checkbox v-model="checked" shape="circle" @change="checkedAll">全选</u-checkbox>
					</u-checkbox-group>
				</view>
				<view class="heji">
					<view class="shitfuck">合计：￥{{num}}</view>
					<u-button class="fucknmd1" shape="square" @click="account">结算</u-button>
					<u-button class="fucknmd1" shape="square" @click="omit">删除</u-button>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import shoping from "../../components/details/recommend.vue"
	export default {
		components: {
			shoping
		},
		props: {},
		data() {
			return {
				list: [],
				checked: false,
				obj: {}
			}
		},
		methods: {
			amanza(e, item) {
				// console.log(e.value);
				// console.log(item.checked);
				item.checked = e.value
				this.checked = this.list.every(item => {
					return item.checked === true
				})
			},
			checkedAll() {
				this.list.map(val => {
					val.checked = !this.checked;
				})
			},
			account() {
				let arr = this.list.filter((item, index) => {
					return item.checked === true
				})
				this.obj = {
					list: arr,
					sum: this.num,
					time: new Date()
				}
				// console.log(this.obj);
				let order = uni.getStorageSync('order')
				if(order){
					order.unshift(this.obj)
					uni.setStorageSync('order', order)
				}else{
					uni.setStorageSync('order', order)
				}
				
				// console.log(order);
				uni.removeStorageSync('Cart')
				let noChecked = this.list.filter((item, index) => {
					return !item.checked
				})
				uni.setStorageSync('Cart', noChecked)
				this.getCart()

			},
			omit() {
				// console.log("111");
				uni.removeStorageSync('Cart')
				let noChecked = this.list.filter((item, index) => {
					return !item.checked
				})
				uni.setStorageSync('Cart', noChecked)
				this.getCart()
			},
			getCart() {
				this.list = uni.getStorageSync("Cart")
				this.list.map(item => {
					this.$set(item, "checked", false)
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.getCart()
		},
		filters: {},
		computed: {
			num() {
				let num = 0;
				this.list.map((item, index) => {
					if (item.checked === true) {
						num += item.info.marketPrice * item.info.num / 100;
					}
				});
				return Number(num.toFixed(2));
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.fuckyou {
		width: 100%;
		height: 145rpx;
		line-height: 180rpx;
		text-align: center;
		font-size: 18px;
		background-color: #ffc437;

	}

	.fuckyoua {
		background: #FFFFFF;
		// margin: 10px;
	}

	.shiftadd {
		display: flex;
	}

	.text-text {
		font-size: 18px;
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.text-name {
		font-size: 13px;
		color: #999999;
		display: flex;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.fuckyoub {
		display: flex;
		align-items: center;
		height: 100px;
		width: 100%;
		justify-content: space-between;
	}

	.text-fuck {
		color: #E51D1D;
		font-size: 20px;
		font-weight: bold;
		position: absolute;
		left: 0;
	}

	.gouwu {
		position: relative;
	}

	.post {
		position: fixed;
		bottom: 50px;
		background: #FFFFFF;
		width: 100%;
		display: flex;
		// justify-content: space-between;
		height: 40px;
	}

	.quanxuan {
		display: flex;
		justify-content: space-between;
	}

	.heji {
		display: flex;
		position: absolute;
		right: 0;

	}

	.shitfuck {
		font-size: 19px;
		font-weight: bold;
		color: #E51D1D;
		margin-top: 15rpx;
		margin-right: 15rpx;
		// position: absolute;
		// right: 200rpx;
		// bottom: 10px;
	}

	.fucknmd {
		position: absolute;
		right: 0;
		bottom: 0px;
	}
</style>
