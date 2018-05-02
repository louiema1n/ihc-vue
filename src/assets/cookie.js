/**
 * 设置cookie
 * @param cookieName cookie名称
 * @param username 用户名
 * @param expire cookie存活时间
 */
export function setCookie(cookieName, username, expires) {
  // 生成cookie
  // let date = new Date()

  // 设置过期时间
  // date.setTime(date.getTime() + expires)
  document.cookie = cookieName + "=" + encodeURI(username) + ";expires="
  // document.cookie = cookieName + "=" + encodeURI(username) + ";expires=" + date.toUTCString()
}

/**
 * 获取cookie
 * @param cookieName
 */
export function getCookie(cookieName) {
  let cookie = document.cookie
  if (cookie.length > 0) {
    let arr, exp = new RegExp("(^| )"+cookieName+"=([^;]*)(;|$)");
    if (arr = cookie.match(exp)) {
      return decodeURI(arr[2])
    }
  }
  return "";
}

/**
 * 删除cookie
 * @param cookieName
 */
export function delCookie(cookieName) {
  setCookie(cookieName, "", -1)
}

