# react-movie-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### 项目介绍：
  * 该项目实现在线实时获取豆瓣电影列表及详情页的展示。
### 实现技术:
  * 1.基于webpack来搭建项目工程，webpack-dev-server进行项目热部署，HtmlWebpackPlugin插件生成创建html入口文件，配置第三方loader:less-loader，
      url-loader,babel-loader,postcss-loader,配置第三方插件plugin:MiniCssExtractPlugin,CopyPlugin。
  * 2.使用react框架，react-router-dom搭建项目路由。
  * 3.使用Ant Design组件库进行页面布局，并实现页面加载效果和分页功能和评分组件。
  * 4.使用fetch-jsonp获取豆瓣API数据，对组件数据渲染。
  * 5.对样式表文件启用模块化，实现组件局部样式。
  * 6.利用context特性解决父子组件之间逐层传递数据。
  * 7.使用prop-types第三方包进行属性检测。
### 链接：
  * [react-movie](http://47.104.149.241:88/douban)
### 数据API接口：
  * 正在热映：
    * https://douban.uieee.com/v2/movie/in_theaters
  * 即将上映：
    * https://douban.uieee.com/v2/movie/coming_soon
  * Top250:
    * https://douban.uieee.com//v2/movie/top250
  * 电影详情：
    * https://douban.uieee.com/v2/movie/subject/:id
