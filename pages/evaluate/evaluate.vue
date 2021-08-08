<template>
	<view>
		<!-- 评论详情 -->

		<u-navbar title="评论详情"></u-navbar>

		<view class="box">
			<view class="top-left">
				综合评价：
				<u-rate v-model="list" active-color="#ffce53"></u-rate>
			</view>
			<view class="top-right">
				{{rate}}%满意度
			</view>
		</view>
		<view class="box1">
			<view v-for="(item,index) in tags" :key='index'>
				<view :class="son===index ? 'fen':'like'" @click="onclick(item,index)">
					{{item.name}}({{item.count}})
				</view>
			</view>
		</view>
		<view v-for="(item,index) in arr" :key='index'>
			<view class="box2">
				<view class="head-top">
					<image :src="item.avatar" class="head"></image>
					<view class="">{{item.nick_name}}</view>
					<u-rate v-model="item.score" active-color="#ffce53"></u-rate>
				</view>
				<view class=""></view>
			</view>
			<view class="Selected">已选：{{item.pid_spec}}</view>
			<view class="text">{{item.text}}</view>
			<view class="box3">
				<view v-for="(item1,index1) in item.comment_imgs" :key='index1' class="tail">
					<image :src="item1.img" class="tu"></image>
				</view>
			</view>

		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				id: null,
				list: null,
				rate: null,
				tags: [],
				tagid: "",
				page: 1,
				pageSize: 20,
				arr: [],
				list1: [],
				son: 0
			}
		},
		methods: {
			getCommentTag() {
				this.$api.getCommentTag(this.id).then((res) => {
					// console.log(res)
					this.list = res.data.avg_score
					// console.log(this.list)
					this.rate = res.data.positive_rate
					this.tags = res.data.tags
					console.log(this.tags)
					this.tagid = res.data.tags[0].id
					console.log(this.tagid)
				}).catch((err) => {
					console.log('请求失败', err)
				})
			},
			getCommentContent() {
				this.$api.getCommentContent(this.id, this.page, this.pageSize, this.tagid).then((res) => {
					// console.log(res)
					this.arr = res.data.list
					console.log(this.arr)
				}).catch((err) => {
					console.log('请求失败', err)
				})
			},
			onclick(item, index) {
				this.son = index
				this.getCommentContent()
			},
			click() {
				uni.navigateBack({})
			}
		},
		mounted() {
			this.getCommentTag()
			this.getCommentContent()
		},
		onLoad(item) {
			console.log(item)
			this.id = item.id
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.one {
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		margin-bottom: 40rpx;
	}

	.img {
		width: 50rpx;
		height: 50rpx;
	}

	.get {
		width: 84%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
	}

	.box {
		margin-bottom: 20rpx;
		height: 60rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.top-left {
		margin-top: 20rpx;
		margin-left: 30rpx;
		font-size: 18px;
	}

	.top-right {
		margin-top: 20rpx;
		margin-right: 30rpx;
		font-size: 17px;
	}

	.box1 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.like {
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10rpx 20rpx;
		background-color: #fffbe0;
		height: 60rpx;
		border-radius: 30rpx;
	}

	.fen {
		font-size: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 10rpx 20rpx;
		background-color: #f8c55c;
		height: 60rpx;
		border-radius: 30rpx;
	}

	.head {
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 10rpx;
		width: 70rpx;
		height: 70rpx;
		border-radius: 100%;
	}

	.box2 {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.head-top {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.Selected {
		margin-left: 100rpx;
	}

	.text {
		margin-left: 100rpx;
		margin-top: 10rpx;
	}

	.box3 {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		margin-left: 100rpx;
	}

	.tu {
		margin-bottom: 10rpx;
		margin-top: 10rpx;
		margin: 0 10rpx;
		width: 200rpx;
		height: 200rpx;
	}
</style>
