/**
 * 打印ihcs表格
 * @param tableData
 * @param printer
 */
import {timestamp2String} from "./DateFormat";

export function printIhcsTable(tableData, printer) {
  let top =  '<html>\n' +
    '<head>\n' +
    '  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n' +
    '  <title>打印加做单</title>\n' +
    '  <style>\n' +
    '    table, table tr th, table tr td {\n' +
    '      border: 1px solid #000000;\n' +
    '    }\n' +
    '    table {\n' +
    '      width: 1080px;\n' +
    '      min-height: 25px;\n' +
    '      line-height: 25px;\n' +
    '      border-collapse: collapse;\n' +
    '      margin: 3px;\n' +
    '    }\n ' +
    'div {\n' +
    '\tpage-break-after:always;\n' +
    ' }' +
    '  </style>\n' +
    '</head>\n' +
    '<body>\n'

  let tableTop = '<div>\n' +
    '  <h4 style="text-align: center">免疫组化实验记录表<br>(IHC experiment record)</h4>\n' +
    '          <span style="font-size: 14px">表号：GZKM-SOP0307.200.05</span>\n' +
    '  <table>\n' +
    '    <!-- 第一行 -->\n' +
    '    <tr>\n' +
    '      <td colspan="7" rowspan="3" width="70%">\n' +
    '        <p>\n' +
    '          <span>异常登记：</span></p>\n' +
    '        <p>\n' +
    '          <span>特染：</span></p></td>\n' +
    '      <td colspan="3">\n' +
    '        <p>\n' +
    '          <span id="batch">批次:<br></span>\n' +
    '        </p>\n' +
    '      </td>\n' +
    '    </tr>\n' +
    '    <!-- 第二行 -->\n' +
    '    <tr>\n' +
    '      <td colspan="3">\n' +
    '        <p><span id="total">总计：</span></p>\n' +
    '      </td>\n' +
    '    </tr>\n' +
    '    <!-- 第三行 -->\n' +
    '    <tr>\n' +
    '      <td colspan="3">\n' +
    '        <p><span id="time">日期：</span></p>\n' +
    '      </td>\n' +
    '    </tr>\n' +
    '    <!-- 第四行 -->\n' +
    '    <tr style="text-align: center; font-size: 12px; font-weight: bold">\n' +
    '      <td ><p><span>病理医生</span></p></td>\n' +
    '      <td width="10%"><p><span>病理号</span></p></td>\n' +
    '      <td width="8%"><p><span>蜡块号</span></p></td>\n' +
    '      <td width="7%"><p><span >病人姓名</span></p></td>\n' +
    '      <td width="6%"><p><span>项数</span></p></td>\n' +
    '      <td colspan="4">\n' +
    '        <p><span>项目明细</span>\n' +
    '        </p></td>\n' +
    '      <td  width="10%"><p><span>备注</span></p></td>\n' +
    '    </tr>'
  let tableBottom = '<!-- 第五行 -->\n' +
    '    <tr>\n' +
    '      <td colspan="10">\n' +
    '        <p>\n' +
    '          <span style="font-size: 9px">抗原修复: □低PH 3\' □ 高PH 3\'□一抗:2-8℃18-24h\'   □封闭37℃30\'   □二抗37℃30\'   □DAB 3\'   □上机Roche   □上机DAKO  □上机：基因   □其他：<br><strong>注：以上实验记录严格按照sop执行，部分抗体选择全自动染色机进行染色，用圈划出以示区分。</strong></span>\n' +
    '        </p>\n' +
    '      </td>\n' +
    '    </tr>' + '</table>\n'

  let trs = ''
  let total = 0, batch = "", time = ""
  top += tableTop
  let length = tableData.length
  tableData.forEach((data, index) => {
    let tds = ''
    let date = data.timeP
    date = date.substr(0, 10)
    // 处理time及batch
    if (index == 0) {
      time = date
      batch = data.batch
    }
    if (index != 0) {
      if (time != date)
        time += ' ' +date;
      if (batch != data.batch)
        batch += ' ' + data.batch;
    }
    // tds += '<td width="8%">' + date + '</td>'
    tds += '<td width="12%">' + data.doctor + '</td>';
    // tds += '<td>' + data.batch + '</td>'
    tds += '<td>' + data.number + '</td>'
    tds += '<td>' + data.son + '</td>'
    tds += '<td>' + data.name + '</td>'
    tds += '<td>' + data.total + '</td>'
    tds += '<td colspan="4" style="text-align: left; font-size: 16px;">' + data.item + '</td>'
    tds += '<td style="font-size: 12px">' + data.remark + '</td>'

    if (index % 2 == 0) {
      trs = '<tr style="text-align: center; font-size: 14px;background-color: #eeeeee">' + tds + '</tr>';
    } else {
      trs = '<tr style="text-align: center; font-size: 14px">' + tds + '</tr>';
    }
    top += trs;
    total += data.total

    // // 满13条数据分页
    // if (length < 13 && index == length - 1) {
    //   top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
    //     '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
    //     '  <span style="float: right; margin-right: 3px">技术员：'+printer+'</span>\n' +
    //     '</div>\n' +
    //     '</body>\n' +
    //     '</html>'
    //   total = 0
    // }
    // if (length >= 13 && index != 0) {
    //   if (index % 13 == 0) {
    //     top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
    //       '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
    //       '  <span style="float: right; margin-right: 3px">技术员：'+printer+'</span>\n' +
    //       '</div>\n' +
    //       '</body>\n' +
    //       '</html>'
    //     total = 0
    //     if (index != length - 1) {
    //       top += tableTop
    //     }
    //   } else {
    //     if (index == length - 1) {
    // top放在这里的

    //       total = 0
    //     }
    //   }
    // }
  })
  // top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
  top += tableBottom +
    '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
    '  <span style="float: right; margin-right: 3px">核对病理技师：'+printer+'</span>\n' +
    '</div>\n' +
    '</body>' +
    '<script type="text/javascript">' +
    'window.document.getElementById("total").innerText = "总计：'+total+'项"\n'+
    'window.document.getElementById("time").innerText = "日期：'+time+'"\n'+
    'window.document.getElementById("batch").innerText = "批次：'+batch+'"\n'+
    '</script>' +
    '</html>'

  return top;
}
