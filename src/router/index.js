import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/authentication/Login';
import Main from '@/views/Main';

// Student Views
import StudentSignup from '@/views/authentication/StudentSignup';
import StudentProfile from '@/views/student/StudentProfile';
import ScholarshipsList from '@/views/student/ScholarshipsList';
import Application from '@/views/student/Application';

// Donor Views
import DonorSignup from '@/views/authentication/DonorSignup';
import DonorScholarship from '@/views/donor/Scholarship';
import Applications from '@/views/donor/Applications';
import StudentApplication from '@/views/donor/StudentApplication';

// GC Views
import GCSignup from '@/views/authentication/GCSignup';
import Students from '@/views/gc/Students';

import { auth, db } from '@/firebase/init';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Main',
		component: Main,
		beforeEnter: (to, from, next) => {
			if (auth.currentUser) {
				next();
			} else {
				next({ name: 'Login' });
			}
		}
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	},
	{
		path: '/student/signup',
		name: 'Student-Signup',
		component: StudentSignup
	},
	{
		path: '/student/profile',
		name: 'Student-Profile',
		component: StudentProfile,
		meta: {
			isStudent: true
		}
	},
	{
		path: '/student/scholarships-list',
		name: 'Scholarships-List',
		component: ScholarshipsList,
		meta: {
			isStudent: true
		}
	},
	{
		path: '/donor/signup',
		name: 'Donor-Signup',
		component: DonorSignup
	},
	{
		path: '/donor/scholarship',
		name: 'Donor-Scholarship',
		component: DonorScholarship,
		meta: {
			isDonor: true
		}
	},
	{
		path: '/student/application/:name',
		name: 'Application',
		component: Application,
		props: true,
		meta: {
			isStudent: true
		}
	},
	{
		path: '/donor/applications',
		name: 'Applications',
		component: Applications,
		meta: {
			isDonor: true
		}
	},
	{
		path: '/donor/application/:name',
		name: 'StudentApplication',
		component: StudentApplication,
		props: true,
		meta: {
			isDonor: true
		}
	},
	{
		path: '/gc/signup',
		name: 'GC-Signup',
		component: GCSignup
	},
	{
		path: '/gc/students',
		name: 'Students',
		component: Students,
		meta: {
			isGC: true
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

const route = async (type, next) => {
	if (auth.currentUser) {
		const docs = (await db.collection('users').where(type, '==', true).get()).docs;
		if (docs.find((doc) => doc.id === auth.currentUser.uid)) next();
		else next({ name: 'Main' });
	} else {
		next({ name: 'Login' });
	}
};

router.beforeEach((to, from, next) => {
	if (to.matched.some((rec) => rec.meta.isStudent)) {
		route('isStudent', next);
	} else if (to.matched.some((rec) => rec.meta.isDonor)) {
		route('isDonor', next);
	} else if (to.matched.some((rec) => rec.meta.isGC)) {
		route('isGC', next);
	} else {
		next();
	}
});

export default router;
