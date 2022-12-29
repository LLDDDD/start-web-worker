const myWebWorker = new Worker('./worker.js');

myWebWorker.onmessage = function(event) {
    console.log('主线程收到消息：', event.data);
}

myWebWorker.postMessage('hello world!');