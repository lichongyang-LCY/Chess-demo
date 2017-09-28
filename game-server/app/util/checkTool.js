/**
 * Created by huanmie on 2017/5/27.
 * 检查接收的参数
 */

let paramType = {
    Number : "number",
    String : "string",
    Boolean : "boolean"
};

function paramIsError(param, type) {
    if (param === undefined || param === null || typeof param !== type) {
        return true;
    }
    return false;
}

function stringError(param , boolean) {
    if (boolean) {
        return (paramIsError(param, paramType.String) || param === "");
    } else {
        return paramIsError(param, paramType.String);
    }
}

function numberError(param) {
    return paramIsError(param, paramType.Number);
}

function booleanError(param) {
    return paramIsError(param, paramType.Number);
}

exports.stringError = stringError;
exports.numberError = numberError;
exports.booleanError = booleanError;
