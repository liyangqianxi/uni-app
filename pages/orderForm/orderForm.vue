<template>
	<!-- 我的订单 -->
	<view>
		<u-navbar title="我的订单"></u-navbar>
		<view class="nav_tab">
			<!-- 如果选中的下表等于当前的索引，就使用active class名，否则class名为common -->
			<view v-for="(item,index) in list" :class="selected==index?'active':'common'"
				@click="selected1(item,index)">
				{{item.name}}
				<!-- 如果选中的下表等于当前的索引，就添加下划线 -->
				<!-- <view :class="selected==index?'nav_underline':''"></view> -->
			</view>
		</view>
		<view v-if="selected == 0" class="box">
			<view v-if="arr.length>0" v-for="(item,index) in arr" :key="index">
				<view class="finish">
					<view class="indent">
						<view class="time">
							支付时间:{{item.time}}
						</view>
						<view style="color: #C0C0C0;">
							交易成功
						</view>
					</view>
					<view v-for="(item1,index1) in item.list" :key="index1" class="merchandise" @click="goto(item1)">
						<view class="leftBox">
							<image class="img" :src="item1.info.compressedImg800" mode=""></image>
						</view>
						<view class="rightBox">
							<view class="name">
								{{item1.info.name}}
							</view>
							<view style="display: flex;">
								<view class="money">
									￥{{item1.info.marketPrice/100}}
								</view>
								<view class="num">
									X{{item1.info.num}}
								</view>
							</view>
							<view class="specification">
								{{item1.info.specification}}
							</view>
						</view>
					</view>
					<view style="text-align: right;">
						订单总金额:￥{{item.sum}}元
					</view>
				</view>

			</view>
			<view v-if="arr.length==0">
				暂无数据
			</view>
		</view>
		<view v-if="selected == 1">
			2
		</view>
		<view v-if="selected == 3">
			3
		</view>
		<view v-if="selected == 4">
			4
		</view>
		<view v-if="selected == 5">
			4
		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs';
	export default {
		components: {},
		props: {},
		data() {
			return {
				selected: 0,
				list: [{
					name: '全部'
				}, {
					name: '待付款'
				}, {
					name: '待收货'
				}, {
					name: '退货订单',
				}, {
					name: '已收货',
				}],
				arr: []
			}
		},
		methods: {
			//tab框
			selected1(item, index) {
				this.selected = index
			},
			goto(item){
				// console.log(item.info.gid);
				uni.navigateTo({
					url:`../../pages/details/details?id=${item.info.gid}`
				})
			}
		},
		mounted() {
			this.arr = uni.getStorageSync('order')
			if(this.arr.length>0){
				this.arr.map(item => {
					item.time = dayjs(item.time).format("YYYY-MM-DD HH:mm:ss")
				})
			}
			// console.log(this.arr);

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
	.specification{
		margin-top: 20rpx;
	}
	.finish {
		padding: 10rpx;
		margin: 20rpx 0;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}

	.box {
		margin-top: 20rpx;
		background-color: #C8C8C8;
		padding: 10rpx;
	}

	.indent {
		display: flex;
		justify-content: space-between;
	}

	.img {
		width: 200rpx;
		height: 200rpx;
	}

	.leftBox {
		width: 200rpx;
	}

	.merchandise {
		display: flex;
	}

	.rightBox {
		margin-left: 20rpx;
	}

	.name {
		margin-top: 20rpx;
		font-weight: bolder;
	}

	.money {
		margin-top: 20rpx;
		color: #FF0000;
	}
	.num{
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.nav_tab {
		width: 750rpx;
		height: 100rpx;
		display: flex;
		border-radius: 10rpx;
		flex-direction: row;
	}

	/* 未选中的样式 */
	.common {
		line-height: 100rpx;
		text-align: center;
		flex: 1;
		color: black;
		font-size: 32rpx;
		opacity: 0.5;
	}

	/* 选中时的样式 */
	.active {
		line-height: 100rpx;
		text-align: center;
		color: red;
		flex: 1;
		font-size: 32rpx;
		border-radius: 30rpx;
		color: #FFFFFF;
		background-color: #CC9900;
	}

	/* 下划线的样式 */
	.nav_underline {
		background: #CC9900;
		width: 80rpx;
		height: 6rpx;
		border-radius: 8rpx;
	}
</style>
