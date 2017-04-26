// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import BaiduMap from 'vue-baidu-map'

//引入 Element
// import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import en from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI, { en })
Vue.use(Vuex)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '890j9EMiyLSjndXuosTIX90NYZOGHIGG'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  //el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')
