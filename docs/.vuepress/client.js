import { defineClientConfig } from 'vuepress/client'
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue'
import CustomFeatures from './components/CustomFeatures.vue'
import PersonCards from './components/PersonCards.vue'
import SidebarToggle from './components/SidebarToggle.vue'
import RightSidebarToggle from './components/RightSidebarToggle.vue'
import ExtraSideBar from './components/ExtraSideBar.vue'
import SidebarResizer from './components/SidebarResizer.vue'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('CustomFooter', CustomFooter)
    app.component('CustomFeatures', CustomFeatures)
    app.component('PersonCards', PersonCards)
  },
  setup() {
    const route = useRoute()
    const isHome = ref(false)

    // 监听路由变化，动态给 body 添加/移除 home 类
    const updateBodyClass = (path) => {
      // 简单判断：如果路径是 / 或者是 /index.html 则认为是首页
      // 实际根据项目配置可能需要调整
      const isHomePage = path === '/' || path === '/index.html'
      isHome.value = isHomePage
      
      if (typeof document !== 'undefined') {
        if (isHomePage) {
          document.body.classList.add('home')
        } else {
          document.body.classList.remove('home')
        }
      }
    }

    onMounted(() => {
      updateBodyClass(route.path)

      // 自动模式检测逻辑
      // 轮询检查 localStorage 中的 vuepress-reco-color-scheme
      // 如果不存在，说明是 auto 模式，给 html 添加 auto 类
      const APPEARANCE_KEY = 'vuepress-reco-color-scheme'
      const checkAutoMode = () => {
        const userPreference = localStorage.getItem(APPEARANCE_KEY)
        const html = document.documentElement
        if (!userPreference) {
          // 不存在偏好设置，即为 Auto 模式
          if (!html.classList.contains('auto')) {
            html.classList.add('auto')
          }
        } else {
          // 存在偏好设置（light 或 dark），移除 auto 类
          if (html.classList.contains('auto')) {
            html.classList.remove('auto')
          }
        }
      }

      // 立即执行一次
      checkAutoMode()
      
      // 设置定时器轮询（200ms）
      setInterval(checkAutoMode, 200)
    })

    watch(
      () => route.path,
      (newPath) => {
        updateBodyClass(newPath)
      }
    )
  },
  rootComponents: [SidebarToggle, RightSidebarToggle, ExtraSideBar, SidebarResizer],
})