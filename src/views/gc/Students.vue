;<template>
  <div class="students mx-auto mt-5 mb-5">
    <form class="form-inline search mb-1 mr-3 mx-2">
      <input
        v-model="searchField"
        class="form-control mr-2 my-1 mt-5"
        type="search"
        id="search"
        placeholder="Search by student name"
        aria-label="Search"
      />
    </form>
    <div class="form-check mx-2">
      <input class="form-check-input" type="checkbox" id="isRecent" v-model="isRecent" />
      <label
        class="form-check-label"
        for="isRecent"
      >Only include students active in the past 6 months</label>
    </div>
    <div class="form-check mb-3 mx-2">
      <input class="form-check-input" type="checkbox" id="notProvided" v-model="notProvided" />
      <label
        class="form-check-label"
        for="notProvided"
      >Only include students to whom no documents have been provided</label>
    </div>
    <ul class="list-group">
      <Student
        v-for="(student) in filteredStudents"
        :key="student.uid"
        :student="student"
        @input="() => { saved = false }"
      >{{student.profile.name}}</Student>
    </ul>
    <LoadingScreen :display="displayLoadingScreen" />
  </div>
</template>

<script>
import { db } from "@/firebase/init";
import { mapGetters } from "vuex";
import Student from "@/components/Student";
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: "Students",
  data() {
    return {
      students: [],
      isRecent: true,
      searchField: "",
      notProvided: false,
      saved: true,
      displayLoadingScreen: false
    };
  },
  components: { Student, LoadingScreen },
  asyncComputed: {
    async filteredStudents() {
      this.displayLoadingScreen = true;
      // Name Search
      let filter1 = this.students;
      if (this.searchField.length) {
        filter1 = this.students.filter(
          student =>
            student.profile.name
              .trim()
              .toLowerCase()
              .match(this.searchField.trim().toLowerCase()) ||
            this.searchField
              .trim()
              .toLowerCase()
              .match(student.profile.name.trim().toLowerCase())
        );
      }
      // isRecent
      let filter2 = filter1;
      if (this.isRecent) {
        filter2 = filter1.filter(student => {
          const lastActive = student.lastActive.toDate().getTime();
          const now = new Date().getTime();
          const difference = now - lastActive;
          return difference < 15552000000;
        });
      }
      // notProvided
      let filter3 = filter2;
      if (this.notProvided) {
        filter3 = [];
        filter2.forEach(async student => {
          const documents = (
            await db
              .collection("users")
              .doc(student.uid)
              .collection("documents")
              .get()
          ).docs;
          if (!documents.find(document => document.data().assigned)) {
            filter3.push(student);
          }
        });
      }
      this.displayLoadingScreen = false;

      return filter3;
    }
  },
  async created() {
    this.displayLoadingScreen = true;
    const docs = (
      await db
        .collection("users")
        .where("isStudent", "==", true)
        .orderBy("profile.name")
        .get()
    ).docs;
    docs.forEach(doc => {
      this.students.push({ ...doc.data(), uid: doc.id });
    });
    this.displayLoadingScreen = false;
  },
  beforeRouteLeave(to, from, next) {
    if (!this.saved) {
      alert("Make sure to save your changes first!");
    } else {
      next();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.students {
  max-width: 1000px;
  .search {
    input {
      min-width: 250px;
    }
    .search-button {
      color: $secondary;
      border: 1px $secondary solid;
    }
  }
}
</style>