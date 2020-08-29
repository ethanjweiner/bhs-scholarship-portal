<template>
  <div class="scholarships-list">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        Scholarships
        <span class="material-icons">analytics</span>
      </h1>
    </div>
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
          placeholder="Search by scholarship name or donor"
          aria-label="Search"
        />
      </form>
      <div class="table-responsive" v-if="filteredScholarships.length">
        <table class="table table-hover table-bordered">
          <thead class="font-weight-bold text-center">
            <tr>
              <th scope="col">Scholarship</th>
              <th scope="col">Donor</th>
              <th scope="col">Amount(s)</th>
              <th scope="col">Deadline</th>
              <th scope="col">Your Status</th>
            </tr>
          </thead>
          <ScholarshipRow
            v-for="(scholarship, index) in filteredScholarships"
            :key="index"
            :scholarship="scholarship"
          />
        </table>
      </div>
      <div class="text-center" v-else>There are no scholarships to view here!</div>
    </div>
    <LoadingScreen :display="displayLoadingScreen" />
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import { mapGetters } from "vuex";
import ScholarshipRow from "@/components/ScholarshipRow";
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: "Scholarships-List",
  data() {
    return {
      searchField: "",
      scholarships: [],
      displayLoadingScreen: false
    };
  },
  components: { ScholarshipRow, LoadingScreen },
  computed: {
    ...mapGetters(["userData"]),
    filteredScholarships() {
      // Current date is less than four months after the deadline (or just before deadline)
      const filter1 = this.scholarships.filter(
        scholarship =>
          new Date().getTime() <
          new Date(scholarship.deadline).getTime() + 10368000000
      );
      // Sorted by deadline
      const filter2 = filter1.sort((a, b) => {
        if (new Date(b.deadline).getTime() < new Date().getTime()) {
          return -1;
        } else {
          return (
            new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
          );
        }
      });
      // Search field filter
      if (this.searchField.length) {
        return filter2.filter(
          scholarship =>
            scholarship.name
              .trim()
              .toLowerCase()
              .match(this.searchField.trim().toLowerCase()) ||
            scholarship.donor
              .trim()
              .toLowerCase()
              .match(this.searchField.trim().toLowerCase()) ||
            this.searchField
              .trim()
              .toLowerCase()
              .match(scholarship.name.trim().toLowerCase()) ||
            this.searchField
              .trim()
              .toLowerCase()
              .match(scholarship.donor.trim().toLowerCase())
        );
      }
      return filter2;
    }
  },
  async created() {
    this.displayLoadingScreen = true;
    const snapshot = await db.collection("scholarships").get();
    this.displayLoadingScreen = false;

    snapshot.docs.forEach(doc => {
      this.scholarships.push(doc.data());
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.scholarships-list {
  .list {
    max-width: 1400px;
    margin-top: 20px;
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