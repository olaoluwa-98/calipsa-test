<template>
  <div class="d-flex align-items-center justify-content-center">
    <b-form @submit.prevent="$_submit" class="text-left mt-2 pt-2">
      <b-form-group
        :invalid-feedback="formErrors.username"
        :state="fieldState.username"
        label="Username"
      >
        <b-form-input
          id="username"
          autocomplete="off"
          v-model="form.username"
          :state="fieldState.username"
          required
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Password"
        :invalid-feedback="formErrors.password"
        :state="fieldState.password"
      >
        <b-form-input
          id="password"
          v-model.trim="form.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" @submit="$_submit" class="w-100">{{
        submitting ? "Logging In" : "Log In"
      }}</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { validateRequired } from "@/utils/validators";
import ValidationException from "@/api/exceptions/ValidationException";
import formManipulation from "@/mixins/form-manipulation";

export default {
  name: "login",
  data() {
    return {
      form: {
        username: null,
        password: null,
      },
      submitting: false,
    };
  },
  mixins: [formManipulation],
  computed: {
    ...mapGetters("auth", ["USER"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleSubmit() {
      await this.login(this.form);
      this.handleSuccess();
    },

    handleSuccess() {
      const { next } = this.$route.query;
      const { hash } = this.$route;
      const route =
        next != null && next != ""
          ? { path: `${next}${hash}` }
          : { name: "alarms" };
      this.$router.replace(route);
    },
    validateForm() {
      const { errors, valid } = validateRequired(this.form);
      if (valid === false) throw new ValidationException(errors);
    },
  },
};
</script>

<style lang="scss">
</style>
