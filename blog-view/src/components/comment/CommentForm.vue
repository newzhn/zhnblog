<template>
    <!-- 评论输入表单 -->
    <div class="form">
        <!-- heading -->
        <h3>
			发表评论:<el-button class="m-small" size="mini" type="primary" v-show="parentCommentId!==-1" @click="concelReply">取消回复</el-button>
		</h3>
        <!-- 表单 -->
        <el-form :inline="true" :model="commentForm" size="small">
            <!-- 输入框 -->
            <el-input ref="textareaRef" :class="'textarea'" type="textarea" v-model="commentForm.content" :rows="5" placeholder="评论千万条，友善第一条"
            maxlength="200" show-word-limit ></el-input>
            <!-- 表情 -->
            <div class="el-form-item el-form-item--small emoji">
                <img src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png" @click="showEmojiBox">
                <div class="mask" v-show="emojiShow" @click="hideEmojiBox"></div>
                <div class="emoji-box" v-show="emojiShow">
					<div class="emoji-title">
						<span>{{ activeEmojiTab === 0 ? 'tv_小电视' : activeEmojiTab === 1 ? '阿鲁' : '泡泡' }}</span>
					</div>
					<div class="emoji-wrap" v-show="activeEmojiTab===0">
						<div class="emoji-list" v-for="(img,index) in tvMapper" :key="index" @click="insertEmoji(img.name)">
							<img :src="img.src" :title="img.name">
						</div>
					</div>
					<div class="emoji-wrap" v-show="activeEmojiTab===1">
						<div class="emoji-list" v-for="(img,index) in aruMapper" :key="index" @click="insertEmoji(img.name)">
							<img :src="img.src" :title="img.name">
						</div>
					</div>
					<div class="emoji-wrap" v-show="activeEmojiTab===2">
						<div class="emoji-list" v-for="(img,index) in paopaoMapper" :key="index" @click="insertEmoji(img.name)">
							<img :src="img.src" :title="img.name">
						</div>
					</div>
					<div class="emoji-tabs">
						<a class="tab-link" :class="{'on':activeEmojiTab===0}" @click="activeEmojiTab=0">
							<img src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/tv/1.png">
						</a>
						<a class="tab-link" :class="{'on':activeEmojiTab===1}" @click="activeEmojiTab=1">
							<img src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/aru/1.png">
						</a>
						<a class="tab-link" :class="{'on':activeEmojiTab===2}" @click="activeEmojiTab=2">
							<img src="https://fastly.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png">
						</a>
					</div>
				</div>
            </div>
            <!-- 昵称/QQ -->
            <el-form-item>
                <el-popover ref="nicknamePopover" placement="bottom" trigger="click" content="输入QQ将自动拉取昵称和头像"> </el-popover>
                <el-input type="text" v-model="commentForm.nickname" placeholder="昵称（必填）" prefix-icon="el-icon-user" 
                v-popover:nicknamePopover></el-input>
            </el-form-item>
            <!-- 邮箱 -->
            <el-form-item>
                <el-popover ref="emailPopover" placement="bottom" trigger="click" content="用于接收回复邮件"> </el-popover>
                <el-input type="text" v-model="commentForm.email" placeholder="邮箱（必填）" prefix-icon="el-icon-message" 
                v-popover:emailPopover></el-input>
            </el-form-item>
            <!-- URL -->
            <el-form-item>
                <el-popover ref="websitePopover" placement="bottom" trigger="click" content="可以让我参观一下吗😊"> </el-popover>
                <el-input type="text" v-model="commentForm.website" placeholder="URL（可选）" prefix-icon="el-icon-map-location" 
                v-popover:websitePopover></el-input>
            </el-form-item>
            <!-- 订阅回复按钮 -->
            <el-form-item label="订阅回复">
				<el-switch v-model="commentForm.notice"></el-switch>
			</el-form-item>
            <!-- 发表按钮 -->
            <el-form-item>
                <el-button type="primary" size="medium">发表评论</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {SET_PARENT_COMMENT_ID} from '@/store/mutations-constant'
//引入表情插件
import tvMapper from '@/plugins/tvMapper.json'
import aruMapper from '@/plugins/aruMapper.json'
import paopaoMapper from '@/plugins/paopaoMapper.json'
//引入邮箱和网址正则校验工具
import {checkEmail,checkUrl} from '@/util/reg'

export default {
    name:'CommentForm',
    data() {
        // website为可选输入，所以需要再封装一次
        var validateWebsite = (rule, value, callback) => {
            if (value) {
                return checkUrl(rule, value, callback)
            }
            callback()
        };
        return {
            // 表单校验规则
            formRules: {
                nickname: [
                    {required: true, message: '请输入评论昵称'},
                    {max: 18, message: '昵称不可多于15个字符'}
                ],
                email: [
                    {required: true, message: '请输入评论邮箱'},
                    {validator: checkEmail}
                ],
                website: [
                    {required: false},
                    {validator: validateWebsite}
                ]
            },
            emojiShow: false,//控制表情框开关
            activeEmojiTab: 0,//控制当前输入那个表情包
            tvMapper: [],
            aruMapper: [],
            paopaoMapper: [],
            textarea: null,//在页面挂载完成之后获取输入框对象
            start: 0,
            end: 0,
        }
    },
    computed:{
        ...mapState(['parentCommentId','commentForm','commentQuery'])
    },
    created() {
        this.tvMapper = tvMapper
        this.aruMapper = aruMapper
        this.paopaoMapper = paopaoMapper
    },
    mounted() {
        this.textarea = document.querySelector('.el-form textarea')
    },
    methods: {
        // 展示表情框
        showEmojiBox() {
            this.start = this.textarea.selectionStart
            this.end = this.textarea.selectionEnd
            this.textarea.focus()
            this.textarea.setSelectionRange(this.start, this.end)
            this.emojiShow = !this.emojiShow
        },
        insertEmoji(name) {
            let str = this.commentForm.content
            this.commentForm.content = str.substring(0, this.start) + name + str.substring(this.end)
            this.start += name.length
            this.end = this.start
            this.textarea.focus()
            this.$nextTick(() => {
                this.textarea.setSelectionRange(this.start, this.end)
            })
        },
        hideEmojiBox() {
            this.emojiShow = false
            this.textarea.focus()
            this.textarea.setSelectionRange(this.start, this.end)
        },
		// 取消评论-还原评论框到初始状态
		concelReply(){
			this.$store.commit(SET_PARENT_COMMENT_ID,-1)
		}
    }
}
</script>

<style>
	.form {
		background: #fff;
		position: relative;
	}

	.form h3 {
		margin: 5px;
		font-weight: 500 !important;
	}

	.form .m-small {
		margin-left: 5px;
		padding: 4px 5px;
	}

	.el-form .textarea {
		margin-top: 5px;
		margin-bottom: 15px;
	}

	.el-form textarea {
		padding: 6px 8px;
	}

	.el-form textarea, .el-form input {
		color: black;
	}

	.el-form .el-form-item__label {
		padding-right: 3px;
	}

	.emoji {
		margin-right: 5px;
		position: relative;
		user-select: none;
	}

	.emoji > img {
		cursor: pointer;
		transition: all 0.3s ease-in-out;
		-webkit-transition: all 0.3s ease-in-out;
		-moz-transition: all 0.3s ease-in-out;
		-o-transition: all 0.3s ease-in-out;
	}

	.emoji > img:hover {
		transform: rotate(360deg);
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-o-transform: rotate(360deg);
	}

	.emoji-box {
		color: #222;
		overflow: visible;
		background: #fff;
		border: 1px solid #E5E9EF;
		box-shadow: 0 11px 12px 0 rgba(106, 115, 133, 0.3);
		border-radius: 8px;
		width: 340px;
		position: absolute;
		top: 40px;
		z-index: 100;
	}

	.emoji-box * {
		box-sizing: content-box;
	}

	.emoji-box .emoji-title {
		font-size: 12px;
		line-height: 16px;
		margin: 13px 15px 0;
		color: #757575;
	}

	.emoji-box .emoji-wrap {
		margin: 6px 11px 0 11px;
		height: 185px;
		overflow: auto;
		word-break: break-word;
	}

	.emoji-box .emoji-wrap .emoji-list {
		height: 33px;
		color: #111;
		border-radius: 4px;
		transition: background 0.2s;
		display: inline-block;
		outline: 0;
		cursor: pointer;
	}

	.emoji-box .emoji-wrap .emoji-list:hover {
		background-color: #ddd;
	}

	.emoji-box .emoji-wrap .emoji-list img {
		margin: 4px;
		width: 25px;
		height: 25px;
	}

	.emoji-box .emoji-tabs {
		position: relative;
		height: 36px;
		overflow: hidden;
		background-color: #f4f4f4;
		border-radius: 0 0 4px 4px;
	}

	.emoji-box .emoji-tabs .tab-link {
		cursor: pointer;
		float: left;
		padding: 7px 18px;
		width: 22px;
		height: 22px;
	}

	.emoji-box .emoji-tabs .tab-link.on {
		background-color: #fff;
	}

	.emoji-box .emoji-tabs .tab-link img {
		width: 22px;
	}

	.emoji-box .emoji-tabs .tab-link:hover {
		background: #e7e7e7;
	}

	.mask {
		pointer-events: auto;
		position: fixed;
		z-index: 99;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>