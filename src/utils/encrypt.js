import md5 from 'js-md5'
let Base64 = require('js-base64').Base64

/**
 * 加密密码
 * @param pwd
 */
export function encodePwd(usrName, pwd) {
  // md5加密
  let enPwd = md5(usrName + pwd);
  // var enPwd = "123";
  // 截取1-6
  let substr = enPwd.substring(1, 6)
  // 再次MD5
  enPwd = md5(enPwd + substr)
  // base64加密
  return Base64.encode(enPwd)
}
