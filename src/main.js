import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import toasts from './toasts';
import './assets/styles/styles.scss'
import {
    createBootstrap, BButton, BModal, BTable, BTableLite, BTableSimple,
    BThead, BTfoot, BTbody, BTr, BTh, BTd, BForm, BFormGroup, BFormInput,
    BFormSelect, BFormTextarea 
} from 'bootstrap-vue-next'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'


import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App);
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(toasts);
app.use(createBootstrap({components: true, directives: true}));

app.component('BButton', BButton);
app.component('BModal', BModal);
app.component('BTable', BTable);
app.component('BTableLite', BTableLite);
app.component('BTableSimple', BTableSimple);
app.component('BThead', BThead);
app.component('BTfoot', BTfoot);
app.component('BTbody', BTbody);
app.component('BTr', BTr);
app.component('BTh', BTh);
app.component('BTd', BTd);
app.component('BForm', BForm);
app.component('BFormGroup', BFormGroup);
app.component('BFormInput', BFormInput);
app.component('BFormSelect', BFormSelect);
app.component('BFormTextarea', BFormTextarea);
app.mount('#app')

//createApp(App).use(store).use(router).mount('#app')
