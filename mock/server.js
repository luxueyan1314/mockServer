const express = require("express");
const bodyParser = require("body-parser");
const multipart = require("connect-multiparty");
const Mock = require("mockjs");

const multipartMiddleware = multipart();
const app = express();

// 定义mock方法
const mock = (data, params) => {
    if (Object.prototype.toString.call(data) === "[object Object]") {
        return Mock.mock(data);
    } else if (typeof data === "function") {
        return Mock.mock(data(params));
    } else {
        return "error: data shold be an object or a function.";
    }
};


// 路由和数据的聚合
const config = require("./config")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 绑定路由信息
config.forEach(({ method, url, data }) => {
    if (method === "get") {
        app.get(url, (req, res) => {
            res.json(mock(data, req.query));
        });
    } else if (method === "post") {
        app.post(url, multipartMiddleware, (req, res) => {
            res.json(mock(data, req.body));
        });
    } else if (method === "jsonp") {
        app.get(url, (req, res) => {
            const query = req.query;

            const mockData = JSON.stringify(mock(data, req.query));
            const callback =
                "typeof " +
                query.callback +
                ' === "function" && ' +
                query.callback +
                "(" +
                mockData +
                ")";

            res.send(callback);
        });
    }
});

// 支持自定义端口
let port = 7890;
process.argv.forEach((arg, index, arr) => {
    console.log("arg----------", arg);
    if (arg === "--port") {
        port = arr[index + 1] || 7890;
        return false;
    }
});

module.exports = app.listen(port, () => {
    console.log("Mock Server listening on http://localhost:" + port);
});