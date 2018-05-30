import Vue from "vue"
import "~/static/javascript/dateFormat"

const textToDate = (text) => {
    var d = new Date("Invalid Date");
    if (text instanceof Date) {
        d = text;
    }
    else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(text)) {
        //2016-09-18T03:46:11
        var t = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/.exec(text);
        d = new Date(t[1], parseInt(t[2]) - 1, t[3], t[4], t[5], t[6]);
    }
    else if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+/.test(text)) {
        //2016-09-18T03:46:11.893Z
        var t = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d+)/.exec(text);
        d = new Date(t[1], parseInt(t[2]) - 1, t[3], t[4], t[5], t[6], t[7].substr(0, 4));
    }
    else if (/\/Date\(-?\d+\)\//.test(text)) {
        //Microsoft json Date \/Date(1450800000000)\/ \/Date(-62135596800000)\/
        d = new Date(parseInt(text.substring(6)));
    }
    return d;
};

const filters = {
    textToDate,
    /*
    *时间
    */
    time(val) {
        var date = textToDate(val);
        if (isNaN(date.getTime())) {
            return "不可用日期";
        }
        return date.format("yyyy-MM-dd HH:mm:ss");
    },
    /*
   *日期
   */
    date(val) {
        var date = textToDate(val);
        if (isNaN(date.getTime())) {
            return "不可用日期";
        }
        return date.format("yyyy-MM-dd");
    },
    /*
    * 钱
    */
    money(val) {
        if (typeof val === "number") {
            return val.toFixed(2);
        }
        return "0.00";
    },
    /*
    * 需要除以100
    */
    intMoney(val) {
        if (typeof val === "number") {
            return (val / 100).toFixed(2);
        }
        return "0.00";
    },
    image(src) {
        var idx = src.indexOf('http');
        if (idx === 0) {
            return src;
        }
        else {
            return webconfig.resourceServerAddress + src;
        }
    },
    boolean(val) {
        return val ? "是" : "否";
    },
    gender(val){
        return val ? "男" : "女";
    }
};

for (let id in filters) {
    Vue.filter(id, filters[id]);
}