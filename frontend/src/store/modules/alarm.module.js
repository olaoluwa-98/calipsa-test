import * as ENDPOINTS from "@/api/endpoints";

const initialState = () => {
  return {
    alarms: {
      data: {},
      meta: {
        page: 1,
        pageSize: 10,
        rowCount: 0,
        pageCount: 1,
      },
      doneInitialLoading: false,
    },
  };
};

const state = () => initialState();

const getters = {
  ALARMS: (state) => state.alarms,
};

const mutations = {
  SET_ALARMS_MUTATION(state, { data, meta }) {
    state.alarms = {
      data: { ...state.alarms.data },
      meta: { ...state.alarms.meta },
      doneInitialLoading: true,
    };
  },
  RESET_STATE(state) {
    Object.assign(state, initialState());
  },
};

const actions = {
  async SET_ALARMS({ commit }, alarms) {
    commit("SET_ALARMS_MUTATION", alarms);
  },

  async GET_ALARMS({ commit, getters }) {
    if (getters.ALARMS.doneInitialLoading) {
      return;
    }

    const alarms = await this._vm.$api.get(ENDPOINTS.ALARMS);
    commit("SET_ALARMS_MUTATION", alarms);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
