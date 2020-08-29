<template>
  <div class="student-application" v-if="application">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        {{name}}'s Application
        <span class="material-icons">article</span>
      </h1>
    </div>
    <div class="row">
      <div class="col-lg-1"></div>
      <div class="col-lg-10 justify-center">
        <div class="card m-md-5">
          <div class="card-header text-center d-none d-md-block">{{name}}</div>
          <div class="card-body">
            <h2 class="text-center font-weight-bold my-3">{{name}}'s Profile</h2>
            <hr />
            <div class="metadata">
              <div class="form-group">
                <label for="student-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  id="student-name"
                  v-model="application.profile.name"
                />
              </div>
              <div class="form-group">
                <label for="inputAddress">Home Address</label>
                <input
                  v-model="application.profile.homeAddress"
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  disabled
                />
              </div>
              <div class="form-row">
                <div class="form-group col-sm-6">
                  <label for="home-phone">Home Phone</label>
                  <input
                    v-model="application.profile.homePhone"
                    disabled
                    type="text"
                    class="form-control"
                    id="home-phone"
                  />
                </div>
                <div class="form-group col-sm-6">
                  <label for="cell-phone">Cell Phone</label>
                  <input
                    v-model="application.profile.cellPhone"
                    type="text"
                    class="form-control"
                    disabled
                    id="cell-phone"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="extended-data">
              <h5 class="text-center" style="font-weight: bold;">Birth Info</h5>

              <div class="form-row">
                <div class="form-group col-sm-6">
                  <label for="birth-date">Birth Date</label>
                  <input
                    v-model="application.profile.birthDate"
                    disabled
                    type="date"
                    class="form-control"
                    id="birth-date"
                  />
                </div>
                <div class="form-group col-sm-6">
                  <label for="birth-city">Birth City</label>
                  <input
                    v-model="application.profile.birthCity"
                    disabled
                    type="text"
                    class="form-control"
                    id="birth-city"
                  />
                </div>
              </div>
              <h5 class="text-center" style="font-weight: bold;">Academics</h5>

              <div class="form-row">
                <div class="form-group col-sm-6 col-md-3">
                  <label for="gpa">Weighted GPA</label>
                  <input
                    v-model="application.profile.gpa"
                    disabled
                    type="text"
                    class="form-control"
                    id="gpa"
                  />
                </div>
                <div class="form-group col-sm-6 col-md-3">
                  <label for="decile-rank">Decile Rank</label>
                  <input
                    v-model="application.profile.decileRank"
                    disabled
                    type="text"
                    class="form-control"
                    id="decile-rank"
                  />
                </div>
                <div class="form-group col-sm-6 col-md-3">
                  <label for="sat">SAT Total (/1600)</label>
                  <input
                    v-model="application.profile.sat"
                    disabled
                    type="text"
                    class="form-control"
                    id="sat"
                  />
                </div>
                <div class="form-group col-sm-6 col-md-3">
                  <label for="act">ACT Composite (/36)</label>
                  <input
                    v-model="application.profile.act"
                    disabled
                    type="text"
                    class="form-control"
                    id="act"
                  />
                </div>
              </div>
              <div class="form-group">
                <label for="major">Anticipated Major</label>
                <input
                  class="form-control"
                  type="text"
                  id="major"
                  v-model="application.profile.major"
                  disabled
                />
              </div>
              <div class="form-group">
                <label for="plans">What are your plans after college?</label>
                <textarea-autosize
                  :max-height="350"
                  v-model="application.profile.plans"
                  disabled
                  type="text"
                  class="form-control"
                  id="plans"
                />
              </div>
              <div class="form-group">
                <label for="applied-colleges">Names of colleges to which you have applied:</label>
                <textarea-autosize
                  :max-height="350"
                  v-model="application.profile.colleges.appliedColleges"
                  disabled
                  type="text"
                  class="form-control"
                  id="applied-colleges"
                />
              </div>
              <div class="form-group">
                <label for="accepted-colleges">Names of colleges to which you have been accepted:</label>
                <textarea-autosize
                  :max-height="350"
                  v-model="application.profile.colleges.acceptedColleges"
                  disabled
                  type="text"
                  class="form-control"
                  id="accepted-colleges"
                />
              </div>
              <div class="form-group">
                <label for="top-colleges">Please indicate your first three college choices:</label>
                <textarea-autosize
                  :max-height="100"
                  v-model="application.profile.colleges.topCollegeChoices"
                  disabled
                  type="text"
                  class="form-control"
                  id="top-colleges"
                />
              </div>
              <h5 class="text-center" style="font-weight: bold;">Financial Info</h5>
              <p
                style="font-size: 13px;"
                class="font-italic"
              >What sources of money can you count on for the upcoming school year (not including loans)?</p>

              <div class="form-row">
                <div class="form-group col-12 col-lg-6">
                  <label for="estimated-parental-contribution">Estimated Parental Contribution ($):</label>
                  <input
                    id="estimated-parental-contribution"
                    v-model="application.profile.financial.estimatedParentalContribution"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-lg-6">
                  <label
                    for="estimated-student-contribution"
                  >Estimated Student Contribution (Your savings & earnings) ($):</label>
                  <input
                    id="estimated-student-contribution"
                    v-model="application.profile.financial.estimatedStudentContribution"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-lg-6">
                  <label for="other-aid">Other known financial aid (grants/awards/scholarships) ($):</label>
                  <input
                    id="other-aid"
                    v-model="application.profile.financial.otherAid"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-lg-6">
                  <label
                    for="financial-need"
                  >Total Anticipated Financial Need (for this School Year) ($):</label>
                  <input
                    id="financial-need"
                    v-model="application.profile.financial.financialNeed"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label for="fasfa" class="mr-2">Check here if you have completed the FASFA:</label>
                  <input
                    id="fasfa"
                    v-model="application.profile.financial.FASFA"
                    @click.prevent
                    type="checkbox"
                    class="checkbox"
                  />
                </div>
                <div class="form-group col-12">
                  <label for="debt">Total amount of money student owes to persons/organizations ($):</label>
                  <input
                    id="debt"
                    v-model="application.profile.financial.debt"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label
                    for="financial-essay"
                  >[IMPORTANT] Why are you applying for financial aid? List any extenuating circumstances that may be helpful for the selection committee in determining financial need. Be as specific as possible.</label>
                  <textarea-autosize
                    id="financial-essay"
                    :min-height="100"
                    :max-height="450"
                    v-model="application.profile.financialEssay"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
              <h5 class="text-center" style="font-weight: bold;">Family</h5>
              <div class="form-row">
                <h6 style="font-weight: bold; text-decoration: underline">Father/Guardian</h6>
                <div class="form-group col-12">
                  <label for="father-name">Father's or Guardian's Name:</label>
                  <input
                    id="father-name"
                    v-model="application.profile.family.father.name"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label for="father-address">Father's or Guardian's Address:</label>
                  <input
                    id="father-address"
                    ref="fatherAddress"
                    v-model="application.profile.family.father.address"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-sm-6">
                  <label for="father-occupation">Father's or Guardian's Occupation:</label>
                  <input
                    id="father-occupation"
                    v-model="application.profile.family.father.occupation"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-sm-6">
                  <label for="father-employer">Employed by:</label>
                  <input
                    id="father-employer"
                    v-model="application.profile.family.father.employer"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <h6 style="font-weight: bold; text-decoration: underline">Mother/Guardian</h6>
                <div class="form-group col-12">
                  <label for="mother-name">Mother's or Guardian's Name:</label>
                  <input
                    id="mother-name"
                    v-model="application.profile.family.mother.name"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label for="mother-address">Mother's or Guardian's Address:</label>
                  <input
                    ref="motherAddress"
                    id="mother-address"
                    v-model="application.profile.family.mother.address"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-sm-6">
                  <label for="mother-occupation">Mother's or Guardian's Occupation:</label>
                  <input
                    id="mother-occupation"
                    v-model="application.profile.family.mother.occupation"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12 col-sm-6">
                  <label for="mother-employer">Employed by:</label>
                  <input
                    id="mother-employer"
                    v-model="application.profile.family.mother.employer"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label
                    for="dependents"
                  >Total number of dependents in family (including yourself & parents):</label>
                  <input
                    id="dependents"
                    v-model="application.profile.family.dependents"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
                <div class="form-group col-12">
                  <label
                    for="college-students"
                  >List family members that are currently attending college full time (include their name, age, & relationship to you):</label>
                  <textarea-autosize
                    id="college-students"
                    :max-height="200"
                    v-model="application.profile.family.collegeStudents"
                    disabled
                    class="form-control"
                    type="text"
                  />
                </div>
              </div>
              <h5
                class="text-center"
                style="font-weight: bold;"
              >School/Community: Activities/Sports, Honors, Leadership</h5>
              <hr />

              <div class="row d-none d-lg-flex table-labels">
                <label class="col-12 col-lg-3">Activity/Sport</label>
                <label class="col-12 col-lg-3">Honors/Prizes Received</label>
                <label class="col-12 col-lg-3">Leadership Roles (if any)</label>
                <label class="col-12 col-lg-2">Grade(s)</label>
                <div class="col-12 col-lg-1"></div>
              </div>
              <ActivitySport
                v-for="(activity, index) in application.profile.activities"
                :key="'activity-'+index"
                :activity="activity"
                :index="index"
                :donorView="true"
              />

              <h5 class="text-center" style="font-weight: bold;">Work Experience</h5>
              <hr />

              <div class="row d-none d-lg-flex table-labels">
                <label class="col-12 col-lg-3">Employer</label>
                <label class="col-12 col-lg-3">Position</label>
                <label class="col-12 col-lg-3">Leadership Roles (if any)</label>
                <label class="col-12 col-lg-2">Dates (from/to)</label>
                <div class="col-12 col-lg-1"></div>
              </div>
              <Job
                v-for="(job, index) in application.profile.work"
                :key="'job-'+index"
                :job="job"
                :index="index"
                :donorView="true"
              />
            </div>

            <div class="custom-questions mt-2" v-if="userData.scholarship.customQuestions">
              <h2 class="text-center font-weight-bold my-3">Answers to Your Custom Questions</h2>
              <div
                class="form-group mt-1"
                v-for="(question, index) in userData.scholarship.customQuestions"
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
                  v-model="application.customAnswers[index]"
                  disabled
                />
              </div>
            </div>
            <div class="requested-documents mt-4" v-if="application.applicationDocuments">
              <h2 class="text-center font-weight-bold my-3">Requested Documents</h2>
              <Document
                v-for="(document, index) in application.applicationDocuments"
                :key="index"
                :index="index"
                :document="document"
              />
              <div style="overflow: hidden;"></div>
            </div>
            <div class="additional-notes mt-4" v-if="application.additionalNotes">
              <h2 class="text-center font-weight-bold my-3">Additional Notes from the Student</h2>
              <textarea-autosize
                type="text"
                class="form-control"
                v-model="application.additionalNotes"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-1"></div>
    </div>
  </div>
</template>

<script>
import { db, auth, storage } from "@/firebase/init";
import { mapGetters } from "vuex";
import ActivitySport from "@/components/inputs/Activity_Sport";
import Job from "@/components/inputs/Job";
import Document from "@/components/Document";

export default {
  props: ["name"],
  name: "StudentApplication",
  components: { ActivitySport, Job, Document },
  data() {
    return {
      application: null
    };
  },
  computed: mapGetters(["userData"]),
  methods: {
    getSrc(path) {
      storage
        .ref(path)
        .getDownloadURL()
        .then(url => url);
    }
  },
  async created() {
    const docs = (
      await db
        .collection("scholarships")
        .doc(this.userData.scholarship.name)
        .collection("applications")
        .where("profile.name", "==", this.name)
        .get()
    ).docs;
    if (docs[0]) {
      this.application = docs[0].data();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.student-application {
  input,
  textarea {
    color: black !important;
  }
  .metadata {
    .filled {
      background: lighten($primary, 55);
      color: black;
    }
    label {
      color: $primary;
    }
  }
  .extended-data {
    .filled {
      background: lighten($secondary, 65);
      color: black;
    }
    label {
      color: $secondary;
    }
    .table-labels {
      text-decoration: underline;
    }
  }
  .checkbox {
    width: 18px;
    height: 18px;
    color: blue !important;
  }
  h2 {
    color: $primary;
  }
}
</style>