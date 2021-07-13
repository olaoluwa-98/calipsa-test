<template>
  <div class="d-flex align-items-center justify-content-center">
    <div v-if="loadingState !== 'success' && !ALARMS.doneInitialLoading">
      <b-spinner> </b-spinner>
    </div>
    <div v-else>
      <b-table
        responsive
        striped
        hover
        :items="ALARMS.data"
        @row-clicked="handleRowClick"
      >
        <template v-slot:cell(location)="data">
          <p>
            {{ data.value.name }}
          </p>
        </template>

        <template v-slot:cell(timestamp)="data">
          <p>
            {{ $utils.renderDate(data.value) }}
          </p>
        </template>
      </b-table>
      <b-pagination
        v-model="meta.page"
        :total-rows="meta.rowCount"
        :per-page="meta.pageSize"
        :disabled="loadingState === 'loading'"
        @change="handlePageChange"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import loadData from "@/mixins/load-data";

export default {
  name: "alarms",
  data() {
    return {
      fields: [
        "id",
        { key: "location", label: "Location" },
        "outcome",
        { key: "timestamp", label: "Timestamp" },
      ],
    };
  },
  mixins: [loadData],
  computed: {
    ...mapGetters("alarm", ["ALARMS"]),
  },
  methods: {
    ...mapActions("alarm", ["GET_ALARMS"]),
    handleRowClick(alarm) {
      this.$router.push(`/alarms/${alarm.id}`);
    },
    async handleLoadData() {
      const response = await this.GET_ALARMS(this.meta);
      this.meta = {
        ...this.meta,
        ...response.meta,
      };
    },

    async handlePageChange(page) {
      this.meta = { ...this.meta, page };
      await this.$_loadData();
    },
  },
  created() {
    this.$_loadData();
  },
};
</script>

<style lang="scss">
</style>
