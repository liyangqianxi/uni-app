<template>
	<!-- 特卖汇 -->
	<view class="variety">
		<view class="box" v-for="(item,index) in kind.data.items" :key="index">
			<view class="title1">
				{{item.item.title}}
			</view>
			<view class="subtitle">
				{{item.item.subtitle}}
			</view>
			<image class="picture" :src="item.item.pic_url1" mode=""></image>

		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			kind: {
				type: Object,
				required: true
			}
		},
		data() {
			return {}
		},
		methods: {},
		mounted() {
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
	.variety {
		border-radius: 20rpx;
		width: 95%;
		margin: 0 auto;
		display: flex;
		background-color: #FFFFFF;
	}

	.box {
		margin: 0 5rpx;
	}

	.title1 {
		text-align: center;
		font-size: 42rpx;
	}

	.subtitle {
		text-align: center;
		font-size: 26rpx;
		color: #FFCC66;
	}

	.picture {
		width: 170rpx;
		height: 160rpx;

	}
</style>
