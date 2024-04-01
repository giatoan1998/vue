import './assets/style.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';

import EN from './locale/en.json'
import JA from './locale/ja.json'
import VN from './locale/vn.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    locale: document.cookie.split('=')[1],
    messages: {
        JA: JA,
        EN: EN,
        VN: VN,
    }
});
const app = createApp(App);
app.use(i18n);
app.use(router).mount('#app');
app.use(Toast);
