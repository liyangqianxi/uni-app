<template>
	<!-- 评论 -->
	<view>
		<view class="remark" v-if="comment.index">
			<view class="head">
				<view class="count">
					用户评价({{comment.index.tags.length}})
				</view>
				<view class="leftBox">
					<view class="name" v-if="comment.index.positive_rate">{{comment.index.positive_rate}}%满意</view>
					<view class="name" v-else>
						查看全部
					</view>
					<image src="../../static/icon/arrow_right.png" class="img"></image>
				</view>
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view v-if="label" v-for="(item,index) in label" :key="index">
					<view class="tag">{{item.name}} {{item.count}}</view>
				</view>
			</view>
			<view style="margin-top: 20rpx;" @click="goto">
				<view class="particulars">
					<image class="picture" :src="comment.content[0].avatar" mode="" v-if="comment.content[0].avatar">
					</image>
					<image v-else class="picture" src="../../static/avatar_default.png" mode=""></image>
					<view style="color:#C0C0C0 ;">
						<view>
							{{comment.content[0].nick_name}}
						</view>
						<view>
							已选: {{comment.content[0].pid_spec}}
						</view>
					</view>
				</view>
				<view style="margin-top: 20rpx;">
					{{comment.content[0].text}}
				</view>
				<view>
					<view style="margin: 0 auto;margin-top: 40rpx; width: 320rpx;">
						<u-button shape="square" size="medium">查看全部评价</u-button>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#F0F0F0"></u-gap>
		<view class="asking" @click="gott">
			<view class="head" v-if="inquire.list==null">
				<view class="">
					<view class="count">
						暂无问答
					</view>
					<view style="margin: 10rpx 0; display: flex;">
						<image class="img" src="../../static/icon/ask_list_empty.png" mode=""></image>
						<view style="margin-left: 10rpx;">
							宝贝好不好，问问已买过的人
						</view>
					</view>
				</view>
				<view class="mention">
					去提问
				</view>
			</view>
			<view v-else class="">
				<view class="head">
					<view class="count">
						问大家({{inquire.total}})
					</view>
					<view>
						<image src="../../static/icon/arrow_right.png" class="img"></image>
					</view>
				</view>
				<view v-if="answer" v-for="(item,index) in answer" :key="index" class="head">
					<view style="display: flex;margin: 20rpx 0;">
						<image class="img" src="../../static/icon/ask_question.png" mode=""></image>
						<view style="margin-left: 10rpx;">
							{{item.ask}}
						</view>
					</view>
					<view style="color:#C0C0C0 ;margin: 20rpx 0;">
						{{item.reply_total}}个回答
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
			// 评论
			comment: {
				type: Object,
				required: true
			},
			inquire: {
				type: Object,
				required: true
			},
			gid: {
				type: String,
				required: true
			},
		},
		data() {
			return {
				show: true,
				label: [],
				answer: []
			}
		},
		methods: {
			gott() {
				console.log(this.inquire.goods.gid)
				// wx.setStorageSync('key', this.inquire)
				uni.navigateTo({
					url: `../../pages/answers/answers?id=${this.inquire.goods.gid}`
				})
			},
			goto() {
				uni.navigateTo({
					url: `../../pages/evaluate/evaluate?id=${this.gid}`
				})
			},

		},
		mounted() {
			// console.log(this.inquire.list);
			if (this.comment.content) {
				this.label = this.comment.index.tags.slice(1, 5)
			}
			if (this.inquire.list) {
				this.answer = this.inquire.list.slice(0, 2)
			}

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
	.asking {
		padding: 20rpx;
	}

	.remark {
		padding: 20rpx;
	}

	.head {
		display: flex;
		justify-content: space-between;
	}

	.count {
		font-weight: bolder;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
	}

	.name {
		color: #C0C0C0;
		margin-right: 10rpx;
	}

	.leftBox {
		display: flex;
	}

	.tag {
		padding: 20rpx;
		border-radius: 30rpx;
		background-color: #D8D8D8;
		margin: 10rpx 0;
		margin-right: 20rpx;
	}

	.particulars {
		display: flex;
	}

	.picture {
		width: 100rpx;
		height: 100rpx;
		border-radius: 100%;
		margin-right: 30rpx;
	}

	.mention {
		margin: auto 0;
		padding: 10rpx;
		width: 100rpx;
		height: 50rpx;
		border-radius: 10rpx;
		border: 2rpx solid #CC9900 !important;
		color: #CC9900;
	}
</style>
