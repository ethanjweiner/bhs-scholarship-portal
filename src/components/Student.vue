<template>
  <li class="list-group-item student">
    <div class="d-flex justify-content-between">
      <div class="text-left font-weight-bold d-inline">{{student.profile.name}}</div>
      <button class="main-button btn btn-sm shadow" @click="toggleEditing">Edit/Add Documents</button>
    </div>
    <GCEdit :student="student" v-if="editing" @on-save="toggleEditing" />
  </li>
</template>

<script>
import GCEdit from "@/components/modals/GCEdit";
import { db, storage } from "@/firebase/init";

import { mapGetters, mapActions } from "vuex";
export default {
  name: "Student",
  props: ["student"],
  components: { GCEdit },
  data() {
    return {
      editing: false
    };
  },
  methods: {
    ...mapActions(["fetchUserDocuments", "updateDocuments", "addDocument"]),
    deleteDocument(index) {
      this.newDocuments.splice(index, 1);
    },
    toggleEditing() {
      this.editing = !this.editing;
    }
  },
  computed: mapGetters(["documents"])
};
</script>

<style lang="scss">
@import "@/assets/scss/app";

.student {
  .main-button {
    color: white;
    background: $primary;
    &:hover {
      color: white;
      background: lighten($primary, 10);
    }
  }
  h5,
  label {
    color: $primary;
  }
  .delete {
    cursor: pointer;
  }
}
</style>