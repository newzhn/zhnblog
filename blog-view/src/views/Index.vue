<template>
    <!-- 首页 -->
    <div class="site">
        <!-- 顶部导航 -->
        <Nav :siteName="siteInfo.siteName" :categoryList="categoryList"></Nav>

		<!--首页大图 只在首页且pc端时显示-->
		<div class="m-mobile-hide">
			<Header v-if="$route.name==='home'"/>
		</div>

        <!-- 中间内容 -->
		<div class="main">
			<div class="m-padded-tb-big">
				<div class="ui container">
					<div class="ui stackable grid">
						<!-- 左侧个人卡片 -->
						<div class="three wide column m-mobile-hide">
							<Introduction :class="{'m-display-none':focusMode}"></Introduction>
						</div>
						<!-- 中间博客列表 -->
						<div class="ten wide column">
							<keep-alive include="BlogHome">
								<router-view></router-view>
							</keep-alive>
						</div>
						<!-- 左侧随机文章、标签云、公告栏、文章目录 -->
						<div class="three wide column m-mobile-hide">
							<RandomBlogs :randomBlogList="randomBlogList" :class="{'m-display-none':focusMode}"></RandomBlogs>
							<Tags :tagList="tagList" :class="{'m-display-none':focusMode}"></Tags>
							<!-- 目录只在文章页面进行显示 -->
							<Tocbot v-if="$route.name==='blog'"></Tocbot>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!--APlayer音乐播放器-->
		<div class="m-mobile-hide">
			<MyAPlayer/>
		</div>

		<!--回到顶部图标-->
		<el-backtop style="box-shadow: none;background: none;z-index: 9999;">
			<img src="/img/paper-plane.png" style="width: 40px;height: 40px;">
		</el-backtop>

        <!-- 底部Footer -->
		<Footer></Footer>
    </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import Nav from '@/components/common/Nav.vue';
import Introduction from '@/components/sidebar/Introduction.vue';
import RandomBlogs from '@/components/sidebar/RandomBlogs.vue';
import Tags from '@/components/sidebar/Tags.vue';
import MyAPlayer from '@/components/common/MyAPlayer.vue';
import Tocbot from '@/components/sidebar/Tocbot.vue';
import Footer from '@/components/common/Footer.vue';
import { mapState } from 'vuex';
import {SAVE_CLIENT_SIZE} from '@/store/mutations-constant'

export default {
    name:'Index',
    components:{Header,Nav,Introduction,RandomBlogs,Tags,MyAPlayer,Tocbot,Footer},
	data() {
		return {
			siteInfo:{
				siteName:"zhn's Blog"
			},
			categoryList:[
				{id:'001',name:'学习笔记'},
				{id:'002',name:'技术分享'},
				{id:'003',name:'个人项目'},
			],
			randomBlogList:[
				{title:'JavaSE学习笔记',createTime:'2022-08-03',firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png'},
				{title:'JavaSE学习笔记',createTime:'2022-08-03',firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png'},
				{title:'JavaSE学习笔记',createTime:'2022-08-03',firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png'},
				{title:'JavaSE学习笔记',createTime:'2022-08-03',firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png'},
				{title:'JavaSE学习笔记',createTime:'2022-08-03',firstPicture:'https://imgwarehouse.oss-cn-shanghai.aliyuncs.com/zhnblog/blog/firstPicture02.png'},
			],
			tagList:[
				{id:'001',name:'Java',color:'red'},
				{id:'002',name:'Spring',color:'teal'},
				{id:'003',name:'SpringMVC',color:'blue'},
				{id:'004',name:'Maven',color:'black'},
				{id:'005',name:'Redis',color:'orange'},
				{id:'006',name:'笔记',color:'yellow'},
			]
		}
	},
	computed:{
		...mapState(['focusMode'])
	},
	watch:{
		//路由改变时，页面滚动至顶部
		'$route.path':{
			deep:true,
			handler(){
				this.scrollToTop()
			}
		}
	},
	created() {
		//发送请求获取分类信息、随机文章、标签信息、最新博客

	},
	mounted() {
		//保存可视窗口大小
		this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
		window.onresize = () => {
			this.$store.commit(SAVE_CLIENT_SIZE, {clientHeight: document.body.clientHeight, clientWidth: document.body.clientWidth})
		}
	},
	methods: {
		
	},
}
</script>

<style>
    .site {
		display: flex;
		min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
		flex-direction: column;
	}

	.main {
		margin-top: 40px;
		flex: 1;
	}

	.main .ui.container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.ui.grid .three.column {
		padding: 0;
	}

	.ui.grid .ten.column {
		padding-top: 0;
	}

	.m-display-none {
		display: none !important;
	}
</style>