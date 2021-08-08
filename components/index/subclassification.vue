<template>
	<!-- 小分类 -->
	<view>
		<view class="graph">
			<view class="box" v-for="(item,index) in classification[0].items" :key="index">
				<image class="chart" :src="item.item.pic_url" mode=""></image>
			</view>
			<view class="box" v-for="(item,index) in classification[1].items" :key="item.iid">
				<image class="chart" :src="item.item.pic_url" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			classification: {
				type: Array,
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
	.graph {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.chart{
		width: 230rpx;
		height: 270rpx;
	}
	.box{
		width: 30%;
		margin: 0 12rpx;
		margin-bottom:12rpx ;
	}
</style>
