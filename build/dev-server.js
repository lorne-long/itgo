require('./check-versions')()
var config=require('../config')
if(!process.env.NODE_ENV){
  process.env.NODE_ENV=JSON.parse(config.dev.env.NODE_ENV)
}
var opn=require('opn')
var path=require('path')
var express=require('express')
var webpack=require('webpack')
var proxyMiddleware=require('http-proxy-middleware')
var webpackConfig=require('./webpack.dev.conf')

var port=process.env.PORT||config.dev.port// 服务器默认端口

var autoOpenBrowser=!!config.dev.autoOpenBrowser // 自动打开浏览器，如果没有设置为false

var proxyTable=config.dev.proxyTable
var app=express();
var compiler=webpack(webpackConfig)
var devMiddleware=require('webpack-dev-middleware')(compiler,{
  publicPath:webpackConfig.output.publicPath,
  quiet:true
})
var hotMiddleware=require('webpack-hot-middleware')(compiler,{
  log:() =>{
  }
})
// 在 html-webpack-plugin 模板发生变化时，强制页面重载
compiler.plugin('compilation',function(compilation){
  compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
    hotMiddleware.publish({action:'reload'})
    cb()
  })
})
//代理api请求
Object.keys(proxyTable).forEach(function(context){
  var options=proxyTable[context]
  if(typeof options==='string'){
    options={target:options}
  }
  app.use(proxyMiddleware(options.filter||context,options))
})
//处理HTML5历史API的回退
app.use(require('connect-history-api-fallback')({
  rewrites:[
    // {
    //   from:"",
    //   to:"",
    // }
  ]
}))
// 服务webpack bundle输出
app.use(devMiddleware)
//启用热加载和状态保护 编译错误显示
app.use(hotMiddleware)
// / /服务于纯粹的静态资产
var staticPath=path.posix.join(config.dev.assetsPublicPath,config.dev.assetsSubDirectory)
app.use(staticPath,express.static('./static'))




var uri='http://localhost:'+port
var _resolve
var readyPromise=new Promise(resolve =>{
  _resolve=resolve
})
console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() =>{
  console.log('> Listening at '+uri+'\n')
  // 在测试环境不需要法抗浏览器
  if(autoOpenBrowser&&process.env.NODE_ENV!=='testing'){
    opn(uri)
  }
  _resolve()
})
var server=app.listen(port)
module.exports={
  ready:readyPromise,
  close:() =>{
    server.close()
  }
}
