<template>
  <div
    class="modal fade"
    id="uploadModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title font-weight-bold" id="exampleModalLabel">Upload a Document</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input
            type="file"
            class="mb-3"
            @change="changeFile($event)"
            accept=".png, .jpg, .jpeg, .pdf, .docx, .doc, .gif"
          />
          <p
            style="font-size: 11px;"
            class="text-danger"
          >Note: You can only add files of type .pdf (RECOMMENDED), .png, .jpg, .jpeg, , .docx, .doc, .gif</p>
          <div class="form-group">
            <label for="document-name">Give your document a name:</label>
            <input type="text" class="form-control" v-model="name" placeholder="Document name" />
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn main-button" @click="upload()">
            <span
              ref="spinner"
              class="spinner-border spinner-border-sm d-none"
              role="status"
              aria-hidden="true"
            ></span>
            Upload
          </button>
          <div class="text-danger" v-if="feedback">{{feedback}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, auth, db } from "@/firebase/init";
import { mapActions } from "vuex";
export default {
  name: "Upload-Modal",
  data() {
    return {
      name: null,
      file: null,
      feedback: null
    };
  },
  methods: {
    ...mapActions(["addDocument"]),
    changeFile(e) {
      const file = e.target.files[0];
      if (file) {
        this.file = file;
      }
    },
    upload() {
      if (this.file && this.name) {
        const path = `documents/${auth.currentUser.uid}/${this.name}`;
        const task = storage.ref(path).put(this.file);
        this.$refs.spinner.classList.remove("d-none");

        task.on(
          "state_changed",
          function(snapshot) {
            this.feedback = null;
          },
          function(err) {
            this.feedback = err.message;
          },
          () => {
            const document = { name: this.name, path };
            this.addDocument({
              document,
              uid: auth.currentUser.uid
            });
            this.$emit("on-add", { document });
            this.$refs.spinner.classList.add("d-none");
            this.name = null;
            this.file = null;
          }
        );
      } else {
        this.feedback =
          "Please make sure you have uploaded the file & that you have given the document a name.";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
#uploadModal {
  h5,
  label {
    color: $primary;
  }
}
</style>