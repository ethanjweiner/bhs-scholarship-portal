<template>
  <div class="sign-in mx-auto mt-5">
    <div class="jumbotron px-5 py-4 mx-auto">
      <h1 class="text-center">Login</h1>
      <form id="sign-in-form" @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email address</label>
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
          <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>
        </div>
        <button type="submit" class="btn btn-danger shadow">Login</button>
      </form>
      <div class="row mt-3">
        <div class="col-8 d-inline">
          <router-link :to="{name: 'Student-Signup'}">
            <a class="sign-up-link">New? Create a student account here.</a>
          </router-link>
        </div>
        <div class="col-4 text-right">
          <a
            class="forgot-password-link"
            data-toggle="modal"
            data-target="#forgotPasswordModal"
          >Forgot password?</a>
        </div>
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="forgotPasswordModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="forgotPasswordModal"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="forgotPasswordModalLabel">Reset Password</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="resetPassword">
                <label for="email">Email</label>
                <input
                  class="form-control"
                  type="text"
                  placeholder="Your email address"
                  id="email"
                  v-model="resetEmail"
                />
                <button
                  type="submit"
                  class="mt-2 btn btn-danger form-control"
                >Send Password Reset Email</button>
              </form>
              <p v-if="errorMsg" class="text-danger mt-2 text-center">{{errorMsg}}</p>

              <p
                v-if="success"
                class="text-success mt-2 text-center"
              >Password reset email has been sent</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p
      class="px-2 text-secondary rounded bg-white"
      style="font-size: 15px;"
    >Please contact a school administrator to sign up as a donor or guidance counselor.</p>
  </div>
</template>

<script>
import { auth } from "@/firebase/init";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      feedback: null,
      resetEmail: null,
      errorMsg: null,
      success: false
    };
  },
  methods: {
    ...mapActions(["signIn"]),
    async login() {
      if (this.form.email && this.form.password) {
        this.feedback = null;
        try {
          await this.signIn(this.form);
        } catch (err) {
          this.feedback = err.message;
        }
      } else {
        this.feedback = "Please enter an email & password";
      }
    },
    async resetPassword() {
      this.success = false;
      this.errorMsg = null;
      try {
        await auth.sendPasswordResetEmail(this.resetEmail);
        this.success = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/app";

.sign-in {
  height: 80%;
  h1 {
    @include big-font();
    color: $primary;
  }
  label {
    color: $primary;
  }
  .forgot-password-link {
    cursor: pointer;
    color: $secondary;
    &:hover {
      text-decoration: none;
      color: lighten($secondary, 20);
    }
  }
  .sign-up-link {
    text-decoration: underline;
    cursor: pointer;
    color: $primary;
    &:hover {
      color: lighten($primary, 20);
    }
  }
  max-width: 600px;
}
</style>