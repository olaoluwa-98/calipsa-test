import { checkFormErrors } from "@/utils/validators";
export default {
  data() {
    return {
      formErrors: {},
      submitting: false,
    };
  },
  computed: {
    fieldState() {
      return checkFormErrors(this.formErrors);
    },
  },
  methods: {
    async $_submit(event) {
      if (event) event.preventDefault();
      this.submitting = true;
      try {
        if (this.validateForm) {
          this.validateForm();
        }
        await this.handleSubmit();
      } catch (error) {
        if (error.name === "ValidationException") this.formErrors = error.data;
        if (this.handleSubmitError) {
          this.handleSubmitError(error);
        } else if (
          !["BadRequestException", "ValidationException"].includes(error.name)
        ) {
          throw error;
        }
      } finally {
        this.submitting = false;
      }
    },
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.formErrors = {};
      },
    },
  },
};
