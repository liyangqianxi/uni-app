<template>
	<!-- 问答 -->
	<view>
		<view class="wrnm">
			<view class="a-fuck">
				<image class="b-fuck" src="../../static/backtrack.png" mode="" @click="goto"></image>
				<view class="c-fuck" :shift="shift">问大家({{shift.total}})</view>
			</view>
		</view>

		<view class="a-qnmd" v-if="shift.goods">
			<view class="b-qnmd">
				<image style="height: 50px;width: 50px;" :src="shift.goods.img800s" mode=""></image>
				<view class="c-qnmd">{{shift.goods.name}}</view>
			</view>
		</view>
		<view class="a-super" v-for="(item,index) in arr" :key="index" v-if="arr.length>0">
			<view class="b-super">
				<view class="c-super">
					<image style="width: 20px;height: 20px;" src="../../static/icon/ask_question.png" mode=""></image>
					<view class="d-super">{{item.ask}}</view>
				</view>
				<view class="c-super">
					<image style="width: 20px;height: 20px;" src="../../static/icon/answer.png" mode=""></image>
					<view class="f-super" v-if="item.top_reply!==''">{{item.top_reply}}</view>

				</view>
				<view class="dnmd">
					<view style="font-size: 13px;color: #808080;margin: 10px 0;">全部{{item.reply_total}}个回答</view>
				</view>
			</view>
		</view>
		<view class="cnmd" v-if="arr===null">
			<image class="cnmd-b" src="../../static/icon/ask_list_empty.png" mode=""></image>
			<view class="cnmd-a">好不好，问大家</view>
		</view>
		<view class="pos">
			<u-input placeholder="向小伙伴提问吧(4-40字)" :type="type" :border="border" class="inp"/>
			<u-button type="warning" shape="circle">提问</u-button>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {

		},
		data() {
			return {
				shift: {},
				gid: '',
				arr: [],
				
				type: 'text',
				border: true

			}
		},
		methods: {
			getAskInfo() {
				this.$api.getAskInfo(this.gid).then(res => {
					this.shift = res.data
					this.arr = res.data.list
					// this.time=this.arr.map(item=>{
					// 	return item.utime
					// })
					// console.log(this.time)
					console.log(this.arr)
				}).catch(err => {
					console.log(err)
				})
			},
			goto() {
				uni.navigateBack({})
			}
		},
		mounted() {

			this.getAskInfo()
			// console.log(this.shift)
		},
		onLoad(gid) {
			this.gid = gid.id
			// console.log(this.gid)
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.a-fuck {
		display: flex;
		height: 40px;
		align-items: center;

	}

	.pos {
		position: fixed;
		width: 100%;
		bottom: 10px;
		display: flex;
	}

	.b-fuck {
		height: 20px;
		width: 20px;
		margin: 10rpx;
	}

	.c-fuck {
		font-size: 18px;
		font-weight: bold;
		position: absolute;
		left: 40%;

	}

	.b-qnmd {
		display: flex;
		align-items: center;
		margin: 6px;
	}

	.c-qnmd {
		font-size: 15px;
		color: #808080;
	}

	.c-super {
		display: flex;
		align-items: center;
		margin: 10px;
	}

	.d-super {
		font-size: 18px;
		font-weight: bold;
	}

	.b-super {
		margin-bottom: 50px;
	}

	.cnmd {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.cnmd-b {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		margin: 10px;
	}

	.cnmd-a {
		font-size: 15px;
	}
	.inp {
		border-radius: 20px;
		background: #F1F1F1;
		width: 80%;
	}
</style>
