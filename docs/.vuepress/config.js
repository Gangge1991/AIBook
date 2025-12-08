import { viteBundler } from '@vuepress/bundler-vite'
import recoTheme from 'vuepress-theme-reco'
import { defineUserConfig } from "vuepress";
// import extraSideBar from "./extraSideBar";
import footer from "./footer";
import navbar from "./navbar";
import sidebar from "./sidebarConfig";


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
  markdown: {
    headers: {
      level: [1 ,2]
    }
  },
  bundler: viteBundler(),
  
  theme: recoTheme({
    logo: "/small_logo.png",
    navbar: navbar,
    // sidebar: sidebar,
    series: sidebar,
    lastUpdatedText: "最近更新",

    // GitHub 仓库位置
    repo: "Gangge1991/aibook",
    docsBranch: "master",

    // 编辑链接
    editLink: true,
    editLinkText: "完善页面",
    
    // 底部版权信息 (Note: Default theme might not support this custom footer structure)
    // footer, 
  }),

  // plugins: ['@vuepress/pwa', {
  //   serviceWorker: true,
  //   updatePopup: true
  // }]
})
