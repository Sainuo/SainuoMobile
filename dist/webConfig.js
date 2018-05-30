const isOfficalData=true
export default {
    debug: true,//是否调试
    systemName: "Sainuo",
    isOfficalData,
    apiServerAddress: isOfficalData?"http://220.165.143.68:55555":"",
    resourceServerAddress: "http://localhost:65533/wwwroot/Upload/"
}