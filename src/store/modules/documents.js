import { db } from '@/firebase/init';

const state = {
	documents: []
};

const getters = {
	documents: (state) => state.documents
};

const actions = {
	async fetchUserDocuments({ commit }, uid) {
		const docs = (await db.collection('users').doc(uid).collection('documents').get()).docs;
		let documents = [];
		docs.forEach((doc) => {
			documents.push(doc.data());
		});
		commit('setUserDocuments', documents);
	},
	async addDocument({ dispatch }, { document, uid }) {
		await db.collection('users').doc(uid).collection('documents').add(document);
		dispatch('fetchUserDocuments', uid);
	},
	async updateDocuments({ dispatch }, { documents, uid }) {
		const docs = (await db.collection('users').doc(uid).collection('documents').get()).docs;
		docs.forEach((doc) => {
			db.collection('users').doc(uid).collection('documents').doc(doc.id).delete();
		});
		documents.forEach((document) => {
			dispatch('addDocument', { document, uid });
		});
	}
};

const mutations = {
	setUserDocuments(state, documents) {
		state.documents = documents;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
