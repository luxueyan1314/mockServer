# 搭建本地 Mock 服务
介绍：使用mockjs搭建生成随机数据项目，用于模拟服务器接口调用。
Node + mockjs + express
(欢迎star)

## 运行项目：
```
npm i 
```
```
npm run dev 
```

## 使用教程：
1、在 Vue.js 项目中，vue.config.js 文件中的 proxy 选项用于配置开发服务器的代理。
```
module.exports = {
  devServer: {
    proxy: {
      '/mock-api': {
        target: 'http://127.0.0.1:7890', // 确保这是你的 API 服务器的正确 URL
        changeOrigin: true,
        pathRewrite: {
          '^/mock-api': ''
        }
      }
    }
  }
};
```
2、配置接口请求地址请按照api/config中url

3、若想自定义接口，请在api中新建js文件并根据mockjsApi(http://mockjs.com) 进行配置。


## 增加WebSocket接口

在项目中可使用下面代码链接WebSocket服务
``` 
this.ws = new WebSocket('ws://127.0.0.1:8999')
this.ws.onopen = () => {
  console.log('WebSocket connected')
}
this.ws.onmessage = (e) => {
  console.log('WebSocket received message:', e.data)
}
this.ws.onclose = () => {
  console.log('WebSocket closed')
}
this.ws.onerror = () => {
  console.log('WebSocket error')
}
```


