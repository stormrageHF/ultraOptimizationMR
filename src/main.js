/*

*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css' // 默认主题
import '../theme/index.css' // 自定义主题
import axios from 'axios'
import VueAxios from 'vue-axios'
import './commen/css/global.css'
// import { Base64 } from 'js-base64'
import AlertError from './global/global'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueAxios, axios);

Vue.use(AlertError)

let isRelease = true
if (isRelease) {
  axios.defaults.baseURL = 'https://api.idoctor.cc/BayerApi';
} else {
  axios.defaults.baseURL = 'http://101.200.177.46:8076';
}
if (localStorage.getItem('UltraTokenMR')) {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('UltraTokenMR');
}
axios.defaults.timeout = 1000*60*20; // 20分钟
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log(error)
    if (error.response.data.StatusCode == 40111) {
      localStorage.removeItem("UltraTokenMR");
      localStorage.removeItem("ZBJLoginInfo");
      localStorage.removeItem("ZBJLoginName");
      localStorage.removeItem("ZBJLoginDate");
      // localStorage.setItem("ZBJAccountGrade", -1)
      this.$store.dispatch("recordAccountGrade", -1);
      
      router.replace("/login");
    } else {
      return Promise.reject(error)
    }
  }
)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
