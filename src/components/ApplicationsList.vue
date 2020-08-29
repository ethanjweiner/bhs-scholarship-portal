<template>
  <div class="applications-list">
    <div class="list mx-auto">
      <form class="form-inline search mb-3 mr-3">
        <label for="search" class="mr-2">
          <span class="material-icons">search</span>
        </label>
        <input
          v-model="searchField"
          class="form-control mr-2"
          type="search"
          id="search"
          placeholder="Search by student name"
          aria-label="Search"
        />
      </form>
      <div class="table-responsive" v-if="filteredApplications.length">
        <table class="table table-hover table-bordered">
          <thead class="font-weight-bold text-center">
            <tr>
              <th scope="col">Student</th>
              <th scope="col">Email</th>
              <th scope="col">Cell Phone</th>
              <th scope="col">Date Submitted</th>
            </tr>
          </thead>
          <ApplicationRow
            v-for="(application, index) in filteredApplications"
            :key="index"
            :application="application"
          />
        </table>
      </div>
      <div class="text-center" v-else>There are no applications to view here!</div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import { mapGetters } from "vuex";
import ApplicationRow from "@/components/ApplicationRow";

export default {
  name: "Applications",
  data() {
    return {
      searchField: ""
    };
  },
  props: ["applications"],
  components: { ApplicationRow },
  computed: {
    ...mapGetters(["userData"]),
    filteredApplications() {
      if (this.searchField.length) {
        return this.applications.filter(
          application =>
            application.profile.name
              .trim()
              .toLowerCase()
              .match(this.searchField.trim().toLowerCase()) ||
            this.searchField
              .trim()
              .toLowerCase()
              .match(application.profile.name.trim().toLowerCase())
        );
      }
      return this.applications;
    }
  },
  filters: {
    toDate(string) {
      return new Date(string);
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";

.applications-list {
  .list {
    max-width: 1400px;
    table {
      border: 2px solid $primary !important;
    }
    @media (max-width: 1400px) {
      table {
        border: none !important;
      }
      .search {
        margin-left: 10px !important;
      }
    }
  }
  table {
    thead {
      background: lighten($primary, 45);
    }
  }
  tbody tr {
    cursor: pointer;
    .disabled {
      cursor: not-allowed !important;
    }
  }
  .search {
    input {
      min-width: 350px;
    }
  }
}
</style>