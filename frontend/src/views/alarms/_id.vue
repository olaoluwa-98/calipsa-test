<template>
  <div class="d-flex align-items-center justify-content-center">
    <div v-if="loadingState !== 'success'">
      <b-spinner> </b-spinner>
    </div>
    <div v-else>
      <p>
        id: <strong>{{ alarm.id }}</strong>
      </p>
      <p>
        location: <strong>{{ alarm.location.name }}</strong>
      </p>
      <p>
        outcome: <strong>{{ alarm.outcome }}</strong>
      </p>
      <p>
        timestamp : <strong>{{ $utils.renderDate(alarm.timestamp) }}</strong>
      </p>
    </div>
    <div>
      <router-link to="/alarms">Go back</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import loadData from "@/mixins/load-data";

export default {
  name: "alarm",
  data() {
    return {};
  },
  mixins: [loadData],
  computed: {
    ...mapGetters("alarm", ["ALARM"]),
    alarm() {
      return this.ALARM[this.$route.params.id] || { location: {} };
    },
  },
  methods: {
    ...mapActions("alarm", ["GET_ALARM"]),
    async handleLoadData() {
      await this.GET_ALARM(this.$route.params.id);
      console.log(this.ALARM);
    },
  },
  async created() {
    await this.$_loadData();
  },
};
</script>

<style lang="scss">
</style>
