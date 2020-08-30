<template>
  <div class="main list-group m-auto">
    <div class="student-view" v-if="userData.isStudent">
      <router-link :to="{name: 'Scholarships-List'}">
        <a class="list-group-item list-group-item-action">
          <span class="material-icons">analytics</span>
          Scholarships
        </a>
      </router-link>
      <router-link :to="{name: 'Student-Profile'}">
        <a class="list-group-item list-group-item-action">
          <span class="material-icons">school</span>
          Your Profile
        </a>
      </router-link>
    </div>
    <div class="donor-view" v-else-if="userData.isDonor">
      <router-link :to="{name: 'Donor-Scholarship'}">
        <a class="list-group-item list-group-item-action">
          <span class="material-icons">analytics</span>
          Your Scholarship
        </a>
      </router-link>
      <router-link :to="{name: 'Applications'}">
        <a class="list-group-item list-group-item-action">
          <span class="material-icons">article</span>
          View Applications for Your Scholarship
        </a>
      </router-link>
    </div>
    <div class="gc-view" v-else-if="userData.isGC">
      <router-link :to="{name: 'Students'}">
        <a class="list-group-item list-group-item-action">
          <span class="material-icons">people</span>
          Provide Students with Documents
        </a>
      </router-link>
    </div>
    <router-link :to="{name: 'Login'}">
      <a class="list-group-item list-group-item-action">
        <span class="material-icons">account_circle</span>
        Login as a Different User
      </a>
    </router-link>
    <a class="list-group-item list-group-item-action" @click="logout()">
      <span class="material-icons">login</span>
      Logout
    </a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Main",
  methods: mapActions(["logout"]),
  computed: mapGetters(["userData"])
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.main {
  border: 1px solid $primary;
  .list-group-item {
    &:hover {
      background: lighten($primary, 50);
    }
  }
  margin-top: 60px !important;
  @media (min-width: 992px) {
    width: 70%;
    margin-top: 20vh !important;
  }
  a {
    cursor: pointer;
    font-size: 30px;
    span {
      font-size: 30px;
    }
    @media (min-width: 992px) {
      font-size: 40px;
      span {
        font-size: 40px;
      }
    }
    text-decoration: none;
  }
}
</style>