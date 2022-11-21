<template>
    <div ref="nav" class="ui fixed inverted stackable pointing menu" :class="{'transparent':$route.name==='home' && clientSize.clientWidth>768}">
        <div class="ui container">
			<!-- logo -->
            <router-link to="/home">
                <h3 class="ui header item teal">{{siteName}}</h3>
            </router-link>
			<!-- 导航菜单 -->
            <router-link to="/home" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='home'}">
                <i class="home icon"></i>首页
            </router-link>
            <el-dropdown trigger="click" @command="handleCategory">
				<span class="el-dropdown-link item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='category'}">
					<i class="idea icon"></i>分类<i class="caret down icon"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="category.name" v-for="category in categoryList" :key="category.id">{{category.name}}</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
            <router-link to="/archives" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='archives'}">
                <i class="clone outline icon"></i>归档
            </router-link>
            <router-link to="/moments" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='moments'}">
                <i class="comment alternate outline icon"></i>动态
            </router-link>
            <router-link to="/friends" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='friends'}">
                <i class="users icon"></i>友链
            </router-link>
            <router-link to="/about" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='about'}">
                <i class="info icon"></i>关于我
            </router-link>
			<!-- 搜索框 -->
            <el-autocomplete class="right item m-search" :class="{'m-mobile-hide': mobileHide}"
			popper-class="m-search-item" v-model="queryString" placeholder="Search...">
				<i class="search icon el-input__icon" slot="suffix"></i>
				<template slot-scope="{ item }">
					<div class="name">{{ item.title }}</div>
					<span class="addr">{{ item.content }}</span>
				</template>
			</el-autocomplete>
			<!-- 手机端菜单弹出按钮 -->
			<button class="ui menu black icon button m-right-top m-mobile-show" style="margin-top: 5px" @click="toggle">
				<i class="sidebar icon"></i>
			</button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Nav",
	data() {
		return {
			mobileHide:true,
			queryString:''
		}
	},
	props:{
		siteName:{
			type:String,
			required:true
		},
		categoryList:{
			type:Array,
			required:true
		},
	},
	computed:{
		...mapState(['clientSize'])
	},
	watch:{
		// 路由改变时，收起手机端导航栏
		'$route.path':{
			deep:true,
			handler(){
				this.mobileHide = true
			}
		}
	},
	mounted() {
		//监听页面滚动位置，改变导航栏的显示
		window.addEventListener('scroll', () => {
			//首页且不是移动端
			if (this.$route.name === 'home' && this.clientSize.clientWidth > 768) {
				if (window.scrollY > this.clientSize.clientHeight / 2) {
					this.$refs.nav.classList.remove('transparent')
				} else {
					this.$refs.nav.classList.add('transparent')
				}
			}
		})
		//监听点击事件，收起导航菜单
		document.addEventListener('click', (e) => {
			//遍历冒泡
			let flag = e.path.some(item => {
				if (item === this.$refs.nav) return true
			})
			//如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
			if (!this.mobileHide && !flag) {
				this.mobileHide = true
			}
		})
	},
	methods: {
		// 控制手机端菜单弹出收起
		toggle(){
			this.mobileHide = !this.mobileHide
		},
		//分类菜单项点击事件回调
		handleCategory(categoryName){
			this.$router.push(`/category/${categoryName}`)
		}
	},
}
</script>

<style>
	.ui.fixed.menu .container {
		width: 1400px !important;
		margin-left: auto !important;
		margin-right: auto !important;
	}

	.ui.fixed.menu {
		transition: .3s ease-out;
	}

	.ui.inverted.pointing.menu.transparent {
		background: transparent !important;
	}

	.ui.inverted.pointing.menu.transparent .active.item:after {
		background: transparent !important;
		transition: .3s ease-out;
	}

	.ui.inverted.pointing.menu.transparent .active.item:hover:after {
		background: transparent !important;
	}

	.el-dropdown-link {
		outline-style: none !important;
		outline-color: unset !important;
		height: 100%;
		cursor: pointer;
	}

	.el-dropdown-menu {
		margin: 7px 0 0 0 !important;
		padding: 0 !important;
		border: 0 !important;
		background: #1b1c1d !important;
	}

	.el-dropdown-menu__item {
		padding: 0 15px !important;
		color: rgba(255, 255, 255, .9) !important;
	}

	.el-dropdown-menu__item:hover {
		background: rgba(255, 255, 255, .08) !important;
	}

	.el-popper .popper__arrow::after {
		content: none !important;
	}

	.popper__arrow {
		display: none !important;
	}

	.m-search {
		min-width: 220px;
		padding: 0 !important;
	}

	.m-search input {
		color: rgba(255, 255, 255, .9);;
		border: 0px !important;
		background-color: inherit;
		padding: .67857143em 2.1em .67857143em 1em;
	}

	.m-search i {
		color: rgba(255, 255, 255, .9) !important;
	}

	.m-search-item {
		min-width: 350px !important;
	}

	.m-search-item li {
		line-height: normal !important;
		padding: 8px 10px !important;
	}

	.m-search-item li .title {
		text-overflow: ellipsis;
		overflow: hidden;
		color: rgba(0, 0, 0, 0.87);
	}

	.m-search-item li .content {
		text-overflow: ellipsis;
		font-size: 12px;
		color: rgba(0, 0, 0, .70);
	}
</style>