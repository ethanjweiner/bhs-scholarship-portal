<template>
  <div class="applications">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        Applications
        <span class="material-icons">article</span>
      </h1>
    </div>
    <div class="years mx-auto" v-if="hasApplications">
      <div class="accordion" id="applications">
        <div v-for="(element, index) in years" :key="index">
          <div v-if="element.applications.length" class="card">
            <div class="card-header" :id="element.year">
              <h2 class="mb-0">
                <button
                  class="btn btn-link btn-block text-left year-text"
                  type="button"
                  data-toggle="collapse"
                  :data-target="`#collapse-${element.year}`"
                  :aria-expanded="index===0 ? true : false"
                  :aria-controls="`collapse-${element.year}`"
                >
                  {{ element.year }}
                  <span
                    class="font-italic ml-1"
                    style="font-size: 12px;"
                  >Click to expand/close</span>
                </button>
              </h2>
            </div>
            <div
              :id="`collapse-${element.year}`"
              class="collapse"
              :class="{show: index===0}"
              :aria-labelledby="element.year"
              data-parent="#applications"
            >
              <div class="card-body">
                <ApplicationsList :applications="element.applications" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 text-center" v-else>Your scholarship does not have any applications yet!</div>
    <LoadingScreen :display="displayLoadingScreen" />
  </div>
</template>

<script>
import ApplicationsList from "@/components/ApplicationsList";
import LoadingScreen from "@/components/LoadingScreen";

import { db, auth } from "@/firebase/init";
import { mapGetters } from "vuex";
export default {
  name: "Applications",
  components: { ApplicationsList, LoadingScreen },
  data() {
    return {
      years: [],
      displayLoadingScreen: false
    };
  },
  computed: {
    ...mapGetters(["userData"]),
    hasApplications() {
      if (this.years.find(year => year.applications.length)) {
        return true;
      }
      return false;
    }
  },
  async created() {
    this.displayLoadingScreen = true;
    for (let i = 0; i < 10; i++) {
      this.years.push({ year: new Date().getFullYear() - i, applications: [] });
    }
    if (this.userData.scholarship.name) {
      const docs = (
        await db
          .collection("scholarships")
          .doc(this.userData.scholarship.name)
          .collection("applications")
          .get()
      ).docs;
      docs.forEach(doc => {
        const application = doc.data();
        const year = application.dateSubmitted.toDate().getFullYear();
        let i;
        this.years.forEach((element, index) => {
          if (element.year === year) {
            i = index;
          }
        });

        if (i > -1) {
          this.years[i].applications.push(application);
        }
      });
      this.years.sort((a, b) => b.year - a.year);
    }
    this.displayLoadingScreen = false;
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.years {
  max-width: 1400px;
  margin-top: 50px;
  @media (max-width: 1400px) {
    margin-top: 0px;
  }
  .year-text {
    color: $primary;
    &:hover {
      text-decoration: none;
      color: lighten($primary, 30);
    }
  }
}
</style>