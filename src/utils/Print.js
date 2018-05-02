/**
 * 打印ihcs表格
 * @param tableData
 * @param printer
 */
import {timestamp2String} from "./DateFormat";

export function printIhcsTable(tableData, printer) {
  let html = '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <title>Title</title>\n' +
    '  <style media="print">\n' +
    '    @page {\n' +
    '      margin: 5mm;\n' +
    '      size: A4 landscape;\n' +
    '      page-break-inside: avoid;\n' +
    '      page-break-before: always\n' +
    '    }\n' +
    '\n' +
    '    table, table tr th, table tr td {\n' +
    '      border: 1px solid #000000;\n' +
    '    }\n' +
    '\n' +
    '      th {\n' +
    '        background-color: #e1e1e1;\n' +
    '      }\n' +
    '\n' +
    '    th, td, span {\n' +
    '      font-size: 12px;\n' +
    '    }\n' +
    '\n' +
    '    .item {\n' +
    '      text-align: left\n' +
    '    }\n' +
    '\n' +
    '    table {\n' +
    '      width: 1080px;\n' +
    '      min-height: 25px;\n' +
    '      line-height: 25px;\n' +
    '      text-align: center;\n' +
    '      border-collapse: collapse;\n' +
    '      margin: 3px;\n' +
    '    }\n' +
    '  </style>\n' +
    '</head>\n' +
    '<body>\n' +
    '<div style="width:1086px;height:730px;">\n' +
    '  <h4 style="text-align: center">加做项目清单</h4>\n' +
    '  <table>\n' +
    '    <tr>\n' +
    '      <th width="3%">#</th>\n' +
    '      <th width="10%">病理号</th>\n' +
    '      <th width="5%">项目</th>\n' +
    '      <th>具体细项</th>\n' +
    '      <th width="15%">加做时间</th>\n' +
    '      <th width="10%">加做人</th>\n' +
    '    </tr>'
  let trs = ''
  let total = 0
  tableData.forEach((data, index) => {
    let tds = ''
    tds += '<td>' + (index+1) + '</td>'
    tds += '<td>' + data.number + '-' + data.son + '</td>'
    tds += '<td>' + data.total + '项</td>'
    tds += '<td class="item">' + data.item + '</td>'
    tds += '<td>' + data.timeP + '</td>'
    tds += '<td>' + data.nick + '</td>'

    trs = '<tr>' + tds + '</tr>'
    html += trs
    total += data.total
  })
  html += '  </table>\n' +
    '  <span style=" margin-left: 3px">总计：'+total+' 项</span><br/>\n' +
    '  <span style=" margin-left: 3px">打印时间：'+timestamp2String(new Date().getTime())+'</span>\n' +
    '  <span style="float: right; margin-right: 3px">打印人：'+printer+'</span>\n' +
    '</div>\n' +
    '</body>\n' +
    '</html>'
  return html;
}
