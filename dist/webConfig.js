﻿const isOfficalData=true
export default {
    debug: true,//是否调试
    systemName: "Sainuo",
    isOfficalData,
    apiServerAddress: isOfficalData?"http://220.165.143.68:55555":"http://ronshn.tunnel.qydev.com",
    resourceServerAddress: "http://localhost:65533/wwwroot/Upload/",
    wx_callbackUrl:"http://mailzy.tunnel.qydev.com/callUrl.html",
    wx_appid:"wxd65ba2294eed10aa"
}