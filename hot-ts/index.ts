// index.js
var http = require("http");
var vm = require("vm");
var coroutine = require("coroutine");

function new_web() {
    return new vm.SandBox({
        mq: require("mq")
    }).require("./web", __dirname);
}

function test_get() {
    const response = http.get(`http://127.0.0.1:${PORT}/foo`)
    console.log('view response', response.json())
}

var updatedCount = 0
var errorCount = 0
// 每 1s 重新载入一遍 ./web.js 文件以更新 srv 的 handler
coroutine.start(function() {
    while (true) {
        var new_handler = svr.handler;
        coroutine.sleep(1000);
        try {
            updatedCount++;
            new_handler = new_web();
            console.log(`update handler success: ${updatedCount}`)
        } catch (e) {
            errorCount++;
            console.log(`update handler error: ${errorCount}`)
        }
        svr.handler = new_handler
        test_get()
    }
})

var PORT = 8099;
var svr = new http.Server(PORT, new_web());

svr.asyncRun();
console.log(`server started on PORT ${PORT}`)
