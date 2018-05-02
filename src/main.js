// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {
  Select,
  Header,
  Aside,
  Main,
  Footer,
  Container,
  Menu,
  Submenu,
  MenuItem,
  Row,
  Col,
  Table,
  TableColumn,
  Button,
  ButtonGroup,
  DatePicker,
  TimeSelect,
  TimePicker,
  MessageBox,
  Message,
  Form,
  FormItem,
  Dialog,
  Input,
  Option,
  OptionGroup,
  Switch,
} from 'element-ui'
import App from './App'
import router from './router/route'
import axios from 'axios'

// Vue.component(Button.name, Button);
// 也可以写成 Vue.use(Button)
Vue.use(Select)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Switch)
// Vue.use(Message)

Vue.config.productionTip = false
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$alert = MessageBox.alert;

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost/'
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.response.use(function (response) {
// 对响应数据做点什么

  return response;
}, function (err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)' ; break;
      case 401: err.message = '未授权，请重新登录(401)'; break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  }else{
    err.message = '连接服务器失败!'
  }
  err.message += " 请稍后重试。"
  return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
