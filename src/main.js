import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AsyncComputed from 'vue-async-computed';
import { auth } from './firebase/init';
import './assets/scss/app.scss';
import TextareaAutosize from 'vue-textarea-autosize';
Vue.use(TextareaAutosize);
Vue.use(AsyncComputed);

Vue.config.productionTip = false;

let app = null;
auth.onAuthStateChanged((user) => {
	if (!app) {
		app = new Vue({
			router,
			store,
			render: (h) => h(App)
		});
		if (user) {
			store.dispatch('fetchUserData', user).then(() => {
				app.$mount('#app');
			});
		} else {
			app.$mount('#app');
		}
	}
});
