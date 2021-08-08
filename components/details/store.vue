<template>
	<view>
		<view class="head" @click="jump(shop.jumpURL)">
			<view style="display: flex;">
				<image class="img" :src="shop.brandLogo" mode=""></image>
				<view style="margin-left: 20rpx;">
					<view style="font-weight: bolder;">
						{{shop.brandName}}
					</view>
					<view style="margin-top: 10rpx; color: #C0C0C0;font-size: 26rpx;">
						{{shop.brandSlogan}}
					</view>
				</view>
			</view>
			<view style="display: flex;line-height: 100rpx;">
				<view style="color: #CC9900;">
					进入店铺
				</view>
				<image class="icon" src="../../static/icon/arrow_right_brown.png" mode=""></image>
			</view>
		</view>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
		<view class="nav_tab">
			<!-- 如果选中的下表等于当前的索引，就使用active class名，否则class名为common -->
			<view v-for="(item,index) in list" :class="selected==index?'active':'common'"
				@click="selected1(item,index)">
				{{item}}
				<!-- 如果选中的下表等于当前的索引，就添加下划线 -->
				<!-- <view :class="selected==index?'nav_underline':''"></view> -->
			</view>
		</view>
		<!-- tab1  -->
		<view v-if="selected == 0">
			<view style="font-size: 0;">
				<view v-for="(item,index) in introExt[0].imagesArray" :key="index">
					<image class="picture1" :src="item" mode=""></image>
				</view>
			</view>

		</view>
		<!-- tab2 -->
		<view v-if="selected == 1">
			<view style="font-size: 0;">
				<view v-for="(item,index) in introExt[1].imagesArray" :key="index">
					<image class="picture2" :src="item" mode=""></image>
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			shop: {
				type: Object,
				required: true
			},
			introExt: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				selected: 0,
				list: [],
			}
		},
		methods: {
			//tab框
			selected1(item, index) {
				this.selected = index
			},
			//跳转页面
			jump(url) {
				// #ifdef MP-WEIXIN
				uni.setClipboardData({
					data: url,
					success: function() {}
				});
				// #endif
				// #ifndef MP-WEIXIN
				window.location.href = url
				// #endif
			},
			change(index) {
				this.current = index;
			}
		},
		mounted() {
			// console.log(this.introExt)
			let arr = this.introExt.slice(0, 2)
			arr.map(item => {
				this.list.push(item.title)
			})
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
		color: #CC9900;
	}

	/* 下划线的样式 */
	.nav_underline {
		background: #CC9900;
		width: 80rpx;
		height: 6rpx;
		border-radius: 8rpx;
	}

	.head {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.img {
		width: 100rpx;
		height: 100rpx;
		border: 2rpx solid #C0C0C0;
	}

	.icon {
		margin-top: 30rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.picture1 {
		width: 100%;
		height: 500rpx;
	}


	.picture2 {
		width: 100%;
		height: 900rpx;
	}
</style>
