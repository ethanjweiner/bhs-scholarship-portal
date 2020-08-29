<template>
  <div class="sign-up mx-auto mt-5">
    <div class="sign-up jumbotron px-5 py-4">
      <h1 class="text-center">Signup</h1>
      <form v-if="!verified" @submit.prevent="verify">
        <p>Enter the password for guidance counselors to continue</p>
        <div class="form-group">
          <input type="password" class="form-control" v-model="verifyKey" />
        </div>
        <button class="btn" type="submit">Enter</button>
      </form>
      <form v-if="verified" id="sign-in-form" @submit.prevent="signUp">
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
        </div>

        <p class="text-danger mt-3" v-if="feedback">{{ feedback }}</p>

        <button type="submit" class="btn shadow">Signup</button>
      </form>
    </div>
  </div>
</template>

<script>
import { db, auth } from "@/firebase/init";
import { mapActions } from "vuex";
export default {
  name: "GCSignup",
  data() {
    return {
      verified: false,
      verifyKey: null,
      form: {
        email: null,
        password: null
      },
      feedback: null
    };
  },
  methods: {
    verify() {
      if (this.verifyKey === "xak8adf86f") {
        this.verified = true;
      }
    },
    ...mapActions(["createGC"]),
    async signUp() {
      const passwordRegex = /^^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (
        this.form.email &&
        this.form.password &&
        passwordRegex.test(this.form.password)
      ) {
        this.feedback = null;
        try {
          await this.createGC({
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