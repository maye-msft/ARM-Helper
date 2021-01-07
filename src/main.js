import Vue from 'vue';
import App from './App.vue'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

import vueCodeditor from "vue-codeditor";

Vue.component(vueCodeditor)
Vue.config.productionTip = false

Vue.use(ViewUI);



new Vue({
    el: '#app',
    render: h => h(App)
});