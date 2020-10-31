const sidebar = require('./config/sidebar');
const nav = require('./config/nav');
const routeConfig = require('./plugins/routeConfig');
const live2D = require('./plugins/live2D');
const imgZoom = require('./plugins/imgZoom');
const comment = require('./plugins/comment');

module.exports = {
  title: "KrialY",
  description: "KrialY",
  head: [
    // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
    ['link', {
      rel: 'icon',
      href: '/img/watermelon.ico'
    }]
  ],
  base: '/blog/', // 部署到github会用到的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  // 顶部导航栏
  themeConfig: {
    displayAllHeaders: true, //展开侧边栏所有的小标题
    sidebarDepth: 1, //提取markdown中h2标题，作为小标题显示在侧边栏上。
    lastUpdated: '最后更新', // 文档更新时间：每个文件git最后提交的时间,
    nav, //导航
    sidebar, //侧边栏
  },
  plugins: [
    routeConfig,
    live2D,
    imgZoom,
    comment,
  ],
}