import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
import Documents from './modules/documents';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { User, Documents }
});
