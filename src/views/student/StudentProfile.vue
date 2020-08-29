<template>
  <div class="student-profile">
    <div class="heading p-4 rounded">
      <h1 class="text-center">
        Your Profile
        <span class="material-icons">school</span>
      </h1>
    </div>
    <form class="px-5 py-4 mx-auto" style="margin-bottom: 150px;" @input="() => { saved = false }">
      <div class="metadata">
        <div class="form-group">
          <label for="student-name">Name</label>
          <input
            type="text"
            placeholder="Your name"
            class="form-control"
            :class="{filled : newUserProfile.name}"
            id="student-name"
            v-model="newUserProfile.name"
          />
        </div>
        <div class="form-group">
          <label for="inputAddress">Home Address</label>
          <input
            v-model="newUserProfile.homeAddress"
            :class="{filled : newUserProfile.homeAddress}"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St, Hyannis, MA 02601"
          />
        </div>
        <div class="form-row">
          <div class="form-group col-sm-6">
            <label for="home-phone">Home Phone</label>
            <input
              v-model="newUserProfile.homePhone"
              :class="{filled : newUserProfile.homePhone}"
              type="text"
              class="form-control"
              placeholder="123-123-1234"
              id="home-phone"
            />
          </div>
          <div class="form-group col-sm-6">
            <label for="cell-phone">Cell Phone</label>
            <input
              v-model="newUserProfile.cellPhone"
              :class="{filled : newUserProfile.cellPhone}"
              type="text"
              class="form-control"
              placeholder="123-123-1234"
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
              v-model="newUserProfile.birthDate"
              :class="{filled : newUserProfile.birthDate}"
              type="date"
              class="form-control"
              id="birth-date"
            />
          </div>
          <div class="form-group col-sm-6">
            <label for="birth-city">Birth City</label>
            <input
              v-model="newUserProfile.birthCity"
              :class="{filled : newUserProfile.birthCity}"
              type="text"
              class="form-control"
              placeholder="Your birth city"
              id="birth-city"
            />
          </div>
        </div>
        <h5 class="text-center" style="font-weight: bold;">Academics</h5>

        <div class="form-row">
          <div class="form-group col-sm-6 col-md-3">
            <label for="gpa">Weighted GPA</label>
            <input
              v-model="newUserProfile.gpa"
              :class="{filled : newUserProfile.gpa}"
              type="text"
              class="form-control"
              placeholder="Your GPA"
              id="gpa"
            />
          </div>
          <div class="form-group col-sm-6 col-md-3">
            <label for="decile-rank">Decile Rank</label>
            <input
              v-model="newUserProfile.decileRank"
              :class="{filled : newUserProfile.decileRank}"
              type="text"
              class="form-control"
              placeholder="Your decile rank"
              id="decile-rank"
            />
          </div>
          <div class="form-group col-sm-6 col-md-3">
            <label for="sat">SAT Total (/1600)</label>
            <input
              v-model="newUserProfile.sat"
              :class="{filled : newUserProfile.sat}"
              type="text"
              class="form-control"
              placeholder="Your score"
              id="sat"
            />
          </div>
          <div class="form-group col-sm-6 col-md-3">
            <label for="act">ACT Composite (/36)</label>
            <input
              v-model="newUserProfile.act"
              :class="{filled : newUserProfile.act}"
              type="text"
              class="form-control"
              id="act"
              placeholder="Your score"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="major">Anticipated Major</label>
          <input
            class="form-control"
            type="text"
            id="major"
            v-model="newUserProfile.major"
            :class="{filled : newUserProfile.major}"
          />
        </div>
        <div class="form-group">
          <label for="plans">What are your plans after college?</label>
          <textarea-autosize
            :max-height="350"
            v-model="newUserProfile.plans"
            :class="{filled : newUserProfile.plans}"
            type="text"
            class="form-control"
            id="plans"
          />
        </div>
        <div class="form-group">
          <label for="applied-colleges">Names of colleges to which you have applied:</label>
          <textarea-autosize
            :max-height="350"
            v-model="newUserProfile.colleges.appliedColleges"
            :class="{filled : newUserProfile.colleges.appliedColleges}"
            type="text"
            class="form-control"
            id="applied-colleges"
          />
        </div>
        <div class="form-group">
          <label for="accepted-colleges">Names of colleges to which you have been accepted:</label>
          <p style="font-size: 13px;">You can always update this later!</p>
          <textarea-autosize
            :max-height="350"
            v-model="newUserProfile.colleges.acceptedColleges"
            :class="{filled : newUserProfile.colleges.acceptedColleges}"
            type="text"
            class="form-control"
            id="accepted-colleges"
          />
        </div>
        <div class="form-group">
          <label for="top-colleges">Please indicate your first three college choices:</label>
          <textarea-autosize
            :max-height="100"
            v-model="newUserProfile.colleges.topCollegeChoices"
            :class="{filled : newUserProfile.colleges.topCollegeChoices}"
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
              v-model="newUserProfile.financial.estimatedParentalContribution"
              :class="{filled : newUserProfile.financial.estimatedParentalContribution}"
              class="form-control"
              type="text"
              placeholder="Your parents' contribution"
            />
          </div>
          <div class="form-group col-12 col-lg-6">
            <label
              for="estimated-student-contribution"
            >Estimated Student Contribution (Your savings & earnings) ($):</label>
            <input
              id="estimated-student-contribution"
              v-model="newUserProfile.financial.estimatedStudentContribution"
              :class="{filled : newUserProfile.financial.estimatedStudentContribution}"
              class="form-control"
              type="text"
              placeholder="Your contribution"
            />
          </div>
          <div class="form-group col-12 col-lg-6">
            <label for="other-aid">Other known financial aid (grants/awards/scholarships) ($):</label>
            <input
              id="other-aid"
              v-model="newUserProfile.financial.otherAid"
              :class="{filled : newUserProfile.financial.otherAid}"
              class="form-control"
              type="text"
              placeholder="Other aid (not including loans)"
            />
          </div>
          <div class="form-group col-12 col-lg-6">
            <label for="financial-need">Total Anticipated Financial Need (for this School Year) ($):</label>
            <input
              id="financial-need"
              v-model="newUserProfile.financial.financialNeed"
              :class="{filled : newUserProfile.financial.financialNeed}"
              class="form-control"
              type="text"
              placeholder="Anticipated financial need"
            />
          </div>
          <div class="form-group col-12">
            <label for="fasfa" class="mr-2">Check here if you have completed the FASFA:</label>
            <input
              id="fasfa"
              v-model="newUserProfile.financial.FASFA"
              :class="{filled : newUserProfile.financial.FASFA}"
              type="checkbox"
              class="checkbox"
            />
          </div>
          <div class="form-group col-12">
            <label for="debt">Total amount of money student owes to persons/organizations ($):</label>
            <input
              id="debt"
              v-model="newUserProfile.financial.debt"
              :class="{filled : newUserProfile.financial.debt}"
              class="form-control"
              type="text"
              placeholder="Total owed"
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
              v-model="newUserProfile.financialEssay"
              :class="{filled : newUserProfile.financialEssay}"
              class="form-control"
              type="text"
              placeholder="Your financial need statement"
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
              v-model="newUserProfile.family.father.name"
              :class="{filled : newUserProfile.family.father.name}"
              class="form-control"
              type="text"
              placeholder="Father/guardian's name"
            />
          </div>
          <div class="form-group col-12">
            <label for="father-address">Father's or Guardian's Address:</label>
            <input
              id="father-address"
              ref="fatherAddress"
              v-model="newUserProfile.family.father.address"
              :class="{filled : newUserProfile.family.father.address}"
              class="form-control"
              type="text"
              placeholder="Father/guardian's address"
            />
          </div>
          <div class="form-group col-12">
            <label
              for="father-address-checkbox"
              class="mr-2 font-italic"
              style="font-size: 15px;"
            >Check here if your father's address is the same as yours:</label>
            <input
              id="father-address-checkbox"
              type="checkbox"
              class="checkbox"
              @input="toggleAddress($event)"
            />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="father-occupation">Father's or Guardian's Occupation:</label>
            <input
              id="father-occupation"
              v-model="newUserProfile.family.father.occupation"
              :class="{filled : newUserProfile.family.father.occupation}"
              class="form-control"
              type="text"
              placeholder="Father/guardian's occupation"
            />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="father-employer">Employed by:</label>
            <input
              id="father-employer"
              v-model="newUserProfile.family.father.employer"
              :class="{filled : newUserProfile.family.father.employer}"
              class="form-control"
              type="text"
              placeholder="Father/guardian's employer"
            />
          </div>
          <h6 style="font-weight: bold; text-decoration: underline">Mother/Guardian</h6>
          <div class="form-group col-12">
            <label for="mother-name">Mother's or Guardian's Name:</label>
            <input
              id="mother-name"
              v-model="newUserProfile.family.mother.name"
              :class="{filled : newUserProfile.family.mother.name}"
              class="form-control"
              type="text"
              placeholder="Mother/guardian's name"
            />
          </div>
          <div class="form-group col-12">
            <label for="mother-address">Mother's or Guardian's Address:</label>
            <input
              ref="motherAddress"
              id="mother-address"
              v-model="newUserProfile.family.mother.address"
              :class="{filled : newUserProfile.family.mother.address}"
              class="form-control"
              type="text"
              placeholder="Mother/guardian's address"
            />
          </div>
          <div class="form-group col-12">
            <label
              for="mother-address-checkbox"
              class="mr-2 font-italic"
              style="font-size: 15px;"
            >Check here if your mother's address is the same as yours:</label>
            <input
              id="mother-address-checkbox"
              type="checkbox"
              class="checkbox"
              @input="toggleAddress($event)"
            />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="mother-occupation">Mother's or Guardian's Occupation:</label>
            <input
              id="mother-occupation"
              v-model="newUserProfile.family.mother.occupation"
              :class="{filled : newUserProfile.family.mother.occupation}"
              class="form-control"
              type="text"
              placeholder="Mother/guardian's occupation"
            />
          </div>
          <div class="form-group col-12 col-sm-6">
            <label for="mother-employer">Employed by:</label>
            <input
              id="mother-employer"
              v-model="newUserProfile.family.mother.employer"
              :class="{filled : newUserProfile.family.mother.employer}"
              class="form-control"
              type="text"
              placeholder="Mother/guardian's employer"
            />
          </div>
          <div class="form-group col-12">
            <label
              for="dependents"
            >Total number of dependents in family (including yourself & parents):</label>
            <input
              id="dependents"
              v-model="newUserProfile.family.dependents"
              :class="{filled : newUserProfile.family.dependents}"
              class="form-control"
              type="text"
              placeholder="Number of family members"
            />
          </div>
          <div class="form-group col-12">
            <label
              for="college-students"
            >List family members that are currently attending college full time (include their name, age, & relationship to you):</label>
            <textarea-autosize
              id="college-students"
              :max-height="200"
              v-model="newUserProfile.family.collegeStudents"
              :class="{filled : newUserProfile.family.collegeStudents}"
              class="form-control"
              type="text"
              placeholder="Family members attending college"
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
          v-for="(activity, index) in newUserProfile.activities"
          :key="'activity-'+index"
          :activity="activity"
          :index="index"
          @on-remove="deleteActivity({index})"
        />
        <button class="btn mt-2 main-button" @click.prevent="addActivity()">+ Add Activity</button>

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
          v-for="(job, index) in newUserProfile.work"
          :key="'job-'+index"
          :job="job"
          :index="index"
          @on-remove="deleteJob({index})"
        />
        <button class="btn mt-2 main-button" @click.prevent="addJob()">+ Add Job</button>
      </div>
    </form>
    <div class="fixed-bottom save-changes-container px-5 py-4 d-flex">
      <div v-if="saved">
        <p class="text-success mr-2 d-inline">Your profile is saved.</p>
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
import { mapGetters, mapActions } from "vuex";
import ActivitySport from "@/components/inputs/Activity_Sport";
import Job from "@/components/inputs/Job";

export default {
  name: "Student-Profile",
  components: { ActivitySport, Job },
  data() {
    return {
      saved: true,
      newUserProfile: {
        name: null,
        email: null,
        birthDate: null,
        birthCity: null,
        homeAddress: null,
        homePhone: null,
        cellPhone: null,
        gpa: null,
        decileRank: null,
        sat: null,
        act: null,
        plans: null,
        major: null,
        colleges: {
          appliedColleges: null,
          acceptedColleges: null,
          topCollegeChoices: null,
          attendingCollege: null
        },
        financial: {
          estimatedParentalContribution: null,
          estimatedStudentContribution: null,
          otherAid: null,
          financialNeed: null,
          FASFA: null,
          debt: null
        },
        family: {
          father: {
            name: null,
            address: null,
            occupation: null,
            employer: null
          },
          mother: {
            name: null,
            address: null,
            occupation: null,
            employer: null
          },
          dependents: null,
          collegeStudents: null
        },
        activities: [],
        work: [],
        financialEssay: null
      }
    };
  },
  computed: mapGetters(["userData"]),
  methods: {
    ...mapActions(["updateProfile"]),
    async save() {
      await this.updateProfile({ profile: this.newUserProfile });
      this.saved = true;
    },
    addActivity() {
      this.newUserProfile.activities.push({
        name: null,
        honors: null,
        leadership: null,
        grades: null
      });
    },
    deleteActivity({ index }) {
      this.newUserProfile.activities.splice(index, 1);
    },
    addJob() {
      this.newUserProfile.work.push({
        employer: null,
        position: null,
        leadership: null,
        dates: null
      });
    },
    deleteJob({ index }) {
      this.newUserProfile.work.splice(index, 1);
    },
    toggleAddress(e) {
      const isFather = e.target.id === "father-address-checkbox";
      const isMother = e.target.id === "mother-address-checkbox";

      if (e.target.checked) {
        if (isFather) {
          this.newUserProfile.family.father.address = this.newUserProfile.homeAddress;
        } else if (isMother) {
          this.newUserProfile.family.mother.address = this.newUserProfile.homeAddress;
        }
      } else {
        if (isFather) {
          this.newUserProfile.family.father.address = null;
        } else if (isMother) {
          this.newUserProfile.family.mother.address = null;
        }
      }
    }
  },
  created() {
    if (this.userData) {
      this.newUserProfile = this.userData.profile;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.saved) {
      alert(
        "Make sure to save your changes first so your student profile is up to date!"
      );
    } else {
      next();
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";
.student-profile {
  .save-changes-container {
    background: rgb(214, 214, 214);
    border-top: 2px solid $secondary;
  }
  form {
    max-width: 1250px;
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
  }
  .main-button {
    color: white;
    background: $secondary;
    &:hover {
      color: white;
      background: lighten($secondary, 10);
    }
  }
}
</style>