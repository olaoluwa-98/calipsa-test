export default {
  data() {
    return {
      loadingState: "idle",
      meta: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
      },
    };
  },

  methods: {
    async $_loadData() {
      this.loadingState = "loading";
      try {
        await this.handleLoadData();
        this.loadingState = "success";
      } catch (error) {
        if (error.name === "NetworkException") {
          this.loadingState = "error";
        } else if (error.name === "NotFoundException") {
          // TODO: ensure this doesn't cause issues with paginated loading and non-existing API endpoints
          this.$router.push({ path: "/404" });
        } else if (error.name === "NotAuthorizedException") {
          let route = "/login";
          if (error.data && error.data.redirect_route) {
            route = error.data.redirect_route;
          }
          this.$router
            .replace({
              path: route,
            })
            .catch(() => {});
          return;
        }

        if (this.handleLoadDataError) {
          this.handleLoadDataError(error);
        }
        if (!["NotFoundException", "NetworkException"].includes(error.name))
          throw error;
      }
    },
  },
};
