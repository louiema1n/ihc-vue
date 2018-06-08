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
    '  <table>\n' +
    '    <!-- 第一行 -->\n' +
    '    <tr>\n' +
    '      <td colspan="7" rowspan="2" width="70%">\n' +
    '        <p>\n' +
    '          <span>异常标本处理登记：</span></p>\n' +
    '        <p>\n' +
    '          <span>备注：</span></p></td>\n' +
    '      <td colspan="3">\n' +
    '        <p>\n' +
    '          <span>日工作量统计<br></span>\n' +
    '          <span style="font-size: 14px">表号：GZKM-SOP0307.200.05</span>\n' +
    '        </p>\n' +
    '      </td>\n' +
    '    </tr>\n' +
    '    <!-- 第二行 -->\n' +
    '    <tr>\n' +
    '      <td>\n' +
    '        <p><span>IHC：</span></p>\n' +
    '      </td>\n' +
    '      <td>\n' +
    '        <p><span>ISH：</span></p>\n' +
    '      </td>\n' +
    '      <td>\n' +
    '        <p><span>特染：</span></p>\n' +
    '      </td>\n' +
    '    </tr>\n' +
    '    <!-- 第三行 -->\n' +
    '    <tr style="text-align: center; font-size: 12px; font-weight: bold">\n' +
    '      <td colspan="2" width="16%"><p><span>日期/操作医生</span></p></td>\n' +
    '      <td width="10%"><p><span>病理号</span></p></td>\n' +
    '      <td width="8%"><p><span>蜡块号/数量</span></p></td>\n' +
    '      <td width="7%"><p><span >姓名</span></p></td>\n' +
    '      <td width="6%"><p><span>总数</span></p></td>\n' +
    '      <td colspan="5">\n' +
    '        <p><span>项目明细/实验条件</span>\n' +
    '        </p></td>\n' +
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
  let total = 0
  top += tableTop
  let length = tableData.length
  tableData.forEach((data, index) => {
    let tds = ''
    let date = data.timeP
    date = date.substr(0, 10)
    tds += '<td>' + date + '</td>'
    tds += '<td>' + data.nick + '</td>'
    tds += '<td>' + data.number + '</td>'
    tds += '<td>' + data.son + '</td>'
    tds += '<td>' + data.name + '</td>'
    tds += '<td>' + data.total + '</td>'
    tds += '<td colspan="5" style="text-align: left">' + data.item + '</td>'

    trs = '<tr style="text-align: center; font-size: 14px">' + tds + '</tr>'
    top += trs
    total += data.total

    // 满13条数据分页
    if (length < 13 && index == length - 1) {
      top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
        '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
        '  <span style="float: right; margin-right: 3px">打印人：'+printer+'</span>\n' +
        '</div>\n' +
        '</body>\n' +
        '</html>'
      total = 0
    }
    if (length >= 13 && index != 0) {
      if (index % 13 == 0) {
        top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
          '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
          '  <span style="float: right; margin-right: 3px">打印人：'+printer+'</span>\n' +
          '</div>\n' +
          '</body>\n' +
          '</html>'
        total = 0
        if (index != length - 1) {
          top += tableTop
        }
      } else {
        if (index == length - 1) {
          top += tableBottom + '<span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
            '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
            '  <span style="float: right; margin-right: 3px">打印人：'+printer+'</span>\n' +
            '</div>\n' +
            '</body>\n' +
            '</html>'
          total = 0
        }
      }
    }
  })
  return top;
}
