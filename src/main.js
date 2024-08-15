import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import toasts from './toasts';
import './assets/styles/styles.scss'

const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.mount('#app')
app.use(toasts);

//createApp(App).use(store).use(router).mount('#app')
