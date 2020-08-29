<template>
  <div class="main-nav navbar fixed-top navbar-expand-lg">
    <router-link to="/">
      <a class="navbar-brand logo">
        <img width="60" height="35" src="@/assets/images/bhs_scholarship_portal_logo.png" alt />
        BHS Scholarship Portal
      </a>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon">
        <span class="material-icons">menu</span>
      </span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-3">
        <li class="nav-item" v-if="userData">
          <router-link :to="{name: 'Scholarships-List'}">
            <a class="nav-link navbar-brand" v-if="userData.isStudent">
              Scholarships
              <span class="material-icons" style="font-size: 20px !important;">analytics</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item" v-if="userData">
          <router-link :to="{name: 'Student-Profile'}">
            <a class="nav-link navbar-brand" v-if="userData.isStudent">
              Your Profile
              <span class="material-icons" style="font-size: 20px !important;">school</span>
            </a>
          </router-link>
        </li>

        <li class="nav-item" v-if="userData">
          <router-link :to="{name: 'Donor-Scholarship'}">
            <a class="nav-link navbar-brand" v-if="userData.isDonor">
              Your Scholarship
              <span
                class="material-icons"
                style="font-size: 20px !important;"
              >analytics</span>
            </a>
          </router-link>
          <router-link :to="{name: 'Applications'}">
            <a class="nav-link navbar-brand" v-if="userData.isDonor">
              Applications
              <span class="material-icons" style="font-size: 20px !important;">article</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item" v-if="userData">
          <router-link :to="{name: 'Students'}">
            <a class="nav-link navbar-brand" v-if="userData.isGC">
              Browse Students
              <span class="material-icons" style="font-size: 20px !important;">people</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item" v-if="!Object.keys(userData).length">
          <router-link :to="{name: 'Login'}">
            <a class="nav-link navbar-brand">
              Login
              <span class="material-icons" style="font-size: 20px !important;">account_circle</span>
            </a>
          </router-link>
        </li>
        <li class="nav-item" v-if="Object.keys(userData).length">
          <a class="nav-link navbar-brand" @click="logout()">
            Logout
            <span class="material-icons" style="font-size: 20px !important;">login</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Main-Nav",
  methods: {
    ...mapActions(["logout"])
  },
  computed: mapGetters(["userData"])
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.main-nav {
  @include main-font();
  background: $primary;
  border-bottom: 3px solid black;
  a {
    cursor: pointer;
    color: #f3f3f3;

    &:hover {
      color: white;
      text-shadow: 2px 2px 5px black;
    }
  }
  .logo {
    @include big-font();
    color: white;
    text-shadow: 2px 2px 5px black;
  }
  .navbar-toggler {
    color: white;
  }
}
</style>