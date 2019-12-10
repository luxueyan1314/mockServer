// 路由和数据的聚合
module.exports = [{
    method: "get",
    url: '/api/getUserInfo',
    data: require("./api/getUserInfo")
}, {
    method: "post",
    url: '/api/test',
    data: require("./api/testData")
}];