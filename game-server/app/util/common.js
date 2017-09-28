/**
 * 生成错误响应返回结果
 * @param {number} err_code
 * @param {string} err_msg
 */
function generateErrorResp(err_code, err_msg){
    message = {
        err_code: err_code,
        err_msg: err_msg
    }
    return message;
}

module.exports.generateErrorResp = generateErrorResp;