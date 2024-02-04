const express = require("express");
const http = require('http');
const WebSocket = require('ws');

const app = express();

// 初始化一个简单的 http 服务器
const server = http.createServer(app);

// 初始化 WebSocket 服务器实例，挂载在 http 服务器上
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    // 当 WebSocket 从一个端点接收到消息时，我们会在控制台中打印出来
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    // 我们会发送欢迎消息到连接的客户端
    ws.send('Hello, client!');
});
// 启动我们的服务器
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});