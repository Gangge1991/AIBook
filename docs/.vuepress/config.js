import { viteBundler } from '@vuepress/bundler-vite'
import recoTheme from 'vuepress-theme-reco'
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";
// import extraSideBar from "./extraSideBar";
import footer from "./footer";
import navbar from "./navbar";
import sidebar from "./sidebar";
import extraSideBar from "./extraSideBar";


export default defineUserConfig({
  public: 'docs/.vuepress/pubic',
  lang: 'zh-CN',
  title: 'AI修仙传',
  description: 'A book about AI to God',
  head: [
    ['link', { rel: 'icon', href: `/small_logo.png` }],
    //增加manifest.json
    ['link', { rel: 'manifest', href: '/manifest.json' }],
  ],
  // markdown: {
  //   headers: {
  //     level: [1 ,2]
  //   }
  // },
  css: {
    // CSS 预处理器
    preprocessorOptions: {
      // 定义全局 SCSS 变量
      scss: {
        api: 'modern-compiler', // "modern-compiler" or "modern", "legacy"
        silenceDeprecations: ['legacy-js-api'], // 重点：解决sass警告问题
        // javascriptEnabled: true,
        // additionalData: `@use "@/styles/_variables.scss" as *;`
      }
    }},
  bundler: viteBundler({
    viteOptions: {
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
            // silenceDeprecations: ['legacy-js-api'],
            // quietDeps: true,
          // additionalData: ``,
          // silenceDeprecations: ['legacy-js-api']
          }
        }
      }
    }
  }),
  
  theme: recoTheme({
    logo: "/small_logo.png",
    navbar: navbar,
    series: sidebar,
    lastUpdatedText: "最近更新",

    // GitHub 仓库位置
    repo: "Gangge1991/aibook",
    docsBranch: "master",

    // 编辑链接
    editLink: true,
    editLinkText: "完善页面",
    
    // 底部版权信息 (Note: Default theme might not support this custom footer structure)
    footer:footer, 
    extraSideBar: extraSideBar,
    // 自定义目录标题
    catalogTitle: '本页导航',
  }),

  plugins: [
    searchProPlugin({
      // 索引全部内容
      indexContent: true,
      // 关闭搜索提示和历史
      autoSuggestions: false,
      queryHistoryCount: 0,
      resultHistoryCount: 0,
      // 为分类和标签添加索引
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "分类：$content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "标签：$content",
        },
      ],
    }),
  ],

  // plugins: ['@vuepress/pwa', {
  //   serviceWorker: true,
  //   updatePopup: true
  // }]
})
