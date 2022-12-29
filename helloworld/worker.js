
this.postMessage("i'm from web worker");

this.onmessage =  function(event){
    console.log('worker 线程收到消息：', event.data);
}