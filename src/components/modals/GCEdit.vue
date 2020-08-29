<template>
  <div class="GC-Edit" @input="() => { saved = false }">
    <div v-for="(document, index) in newDocuments" :key="index">
      <hr />
      <div class="form-group">
        <label :for="`document-${student.uid}-${index}`">Document #{{index+1}}: {{document.name}}</label>
        <span
          class="material-icons text-right delete ml-2"
          @click="deleteDocument(index)"
          v-if="document.assigned"
        >delete</span>

        <input
          class="form-control"
          :id="`document-${student.uid}-${index}`"
          type="text"
          v-model="document.name"
          placeholder="New name"
          :disabled="!document.assigned"
        />
      </div>
    </div>
    <div class="add-document">
      <a class="btn btn-link mb-1 mt-0" @click="toggleUploading">+ Add a Document</a>
      <div v-if="uploading" class="p-4 bg-light border border-muted rounded">
        <form>
          <input
            type="file"
            class="mb-3"
            @change="changeFile($event)"
            accept=".png, .jpg, .jpeg, .pdf, .docx, .doc, .gif"
          />
          <p
            style="font-size: 11px;"
            class="text-danger"
          >Note: You can only add files of type pdf (RECOMMENDED), .png, .jpg, .jpeg, .docx, .doc, .gif</p>
          <div class="form-group">
            <label for="document-name">Give your document a name:</label>
            <input type="text" class="form-control" v-model="name" placeholder="Document name" />
          </div>
          <button type="submit" class="btn main-button shadow" @click.prevent="upload">
            <span
              ref="spinner"
              class="spinner-border spinner-border-sm d-none"
              role="status"
              aria-hidden="true"
            ></span>
            Upload Document
          </button>
          <p
            style="font-size: 13px;"
            class="font-italic mt-2"
          >You can also press the "enter" key to upload.</p>
        </form>
      </div>
    </div>
    <div class="save-changes" v-if="!saved">
      <hr />
      <p class="font-italic">Remember to save any changes you make!</p>
      <button class="btn main-button shadow" @click="save">Save</button>
    </div>
    <LoadingScreen ref="loadingScreen" :display="displayLoadingScreen" />
  </div>
</template>

<script>
import { db, storage } from "@/firebase/init";
import { mapGetters, mapActions } from "vuex";
import LoadingScreen from "@/components/LoadingScreen";

export default {
  name: "GC-Edit",
  props: ["student"],
  components: { LoadingScreen },
  data() {
    return {
      feedback: null,
      newDocuments: [],
      name: null,
      file: null,
      uploading: false,
      saved: true,
      displayLoadingScreen: false
    };
  },
  computed: mapGetters(["documents"]),
  methods: {
    ...mapActions(["fetchUserDocuments", "updateDocuments", "addDocument"]),
    async save() {
      await this.fetchUserDocuments(this.student.uid);
      this.updateDocuments({
        documents: this.newDocuments,
        uid: this.student.uid
      })
        .then(() => {
          this.saved = true;
          this.$emit("on-save");
        })
        .catch(err => {
          this.feedback = err.message;
        });
    },
    deleteDocument(index) {
      this.newDocuments.splice(index, 1);
      this.saved = false;
    },
    toggleUploading() {
      this.uploading = !this.uploading;
      this.name = null;
      this.file = null;
    },
    changeFile(e) {
      const file = e.target.files[0];
      if (file) {
        this.file = file;
      }
    },
    upload() {
      if (this.file && this.name) {
        this.$refs.spinner.classList.remove("d-none");
        const path = `documents/${this.student.uid}/${this.name}`;
        const task = storage.ref(path).put(this.file);
        task.on(
          "state_changed",
          function(snapshot) {
            this.feedback = null;
          },
          function(err) {
            this.feedback = err.message;
          },
          () => {
            const document = { name: this.name, path, assigned: true };
            this.addDocument({
              document,
              uid: this.student.uid
            });
            this.newDocuments.push(document);
            this.$emit("on-add", { document });
            this.toggleUploading();
            this.$refs.spinner.classList.add("d-none");
          }
        );
      } else {
        this.feedback =
          "Please make sure you have uploaded the file & that you have given the document a name.";
      }
    }
  },
  async mounted() {
    this.displayLoadingScreen = true;
    await this.fetchUserDocuments(this.student.uid);
    this.displayLoadingScreen = false;

    this.newDocuments = this.documents;
  },
  async beforeDestroy() {
    await this.save();
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.GCEditModal {
  h5,
  label {
    color: $primary;
  }
  .delete {
    cursor: pointer;
  }
}
</style>