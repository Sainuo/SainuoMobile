﻿//https://www.npmjs.com/package/js-string-format
/**
 * format
 *
 * formats the string to
 * arguments and returns
 * @returns {string}
 */
function format() {
    if (arguments.length === 0) return this;

    // setup args
    var iter;
    if (arguments.length > 1) { // string arguments
        iter = arguments;
    }
    else if (arguments[0] instanceof Object) {//object or array
        iter = arguments[0];
    }
    else {//one argument string number float bool
        iter = [arguments[0]];
    }

    // perform replace
    var ret = this;
    for (var i in iter) {
        ret = ret.replace("{" + i + "}", iter[i]);
    }

    // done
    return ret;
}

// export
String.prototype.format = format;
