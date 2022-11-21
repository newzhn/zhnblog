<template>
    <div>
		<div class="ui padded attached segment m-padded-tb-large">
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">
					<!--标题-->
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center">{{ blog.title }}</h2>
					</div>
					<!--文章简要信息-->
					<div class="row m-padded-tb-small">
						<div class="ui horizontal link list m-center">
							<div class="item m-datetime">
								<i class="small calendar icon"></i><span>{{ blog.createTime}}</span>
							</div>
							<div class="item m-views">
								<i class="small eye icon"></i><span>{{ blog.views }}</span>
							</div>
							<div class="item m-common-black">
								<i class="small pencil alternate icon"></i><span>字数≈{{ blog.words }}字</span>
							</div>
							<div class="item m-common-black">
								<i class="small clock icon"></i><span>阅读时长≈{{ blog.readTime }}分</span>
							</div>
							<a class="item m-common-black" @click.prevent="bigFontSize=!bigFontSize">
								<div data-inverted="" data-tooltip="点击切换字体大小" data-position="top center">
									<i class="font icon"></i>
								</div>
							</a>
							<a class="item m-common-black" @click.prevent="changeFocusMode">
								<div data-inverted="" data-tooltip="专注模式" data-position="top center">
									<i class="book icon"></i>
								</div>
							</a>
						</div>
					</div>
					<!--分类-->
					<router-link :to="`/category/${blog.category.name}`" class="ui orange large ribbon label m-mobile-hide" v-if="blog.category">
						<i class="small folder open icon"></i><span class="m-text-500">{{ blog.category.name }}</span>
					</router-link>
					<!--文章Markdown正文-->
					<div class="typo js-toc-content m-padded-tb-small match-braces rainbow-braces" v-viewer :class="{'m-big-fontsize':bigFontSize}" v-html="blog.content"></div>
					<!--赞赏-->
					<div style="margin: 2em auto">
						<el-popover placement="top" width="220" trigger="click" v-if="blog.appreciation">
							<div class="ui orange basic label" style="width: 100%">
								<div class="image">
									<div style="font-size: 12px;text-align: center;margin-bottom: 5px;">一毛是鼓励</div>
									<img :src="$store.state.siteInfo.reward" alt="" class="ui rounded bordered image" style="width: 100%">
									<div style="font-size: 12px;text-align: center;margin-top: 5px;">一块是真爱</div>
								</div>
							</div>
							<el-button slot="reference" class="ui orange inverted circular button m-text-500">赞赏</el-button>
						</el-popover>
					</div>
					<!--横线-->
					<el-divider>END</el-divider>
					<!--标签-->
					<div class="row m-padded-tb-no">
						<div class="column m-padding-left-no">
							<router-link :to="`/tag/${tag.name}`" class="ui tag label m-text-500 m-margin-small" :class="tag.color" v-for="(tag,index) in blog.tags" :key="index">{{ tag.name }}</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--博客信息-->
		<div class="ui attached positive message">
			<ul class="list">
				<li>作者：{{ $store.state.introduction.name }}
					<router-link to="/about">（联系作者）</router-link>
				</li>
				<li>发表时间：{{ blog.createTime }}</li>
				<li>最后修改：{{ blog.updateTime }}</li>
				<li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。</li>
			</ul>
		</div>
		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
			<Comment v-if="blog.commentEnabled"/>
			<h3 class="ui header" v-else>评论已关闭</h3>
		</div>
	</div>
</template>

<script>
import Comment from '@/components/comment/Comment.vue';
import { mapState } from 'vuex';
import { SET_FOCUS_MODE,SET_IS_BLOG_RENDER_COMPLETE } from '@/store/mutations-constant';

export default {
    name:'Blog',
	components:{Comment},
    data() {
        return {
            bigFontSize: false,//控制文章字体大小
            blog:{
                title:'Maven学习笔记',
                createTime:'2022-11-16',
                updateTime:'2022-11-16',
                views:23,
                words:3643,
                readTime:60,
                category:{id:1,name:'学习笔记'},
                content:'<h1 id="第一章-maven概述">第一章 Maven概述</h1><h2 id="1-为什么要学习maven">1. 为什么要学习Maven</h2><h3 id="11-maven作为依赖管理工具">1.1 Maven作为依赖管理工具</h3><h4 id="111-jar-包的规模">1.1.1 jar 包的规模</h4><p>随着我们使用越来越多的框架，或者框架封装程度越来越高，项目中使用的jar包也越来越多。项目中，一个模块里面用到上百个jar包是非常正常的。'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '比如下面的例子，我们只用到 SpringBoot、SpringCloud 框架中的三个功能：</p><p>本地仓库默认值：用户家目录/.m2/repository。由于本地仓库的默认位置是在用户的家目录下，而家目录往往是在 C 盘，也就是系统盘。将来 Maven 仓库中 jar 包越来越多，仓库体积越来越大，可能会拖慢 C 盘运行速度，影响系统性能。所以建议将 Maven 的本地仓库放在其他盘符下。配置方式如下：</p>'+
                        '<div class="code-toolbar"><pre class="language-xml line-numbers" tabindex="0"><code class="language-xml"><span class="token comment">&lt;!-- localRepository'+
						'| The path to the local repository maven will use to store artifacts.'+
						'|'+
						'| Default: ${user.home}/.m2/repository'+
						'&lt;localRepository&gt;/path/to/local/repo&lt;/localRepository&gt;'+
						'--&gt;</span>'+
						'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>localRepository</span><span class="token punctuation">&gt;</span></span>D:\maven-repository<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>localRepository</span><span class="token punctuation">&gt;</span></span>'+
						'<span aria-hidden="true" class="line-numbers-rows"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span></code></pre><div class="toolbar"><div class="toolbar-item"><button class="copy-to-clipboard-button" type="button" data-copy-state="copy"><span>Copy</span></button></div></div></div>',
                appreciation:false,
                commentEnabled:true,
                tags:[
                    {id:1,name:'Maven',color:'red'},
                    {id:2,name:'笔记',color:'blue'},
                ],
            }
        }
    },
	computed:{
		blogId(){
			return parseInt(this.$route.params.blogId)
		},
		...mapState(['focusMode'])
	},
	created(){
		// 根据id发送请求获取博客信息
	},
	mounted() {
		this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE,true)
	},
	beforeRouteEnter(to,from,next){
		// 在路由切换到博客页面之前，触发这个钩子函数，修改博客的渲染状态
		next(vm => {
			// 在钩子函数执行前，组件实例尚未创建
			// vm就是当前组件的实例，可以当作this来用
			vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE,false)
		})
	},
	beforeRouteLeave (to, from, next) {
		this.$store.commit(SET_FOCUS_MODE, false)
		this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE,false)
		// 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例，因为tocbot实例在外部组件里
		// 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
		tocbot.destroy()
		next()
	},
	beforeRouteUpdate(to, from, next) {
		// 一般有两种情况会触发这个钩子
		// 1.当前文章页面跳转到其它文章页面
		// 2.点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
		// 在路由 beforeRouteUpdate 中判断路径是否改变
		// 如果跳转到其它页面，to.path!==from.path 就放行 next()
		// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
		if (to.path !== from.path) {
			this.$store.commit(SET_FOCUS_MODE, false)
			//在当前组件内路由到其它博客文章时，要重新获取文章
			//this.getBlog(to.params.id)
			//只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
			this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
			next()
		}
	},
    methods: {
        changeFocusMode(){
			this.$store.commit(SET_FOCUS_MODE,!this.focusMode)
        }
    },
}
</script>

<style scoped>
	.el-divider {
		margin: 1rem 0 !important;
	}

	h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
		display: block;
		content: " ";
		height: 55px;
		margin-top: -55px;
		visibility: hidden;
	}
</style>