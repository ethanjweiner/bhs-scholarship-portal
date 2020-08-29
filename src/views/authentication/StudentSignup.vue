<template>
  <div class="sign-up mx-auto mt-5">
    <div class="sign-up jumbotron px-5 py-4">
      <h1 class="text-center">Signup</h1>
      <form id="sign-in-form" @submit.prevent="signUp">
        <div class="form-group">
          <label for="student-name">Name</label>
          <input
            type="text"
            placeholder="Your name"
            class="form-control"
            id="student-name"
            v-model="form.newProfile.name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <p style="font-size: 13px;">Please sign up with your @mybps.me email address.</p>
          <input
            type="email"
            class="form-control"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="form.email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
            v-model="form.password"
          />
        </div>
        <hr />
        <div class="form-group">
          <label for="inputAddress">Home Address</label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St, Hyannis, MA 02601"
            v-model="form.newProfile.homeAddress"
          />
        </div>
        <hr />
        <div class="form-row">
          <div class="form-group col-sm-6">
            <label for="home-phone">Home Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="123-123-1234"
              id="home-phone"
              v-model="form.newProfile.homePhone"
            />
          </div>
          <div class="form-group col-sm-6">
            <label for="cell-phone">Cell Phone</label>
            <input
              type="text"
              class="form-control"
              placeholder="123-123-1234"
              id="cell-phone"
              v-model="form.newProfile.cellPhone"
            />
          </div>
        </div>
        <hr />

        <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>

        <button type="submit" class="btn shadow">Signup</button>
      </form>
    </div>
    <p
      class="px-2 text-secondary rounded bg-white"
      style="font-size: 15px;"
    >Please contact a school administrator to sign up as a donor or guidance counselor.</p>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import { mapActions } from "vuex";
export default {
  name: "StudentSignup",
  data() {
    return {
      form: {
        newProfile: {
          name: null,
          homeAddress: null,
          homePhone: null,
          cellPhone: null
        },
        email: null,
        password: null
      },
      feedback: null
    };
  },
  methods: {
    ...mapActions(["createStudent"]),
    async signUp() {
      const passwordRegex = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (
        this.form.email &&
        this.form.password &&
        passwordRegex.test(this.form.password)
      ) {
        this.feedback = null;
        try {
          if (!this.form.email.includes("@mybps.me")) {
            throw new Error("Please use your @mybps.me email address.");
          }
          await this.createStudent({
            form: this.form
          });
        } catch (err) {
          this.feedback = err.message;
        }
      } else {
        this.feedback =
          "Please enter a valid email & password. Password must be at least 8 characters & contain uppercase letter, a number, a symbol.";
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";

.sign-up {
  max-width: 600px;
  margin-top: 150px !important;

  h1 {
    @include big-font();
    color: $secondary;
  }
  label {
    color: $secondary;
  }
  button {
    color: white;
    background: $secondary;
    &:hover {
      color: white;
      background: lighten($secondary, 10);
    }
  }
  max-width: 600px;
}
</style>