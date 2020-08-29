<template>
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Edit Your Documents</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-for="(document, index) in newDocuments" :key="index">
            <div class="form-group">
              <label :for="`document-${index}`" style="width: 92%;">Current name: {{document.name}}</label>
              <span
                class="material-icons text-right delete"
                @click="deleteDocument(index)"
                v-if="!document.assigned"
              >delete</span>

              <input
                class="form-control"
                :id="`document-${index}`"
                :disabled="document.assigned"
                type="text"
                v-model="document.name"
                placeholder="New name"
              />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn main-button" @click="save()">Save</button>
          <div class="text-danger" v-if="feedback">{{feedback}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/init";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Edit-Modal",
  data() {
    return {
      name: null,
      file: null,
      feedback: null,
      newDocuments: []
    };
  },
  computed: mapGetters(["documents"]),
  methods: {
    ...mapActions(["fetchUserDocuments", "updateDocuments"]),
    deleteDocument(index) {
      this.newDocuments.splice(index, 1);
    },
    async save() {
      this.updateDocuments({
        documents: this.newDocuments,
        uid: auth.currentUser.uid
      })
        .then(() => {
          this.$emit("on-edit", { newDocuments: this.newDocuments });
        })
        .catch(err => {
          this.feedback = err.message;
        });
    }
  },
  async created() {
    this.newDocuments = this.documents;

    this.$store.watch(
      (state, getters) => getters.documents,
      (newValue, oldValue) => {
        this.newDocuments = newValue;
      }
    );
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
#editModal {
  h5,
  label {
    color: $primary;
  }
  .delete {
    cursor: pointer;
  }
}
</style>