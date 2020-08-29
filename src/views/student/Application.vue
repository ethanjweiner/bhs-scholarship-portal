<template>
  <div class="application" v-if="scholarship">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        Application for {{name}}
        <span class="material-icons">description</span>
      </h1>
    </div>
    <div class="row" v-if="!newApplication">
      <div class="col-lg-1"></div>
      <div class="col-lg-10 justify-center">
        <div class="pre-application-view card m-md-5">
          <div class="card-header text-center d-none d-md-block">{{ name }}</div>
          <div class="card-body">
            <p class="card-text" v-if="scholarship.description">
              <span class="font-weight-bold">Description:</span>
              {{ scholarship.description }}
            </p>
            <p class="card-text" v-if="scholarship.criteria">
              <span class="font-weight-bold">Criteria:</span>
              {{ scholarship.criteria }}
            </p>
            <p class="card-text" v-if="scholarship.amount">
              <span class="font-weight-bold">Amount:</span>
              {{ scholarship.amount }}
            </p>
            <p class="card-text" v-if="scholarship.deadline">
              <span class="font-weight-bold">Deadline:</span>
              {{ scholarship.deadline | dateOutput }}
            </p>
            <p class="card-text" v-if="scholarship.documents">
              <span class="font-weight-bold">Requested Documents:</span>
              <span v-for="(document, index) in scholarship.documents" :key="index">
                {{ document.name }}
                <span v-if="index<scholarship.documents.length-1">{{','}}</span>
              </span>
            </p>
            <div class="card-text" v-if="scholarship.customQuestions">
              <span class="font-weight-bold">Custom Questions:</span>
              <ul>
                <li
                  v-for="(question, index) in scholarship.customQuestions"
                  :key="index"
                >{{ question.content }}</li>
              </ul>
            </div>
            <button
              class="main-button btn-block btn-lg shadow"
              @click="createApplication()"
              v-if="!pastDeadline"
            >Start Application</button>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
    </div>
    <div
      class="row"
      v-if="newApplication"
      @input="() => { saved = false }"
      style="margin-bottom: 100px;"
    >
      <div class="col-lg-1"></div>
      <div class="col-lg-10 justify-center">
        <div class="application-view card m-md-5">
          <div class="card-header text-center d-none d-md-block">{{ name }}</div>
          <div class="card-body">
            <p
              class="card-text font-weight-bold p-3 bg-light border border-danger mb-4 rounded"
              style="font-size: 17px;"
              v-if="newApplication.status == 'In progress'"
            >
              <a class="text-primary view-profile" @click="viewProfile()">Your profile</a> in its current state will be submitted to the scholarship committee as part of your application. Please
              <a
                class="text-primary view-profile"
                @click="viewProfile()"
              >view your profile</a> and make sure all information is correct and up to date.
            </p>
            <p
              class="card-text font-weight-bold p-3 bg-light border border-success mb-4 rounded"
              style="font-size: 17px;"
              v-if="newApplication.status === 'Submitted'"
            >You have already submitted this application.</p>
            <p class="card-text mb-0" v-if="scholarship.description">
              <span class="font-weight-bold">Scholarship Description:</span>
              {{ scholarship.description }}
            </p>
            <p class="card-text mb-0" v-if="scholarship.criteria">
              <span class="font-weight-bold">Scholarship Criteria:</span>
              {{ scholarship.criteria }}
            </p>
            <p class="card-text mb-0" v-if="scholarship.amount">
              <span class="font-weight-bold">Amount:</span>
              {{ scholarship.amount }}
            </p>
            <p class="card-text" v-if="scholarship.deadline">
              <span class="font-weight-bold">Deadline:</span>
              {{ scholarship.deadline | dateOutput }}
            </p>
            <form @submit="submitApplication()">
              <div class="custom-questions mt-2" v-if="scholarship.customQuestions">
                <h5 class="text-center font-weight-bold my-3">{{ name }} Custom Questions</h5>
                <div
                  class="form-group mt-1"
                  v-for="(question, index) in scholarship.customQuestions"
                  :key="index"
                >
                  <label :for="'question-'+index">
                    <span class="font-italic d-block">Custom Question #{{index+1}}:</span>
                    <span class="font-weight-bold">{{question.content}}</span>
                  </label>
                  <textarea-autosize
                    type="text"
                    class="form-control"
                    :id="'question-'+index"
                    placeholder="Your answer"
                    :maxlength="question.maxCharacters"
                    v-model="newApplication.customAnswers[index]"
                    :disabled="newApplication.status === 'Submitted' ? true : false"
                  />
                </div>
              </div>
              <div class="documents mt-2" v-if="scholarship.documents">
                <h5 class="text-center font-weight-bold my-3">Requested Documents</h5>
                <ul class="px-5 py-2 bg-light border border-muted rounded">
                  <li
                    v-for="(document, index) in scholarship.documents"
                    :key="index"
                  >{{ document.name }}</li>
                </ul>
                <div class="dropup">
                  <button
                    class="btn dropdown-toggle main-button"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    :disabled="newApplication.status === 'Submitted' ? true : false"
                  >Add a Document</button>
                  <div class="dropdown-menu" aria-labbeledby="dropdownMenuButton">
                    <a
                      class="dropdown-item"
                      v-for="(document, index) in documents"
                      :key="index"
                      @click="($event) => { addApplicationDocument({document}); createInputEvent($event) }"
                    >
                      <span class="material-icons" style="font-size: 14px;">article</span>
                      {{ document.name }}
                    </a>

                    <a
                      class="dropdown-item upload-dropdown-item"
                      data-toggle="modal"
                      data-target="#uploadModal"
                    >
                      <span class="material-icons" style="font-size: 15px;">add</span>
                      Upload a Different Document
                    </a>
                    <a
                      class="dropdown-item edit-dropdown-item"
                      data-toggle="modal"
                      data-target="#editModal"
                      @click="openEditModal"
                    >
                      <span class="material-icons" style="font-size: 14px;">edit</span>
                      Edit/Delete Your Documents
                    </a>
                  </div>
                  <div class="application-documents">
                    <p style="font-size: 30px;" class="mt-2">
                      <span
                        class="badge badge-secondary mr-2 my-1"
                        v-for="(document, index) in newApplication.applicationDocuments"
                        :key="index"
                      >
                        {{document.name}}
                        <span
                          class="material-icons delete"
                          @click="($event) => { deleteApplicationDocument({index}); createInputEvent($event); }"
                          v-if="newApplication.status === 'In progress'"
                        >delete</span>
                      </span>
                    </p>
                  </div>
                </div>
                <UploadModal @on-add="confirmUpload" />
                <EditModal @on-edit="confirmEdit" />
              </div>
              <div class="additional-notes mt-2">
                <h5 class="text-center font-weight-bold my-3">Additional Notes</h5>
                <div class="form-group">
                  <textarea-autosize
                    type="text"
                    class="form-control"
                    v-model="newApplication.additionalNotes"
                    placeholder="Any notes you want to add for the reader"
                    :disabled="newApplication.status === 'Submitted' ? true : false"
                  />
                </div>
              </div>

              <div class="input-group" v-if="newApplication.status === 'In progress'">
                <label
                  for="signature"
                  class="font-weight-bold mr-2"
                >Please check this box to verify that all information you have provided (including the information in your profile) is accurate and up-to-date:</label>
                <input class="checkbox" type="checkbox" id="signature" v-model="verified" />
              </div>
              <p
                v-if="!verified && newApplication.status === 'In progress'"
                class="font-italic mt-2"
              >You must check the box above before you can submit your application.</p>
              <p
                class="mt-2"
              >If you have any questions about this scholarship, please email {{scholarship.email}}</p>
              <button
                v-if="verified && newApplication.status === 'In progress'"
                class="mt-4 btn-lg btn-block btn-white form-control border border-danger text-danger shadow"
                data-toggle="modal"
                data-target="#submit-application-modal"
                @click.prevent
              >Submit Application</button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="submit-application-modal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">Submit Application</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div
                      class="modal-body"
                    >Are you sure you want to submit your application? Once you submit it, you can no longer make changes.</div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click.prevent="submitApplication()"
                      >
                        <span
                          ref="spinner"
                          class="spinner-border spinner-border-sm d-none"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Submit
                      </button>
                      <p class="text-danger" v-if="feedback">{{feedback}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
    </div>
    <div class="fixed-bottom save-changes-container px-5 py-4 d-flex">
      <div v-if="saved">
        <p class="text-success mr-2 d-inline">Your scholarship is saved.</p>
        <span class="material-icons text-success d-inline">done</span>
      </div>
      <div v-else class="justify-center">
        <button class="btn btn-lg main-button mr-3" @click="save">Save changes</button>

        <p class="text-danger d-inline mr-2">Make sure to save your changes.</p>
        <span class="material-icons d-inline text-danger">clear</span>
      </div>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import moment from "moment";
import { mapGetters, mapActions } from "vuex";
import UploadModal from "@/components/modals/UploadModal";
import EditModal from "@/components/modals/EditModal";

export default {
  name: "Application",
  data() {
    return {
      saved: true,
      scholarship: null,
      newApplication: null,
      verified: false,
      feedback: null
    };
  },
  components: { UploadModal, EditModal },
  filters: {
    dateOutput(input) {
      return moment(input).format("dddd, MMMM Do YYYY");
    }
  },
  props: ["name"],
  computed: {
    ...mapGetters(["userData", "documents"]),
    pastDeadline() {
      return (
        new Date().getTime() >=
        new Date(this.scholarship.deadline).getTime() + 86400000
      );
    }
  },
  methods: {
    ...mapActions([
      "updateApplication",
      "fetchUserDocuments",
      "addDocument",
      "deleteDocument"
    ]),
    async createApplication() {
      const data = {
        profile: this.userData.profile,
        customAnswers: [],
        applicationDocuments: [],
        additionalNotes: null,
        dateSubmitted: null,
        status: "In progress"
      };
      await db
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("applications")
        .doc(this.name)
        .set(data);
      this.newApplication = data;
    },
    async submitApplication() {
      this.$refs.spinner.classList.remove("d-none");
      this.feedback = null;
      this.newApplication.status = "Submitted";
      this.newApplication.dateSubmitted = new Date();
      try {
        await this.save();
        await db
          .collection("scholarships")
          .doc(this.name)
          .collection("applications")
          .doc(auth.currentUser.uid)
          .set(this.newApplication);
        $("#submit-application-modal").modal("toggle");
        this.$refs.spinner.classList.add("d-none");
      } catch (err) {
        this.newApplication.status = "In progress";
        this.feedback = err.message;
        this.$refs.spinner.classList.add("d-none");
      }
    },
    viewProfile() {
      this.$router.push({ name: "Student-Profile" });
    },
    async save() {
      await this.updateApplication({
        application: this.newApplication,
        name: this.scholarship.name
      });
      this.saved = true;
    },
    addApplicationDocument({ document }) {
      this.newApplication.applicationDocuments.push(document);
    },
    deleteApplicationDocument({ index }) {
      this.newApplication.applicationDocuments.splice(index, 1);
    },
    async confirmUpload({ document }) {
      this.addApplicationDocument({ document });
      $("#uploadModal").modal("toggle");
    },
    confirmEdit({ newDocuments }) {
      $("#editModal").modal("toggle");
      this.newApplication.applicationDocuments.forEach(
        (applicationDocument, index) => {
          newDocuments.forEach(newDocument => {
            console.log(newDocument.path, applicationDocument.path);
            if (applicationDocument.path === newDocument.path) {
              this.newApplication.applicationDocuments[index].name =
                newDocument.name;
            }
          });
        }
      );
    },
    createInputEvent(e) {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("input", true, true);
      e.target.dispatchEvent(event);
    },
    async openEditModal() {
      await this.fetchUserDocuments(auth.currentUser.uid);
      $("#editModal").modal("show");
    }
  },
  async created() {
    this.scholarship = (
      await db
        .collection("scholarships")
        .doc(this.name)
        .get()
    ).data();
    const doc = await db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("applications")
      .doc(this.name)
      .get();
    if (doc.exists) this.newApplication = doc.data();
    this.fetchUserDocuments(auth.currentUser.uid);
  },
  beforeRouteLeave(to, from, next) {
    if (!this.saved) {
      alert("Make sure to save your changes to your scholarship first!");
    } else {
      next();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.application {
  .main-button {
    background: $secondary;
    color: white;
    border: none;
    &:hover {
      color: white;
      background: lighten($secondary, 10);
    }
  }
  .view-profile {
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }
  .save-changes-container {
    background: rgb(214, 214, 214);
    border-top: 2px solid $secondary;
  }
  .dropup {
    a {
      cursor: pointer;
    }
    .upload-dropdown-item {
      background: lighten($primary, 40);
      &:hover {
        background: lighten($primary, 30);
      }
    }
    .edit-dropdown-item {
      background: lighten($secondary, 50);
      &:hover {
        background: lighten($secondary, 40);
      }
    }
  }
  .delete {
    cursor: pointer;
  }
  .checkbox {
    width: 18px;
    height: 18px;
  }
}
</style>