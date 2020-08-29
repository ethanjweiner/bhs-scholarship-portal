import { auth, db } from '@/firebase/init';
import router from '@/router/index';

const state = {
	userData: {}
};
const getters = {
	userData: (state) => state.userData
};
const mutations = {
	setUserData(state, userData) {
		state.userData = userData;
	}
};
const actions = {
	async signIn({ dispatch }, form) {
		const { user } = await auth.signInWithEmailAndPassword(form.email, form.password);
		await db.collection('users').doc(user.uid).update({ lastActive: new Date() });
		dispatch('fetchUserData', user);
	},
	async fetchUserData({ commit }, user) {
		const userData = (await db.collection('users').doc(user.uid).get()).data();
		commit('setUserData', userData);
		const path = router.currentRoute.path;
		if (path === '/login' || path === '/student/signup' || path === '/donor/signup' || path === '/gc/signup') {
			if (userData.isStudent) {
				if (!userData.profile.gpa) {
					router.push({ name: 'Student-Profile' });
				} else {
					router.push({ name: 'Main' });
				}
			} else if (userData.isDonor || userData.isGC) {
				router.push({ name: 'Main' });
			}
		}
	},
	async createStudent({ dispatch }, params) {
		const { user } = await auth.createUserWithEmailAndPassword(params.form.email, params.form.password);
		await db.collection('users').doc(user.uid).set({
			email: params.form.email,
			lastActive: new Date(),
			profile: {
				...params.form.newProfile,
				email: params.form.email,
				gpa: null,
				decileRank: null,
				sat: null,
				act: null,
				plans: null,
				major: null,
				colleges: {
					appliedColleges: null,
					acceptedColleges: null,
					topCollegeChoices: null,
					attendingCollege: null
				},
				financial: {
					estimatedParentalContribution: null,
					estimatedStudentContribution: null,
					otherAid: null,
					financialNeed: null,
					FASFA: null,
					debt: null
				},
				family: {
					father: {
						name: null,
						address: null,
						occupation: null,
						employer: null
					},
					mother: {
						name: null,
						address: null,
						occupation: null,
						employer: null
					},
					dependents: null,
					collegeStudents: null
				},
				activities: [],
				work: [],
				financialEssay: null
			},
			isStudent: true
		});
		dispatch('fetchUserData', user);
	},
	async createDonor({ dispatch }, params) {
		const { user } = await auth.createUserWithEmailAndPassword(params.form.email, params.form.password);
		await db.collection('users').doc(user.uid).set({
			name: params.form.name,
			email: params.form.email,
			isDonor: true,
			scholarship: {
				name: null,
				criteria: null,
				description: null,
				deadline: null,
				amount: null,
				customQuestions: [],
				documents: [],
				email: params.form.email,
				submitted: false
			}
		});
		dispatch('fetchUserData', user);
	},
	async createGC({ dispatch }, params) {
		const { user } = await auth.createUserWithEmailAndPassword(params.form.email, params.form.password);
		await db.collection('users').doc(user.uid).set({
			email: params.form.email,
			isGC: true
		});
		dispatch('fetchUserData', user);
	},
	async updateProfile({ dispatch }, { profile }) {
		await db.collection('users').doc(auth.currentUser.uid).update({ profile });
		dispatch('fetchUserData', auth.currentUser);
	},
	async updateScholarship({ dispatch }, { scholarship }) {
		await db.collection('users').doc(auth.currentUser.uid).update({ scholarship });
		dispatch('fetchUserData', auth.currentUser);
	},
	async updateApplication({ dispatch }, { application, name }) {
		await db.collection('users').doc(auth.currentUser.uid).collection('applications').doc(name).update(application);
		dispatch('fetchUserData', auth.currentUser);
	},
	async logout({ commit }) {
		await auth.signOut();
		commit('setUserData', {});
		router.push('/login');
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
