// import Vue from 'vue'
import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import commonUI from './common'
// Vue.use(ElementUI);

// element首屏按需加载
import {
  Input,
  Button,
  Form,
  FormItem,
  Loading,
  Dialog
} from 'element-ui';
Vue.use(Input);
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Dialog);
Vue.use(Loading.directive);
Vue.use(commonUI);

Vue.prototype.$center = new Vue;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
