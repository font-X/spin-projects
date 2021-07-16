/*
let WSObject = {
    ws: null,
    wsurl: url,
    progress: null,//进度条
    pageSize: 102400,
    pageIndex: 1,
    pageCount: 1,
    enableRead: true,//标识是否可以读取文件
    total: 0,  //总字节数
    blobdata: [],
    ID: Math.floor(Math.random() * 0x10000).toString(16),
    message: {
        evt: null,
        state: null
    },
    printlist: [],
    callbackfun: null
}
*/
function WSObject(url) {
    let ws = null;
    let wsurl = url;
    let progress;//进度条
    let pageSize = 102400;
    let pageIndex = 1;
    let pageCount = 1;
    let enableRead = true;//标识是否可以读取文件
    let total = 0;  //总字节数
    let blobdata = [];
    let ID = Math.floor(Math.random() * 0x10000).toString(16);
    let message = {
        evt: null,
        state: null
    };
    let printlist = [];
    let callbackfun;
    WSObject.prototype.Connect = function (onSuccess, onError) {
        if (ws == null) createSocket(onSuccess, onError);
    }
    WSObject.prototype.PrintSomeA = function (tempType, tempNote, labelNote, copies, printer, isPreView) {
        if (ws == null) {
            createSocket(function () {
                printsome(tempType, tempNote, labelNote, copies, printer, isPreView);
            }, function (res) {
                alert("打印程序未开启");
                console.error(res);
            });
        }
        else printsome(tempType, tempNote, labelNote, copies, printer, isPreView);
    }
    function printsome(tempType, tempNote, labelNote, copies, printer, isPreView) {
        let data = {
            ID: ID, PageCount: pageCount, PageIndex: pageIndex,
            Command: "printSome",
            TempType: tempType,
            TempFix: tempNote,
            TempVar: labelNote,
            Copies: copies,
            PrinterName: printer,
            IsPreView: isPreView
        };
        ws.send(JSON.stringify(data));
    }
    WSObject.prototype.SendFile = function (fileID, progressOneID, callback) {
        let fileobj = document.getElementById(fileID);
        progress = document.getElementById(progressOneID);
        if (AnalyzeFile(fileobj)) {
            let reader = new FileReader();
            //reader.readAsArrayBuffer(fileobj.files[0]);
            reader.readAsText(fileobj.files[0]);
            reader.onload = function loaded(e) {
                SendReady(e.target.result, progressOneID, callback);
            }
        }
    }
    function AnalyzeFile(input, fileID, progressOneID, callback) {
        if (typeof window.ActiveXObject != 'undefined') {
            let path = input.value;
            try {
                let fso = new ActiveXObject("Scripting.FileSystemObject");
                let readerfso = fso.openTextFile(path, 1);
                content = reader.readAll();
                readerfso.close();
                SendReady(content, progressOneID, callback);
            }
            catch (e) {
                alert("Internet Explore read local file error: \n" + e.message);
            }
            return false;
        }
        else return true;
    }
    WSObject.prototype.SendBlob = function (data, progressOneID, callback) {
        SendReady(data, progressOneID, callback);
    }
    WSObject.prototype.GetPrint = function (callback) {
        callbackfun = callback;
        if (ws == null) {
            createSocket(function () {
                GetPrintpro();
            }, function (res) {
                alert("打印程序未开启");
                console.error(res);
            });
        }
        else GetPrintpro();
    }
    function GetPrintpro() {
        let data = { ID: ID, PageCount: 1, PageIndex: 1, Command: "getPrint" };
        ws.send(JSON.stringify(data));
    }
    function SendReady(data, progressOneID, callback) {
        progress = document.getElementById(progressOneID);
        callbackfun = callback;
        let cuLoaded = 0;
        total = data.length;
        pageIndex = 1;
        pageCount = Math.ceil(total / pageSize);
        blobdata = [];
        /*
        ws.addEventListener("message", function (event) {
            let data = event.data;
            // 处理数据
        });
        */
        for (let i = 0; i < pageCount; i++) {
            blobdata.push(data.slice(cuLoaded, cuLoaded + pageSize));
        }
        if (ws == null) {
            createSocket(function () {
                SendBlobpro();
            }, function (res) {
                console.error(res);
            });
        }
        else SendBlobpro();
    }
    function SendBlobpro() {
        try {
            if (pageIndex <= pageCount) {
                let data = {
                    ID: ID, PageCount: pageCount, PageIndex: pageIndex,
                    Command: "sendBlob", Data: blobdata[pageIndex - 1] //new Uint8Array(blob)
                };
                ws.send(JSON.stringify(data));
            }
            else {
                if (callbackfun) callbackfun();
                return;
            }
            //显示结果进度
            if (progress) {
                let percent = (pageIndex / pageCount).toFixed(2) * 100;
                //document.getElementById('Status').innerText = percent;
                //document.getElementById('progressOne').value = percent;
                progress.value = percent;
            }
            pageIndex++;
        }
        catch (e) {
            //alert("error:" + e.message);
            console.error(e);
        }
    }
    //创建和服务器的WebSocket 链接
    function createSocket(onSuccess, callback) {
        if ('WebSocket' in window) {
            ws = new WebSocket(wsurl);
        } else if ('MozWebSocket' in window) {
            ws = new MozWebSocket(wsurl);
        } else {
            message.state = 4;
            console.info("未建立连接");
            if (callback) callback(message);
        }
        ws.onopen = function () {
            console.log('connected成功');
            if (onSuccess) onSuccess();
        }
        ws.onmessage = function (e) {
            if (typeof e.data === "string") {
                let data = JSON.parse(e.data);
                switch (data.Command) {
                    case "sendBlob":
                        if (data.Code == 0 || data.ID == ID) SendBlobpro();
                        else console.error(data.Message);
                        break;
                    case "getPrint":
                        if (data.Code == 0) printlist = data.Data;
                        else console.error(data.Message);
                        if (callbackfun) {
                            callbackfun(printlist);
                            callbackfun = null;
                        }
                        break;
                }
            } else if (e.data instanceof ArrayBuffer) {
                //let buffer = event.data;
                //console.log("Received arraybuffer");
            }
        }
        ws.onclose = function (e) {
            ws = null;
            console.log(e);
        }
        ws.onerror = function (e) {
            ws = null;
            //中止客户端读取
            console.info(e);
            console.log('传输中发生异常');
            if (callback) callback(e);
            if (callbackfun) callbackfun(e);
        }
    }
}
export default WSObject