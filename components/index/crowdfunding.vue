<template>
	<!-- 微淘众筹 -->
	<view class="crowdfunding">
		<view class="title">
			<view>
				微淘众筹
			</view>
			<view style="font-size: 24rpx;margin-top: 10rpx;">
				更多>
			</view>
		</view>
		<view class="details">
			<view v-for="(item,index) in goods.items" :key="index" :class="{'bigBox' :index===0 ,'little': index !==0}">
				<view class="box">
					<view class="leftBox">
						<view>
							{{item.item.name}}
						</view>
						<view class="text" v-if="index===0">
							{{item.item.summary}}
						</view>
						<view style="color:#FF0000;">
							￥{{item.item.market_price/100}}
						</view>
					</view>
					<view class="rightBox">
						<image class="picture" :src="item.item.pic_url" mode=""></image>
					</view>
				</view>
				<view class="buttomBOX">
					<image class="logo" :src="item.item.label_url" mode=""></image>
					支持人数
					<view style="color:#e5cea9 ;">
						{{item.item.saled_count}}
					</view>
					<view v-if="index===0">
						/ 完成度
						<text style="color:#e5cea9 ;">
							{{item.item.progress}}%
						</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			goods: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {},
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
	.crowdfunding {
		border-radius: 20rpx;
		width: 95%;
		margin: 0 auto;
		background-color: #FFF9E3;
	}

	

	.details {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		display: flex;
		flex-wrap: wrap;
		background-color: #ffffff;
		padding: 0 10rpx;
		font-size: 24rpx;
	}

	.box {
		display: flex;

	}

	.bigBox .leftBox {
		padding: 30rpx 0;
		width: 445rpx;
	}

	.bigBox .picture {
		width: 250rpx;
		height: 260rpx;
	}

	.bigBox {
		border-bottom: 12rpx solid #FF3300;
		padding: 10rpx 0;
	}

	.text {
		color: #e5cea9;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		margin: 20rpx 0;
	}

	.buttomBOX {
		display: flex;
	}

	.logo {
		width: 40rpx;
		height: 40rpx;
		margin: 0 20rpx;
	}

	.little {
		// font-size: 20rpx;
		border-bottom: 12rpx solid #FF3300;
		width: 339rpx;
		margin: 20rpx 5rpx;
		padding: 10rpx 0;
	}

	.little .leftBox {
		width: 60%;
	}

	.little .picture {
		width: 100rpx;
		height: 160rpx;
	}
</style>
