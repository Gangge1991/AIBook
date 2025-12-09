import { defineClientConfig } from 'vuepress/client'
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import CustomFooter from './components/CustomFooter.vue'
import CustomFeatures from './components/CustomFeatures.vue'
import PersonCards from './components/PersonCards.vue'
import SidebarToggle from './components/SidebarToggle.vue'
import ExtraSideBar from './components/ExtraSideBar.vue'

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
    })

    watch(
      () => route.path,
      (newPath) => {
        updateBodyClass(newPath)
      }
    )
  },
  rootComponents: [SidebarToggle, ExtraSideBar],
})