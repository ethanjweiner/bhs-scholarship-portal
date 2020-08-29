<template>
  <div class="donor-scholarship">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        Your Scholarship
        <span class="material-icons">analytics</span>
      </h1>
    </div>
    <div class="scholarship-info mx-auto mt-3 px-5 py-0">
      <p>
        For each application you receive, you will automatically receive the student's "profile", which contains much information about the applicant.
        Therefore, you must only create your own custom questions that are NOT already answered in the student profile. Each student profile contains the
        following information about an applicant:
      </p>
      <ul style="font-size: 14px;">
        <li>Name</li>
        <li>Home Address</li>
        <li>Home Phone</li>
        <li>Cell Phone</li>
        <li>Birth Info</li>
        <li>Academics</li>
        <ul>
          <li>Weighted GPA</li>
          <li>Decile Rank</li>
          <li>SAT/ACT Score</li>
        </ul>
        <li>Colleges to which the applicant has applied</li>
        <li>Colleges to which the applicant has been accepted</li>
        <li>Top 3 college choices</li>
        <li>Financial Info (for the upcoming school year)</li>
        <ul>
          <li>Estimated Parental Contribution</li>
          <li>Estimated Student Contribution</li>
          <li>Other known financial aid (grants/awards/scholarships)</li>
          <li>Total anticipated financial need</li>
          <li>Whether applicant has completed the FASFA</li>
          <li>Total money student owes to persons/organizations</li>
        </ul>
        <li>Family Info</li>
        <ul>
          <li>Father's, mother's, guardian's names, addresses, occupations, & employers</li>
          <li>Number of dependents in family</li>
          <li>Family members attending college full time</li>
        </ul>
        <li>School & Community Activities/Sports</li>
        <ul>
          <li>Activities/Sports</li>
          <li>Honors/Prizes</li>
          <li>Leadership Roles</li>
          <li>Grades participated</li>
        </ul>
        <li>Work Experience</li>
        <ul>
          <li>Employers</li>
          <li>Poistions</li>
          <li>Leadership Roles</li>
          <li>Dates participated</li>
        </ul>
        <li>Answers to the following questions:</li>
        <ul>
          <li>What are you plans after college?</li>
          <li>Why are you applying for financial aid? List any extenuating circumstances that may be helpful for the selection committee in determining financial need.</li>
        </ul>
      </ul>
      <p>If you want your applicants to answer any additional questions, add the question in the "Custom Questions" section of your scholarship.</p>
    </div>
    <hr />
    <form
      class="px-5 pt-0 pb-4 mx-auto"
      style="margin-bottom: 150px;"
      @input="() => { saved = false }"
    >
      <div class="form-group">
        <label for="name">Scholarship Name</label>
        <input
          id="name"
          class="form-control"
          type="text"
          v-model="scholarship.name"
          placeholder="Name of your scholarship"
          :class="{filled : scholarship.name}"
          :disabled="scholarship.submitted ? true : false"
        />
      </div>
      <div class="form-group">
        <label for="criteria">Applicant criteria</label>
        <p
          class="font-italic"
          style="font-size: 13px;"
        >What criteria must this applicant have to apply for this scholarship?</p>
        <textarea-autosize
          type="text"
          v-model="scholarship.criteria"
          id="criteria"
          class="form-control"
          placeholder="Required applicant criteria"
          :class="{filled : scholarship.criteria}"
        />
      </div>
      <div class="form-group">
        <label for="deadline">Deadline</label>
        <input
          type="date"
          v-model="scholarship.deadline"
          id="deadline"
          class="form-control"
          placeholder="Deadline for your scholarship"
          :class="{filled : scholarship.deadline}"
        />
      </div>
      <div class="form-group">
        <label for="description">Description of your scholarship</label>
        <p
          class="font-italic"
          style="font-size: 13px;"
        >What do you want your applicants to know about this scholarship? What does this scholarship value?</p>
        <textarea-autosize
          type="text"
          v-model="scholarship.description"
          id="description"
          class="form-control"
          placeholder="Scholarship description"
          :class="{filled : scholarship.description}"
        />
      </div>
      <div class="form-group">
        <label for="amount">Dollar Amount(s) that this Scholarship Provides</label>
        <input
          id="amount"
          class="form-control"
          type="text"
          v-model="scholarship.amount"
          :class="{filled : scholarship.amount}"
          placeholder="Amount(s) of your scholarship (in $)"
        />
      </div>
      <hr />
      <h5 class="text-center" style="font-weight: bold;">Custom Questions</h5>
      <CustomQuestion
        v-for="(question, index) in scholarship.customQuestions"
        :key="'question-'+index"
        :question="question"
        :index="index"
        @on-remove="deleteQuestion({index})"
      />
      <button class="btn mt-2 main-button" @click.prevent="addQuestion()">+ Add Question</button>

      <h5 class="text-center" style="font-weight: bold;">Documents</h5>
      <p
        class="mt-3"
      >What documents do you want from your applicants? The applicant or their guidance counselor will upload them to their application. Examples include:</p>
      <ul style="font-size: 15px;">
        <li>Official High School Transcript</li>
        <li>Letter of Recommendation</li>
        <ul>
          <li>from teacher</li>
          <li>from guidance counselor</li>
          <li>from employer</li>
        </ul>
        <li>Resume</li>
        <li>Awards</li>
      </ul>
      <p
        class="font-weight-bold mb-0"
      >Make sure to add a separate document for EVERY document you want from your applicant.</p>
      <p class="mt-0">e.g. If you want 2 recommendation letters from teachers, add 2 documents.</p>

      <Document
        v-for="(document, index) in scholarship.documents"
        :key="'document-'+index"
        :document="document"
        :index="index"
        @on-remove="deleteDocument({index})"
      />
      <button class="btn mt-2 main-button" @click.prevent="addDocument()">+ Add Document</button>
      <div
        v-if="!scholarship.submitted || shouldResubmit"
        class="bg-danger px-5 pt-3 rounded mt-5 border border-dark shadow"
      >
        <button
          class="btn-lg btn-block btn-white form-control text-danger shadow"
          data-toggle="modal"
          data-target="#submit-modal"
          @click.prevent
        >
          <span v-if="shouldResubmit">Resubmit Scholarship</span>
          <span v-else>Submit Scholarship</span>
        </button>
        <p
          class="font-weight-bold mt-4 text-white"
          v-if="shouldResubmit"
        >Make sure to update your scholarship's deadline and resubmit every year!</p>
        <p
          class="text-white mt-2"
        >Once you submit your scholarship, all students will be able to view it and apply. Any future changes you make will update the scholarship.</p>

        <!-- Modal -->
        <div
          class="modal fade"
          id="submit-modal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Submit Scholarship</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div
                class="modal-body"
              >Are you sure you want to submit your scholarship? Once you submit it, you cannot unsubmit. However, you will still be able to make changes.</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="onSubmit()">Submit</button>
                <p class="text-success" v-if="feedback">{{feedback}}</p>
                <p class="text-danger" v-if="error">{{error}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="fixed-bottom save-changes-container px-5 py-4 d-flex">
      <div v-if="saved">
        <p class="text-success mr-2 d-inline">Your scholarship is saved.</p>
        <span class="material-icons text-success d-inline">done</span>
      </div>
      <div v-else class="justify-center">
        <button class="btn btn-lg main-button mr-3" @click="save">Save changes</button>

        <p class="text-danger d-inline mr-2">
          Make sure to save your changes.
          <span
            v-if="scholarship.submitted"
          >Any changes you make will be reflected to all students.</span>
        </p>
        <span class="material-icons d-inline text-danger">clear</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CustomQuestion from "@/components/inputs/CustomQuestion";
import Document from "@/components/inputs/Document";
import { db, auth } from "@/firebase/init";

export default {
  name: "Donor-Scholarship",
  computed: {
    ...mapGetters(["userData"])
  },
  components: { CustomQuestion, Document },
  data() {
    return {
      saved: true,
      shouldResubmit: false,
      scholarship: {
        name: null,
        criteria: null,
        description: null,
        deadline: null,
        amount: null,
        customQuestions: [],
        documents: [],
        submitted: false
      },
      feedback: null,
      error: null
    };
  },
  methods: {
    ...mapActions(["updateScholarship"]),
    async save() {
      await this.updateScholarship({ scholarship: this.scholarship });
      if (this.scholarship.submitted) {
        await this.submitScholarship();
      }
      this.saved = true;
    },
    async onSubmit() {
      if (this.scholarship.name) {
        this.scholarship.submitted = true;
        await this.save();
      }
      $("#submit-modal").modal("hide");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    },
    pastDeadline() {
      if (this.userData.scholarship.deadline) {
        return (
          new Date().getTime() >
          new Date(this.userData.scholarship.deadline).getTime() + 10368000000
        );
      }
      return false;
    },
    async submitScholarship() {
      this.feedback = null;
      this.error = null;
      try {
        await db
          .collection("scholarships")
          .doc(this.scholarship.name)
          .set({
            donor: this.userData.name,
            email: this.userData.email,
            ...this.scholarship
          });
        this.feedback = "Your scholarship has been submitted!";
      } catch (err) {
        this.error = err.message;
      }
    },
    addQuestion() {
      this.scholarship.customQuestions.push({
        content: "",
        maxCharacters: null
      });
    },
    deleteQuestion({ index }) {
      this.scholarship.customQuestions.splice(index, 1);
    },
    addDocument() {
      this.scholarship.documents.push({ name: "" });
    },
    deleteDocument({ index }) {
      this.scholarship.documents.splice(index, 1);
    }
  },
  created() {
    if (this.userData) {
      this.scholarship = this.userData.scholarship;
      if (this.pastDeadline()) {
        this.shouldResubmit = true;
      }
    }
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
.donor-scholarship {
  form,
  .scholarship-info {
    max-width: 1250px;
  }
  .heading {
    background: rgb(214, 214, 214);
    h1 {
      @include big-font();
      color: $primary;
      span {
        font-size: 35px;
      }
    }
    border-bottom: 2px dashed $primary;
  }
  .save-changes-container {
    background: rgb(214, 214, 214);
    border-top: 2px solid $secondary;
  }
  form {
    max-width: 1250px;
  }
  .main-button {
    color: white;
    background: $primary;
    &:hover {
      color: white;
      background: lighten($primary, 10);
    }
  }
  label {
    color: $primary;
  }
  .filled {
    background: lighten($primary, 55);
    color: black;
  }
}
</style>