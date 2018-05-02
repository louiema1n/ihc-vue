/**
 * timestamp转换成datetime
 * @param time
 * @param mode en:2017-01-01;cn:2017年1月1日
 * @returns {*}
 */
export function timestamp2String(time, mode){
  if (time == null) {
    return "";
  }
  var datetime = new Date();
  datetime.setTime(time);
  var year = datetime.getFullYear();
  var month = datetime.getMonth() + 1;
  var date = datetime.getDate();
  var hour = datetime.getHours();
  var minute = datetime.getMinutes();
  var second = datetime.getSeconds();
  var mseconds = datetime.getMilliseconds();
  // return year + "-" + addZero(month) + "-" + addZero(date)+" "+ addZero(hour)+":"+addZero(minute)+":"+addZero(second);
  if (mode == 'cn') {
    return year + "年" + month + "月" + date + "日";
  }
  return year + "-" + addZero(month) + "-" + addZero(date)+" "+ addZero(hour)+":"+addZero(minute)+":"+addZero(second);
}

//创建补0函数
function addZero(s) {
  return s < 10 ? '0' + s : s;
}
