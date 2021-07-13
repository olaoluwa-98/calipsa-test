import * as ENDPOINTS from "@/api/endpoints";

const initialState = () => {
  return {
    alarms: {
      data: [],
      meta: {
        page: 1,
        pageSize: 10,
        rowCount: 0,
        pageCount: 1,
      },
      doneInitialLoading: false,
    },
    alarm: {},
  };
};

const state = () => initialState();

const getters = {
  ALARMS: (state) => state.alarms,
  ALARM: (state) => state.alarm,
};

const mutations = {
  SET_ALARMS_MUTATION(state, { data, meta }) {
    state.alarms = {
      data: [...state.alarms.data, ...data],
      meta: { ...state.alarms.meta, ...meta },
      doneInitialLoading: true,
    };
  },
  SET_ALARM_MUTATION(state, data) {
    const current = state.alarm;
    state.alarm = { ...current, [data.id]: data };
  },
  RESET_STATE(state) {
    Object.assign(state, initialState());
  },
};

const actions = {
  async SET_ALARMS({ commit }, alarms) {
    commit("SET_ALARMS_MUTATION", alarms);
  },

  async GET_ALARM({ commit }, id) {
    const { data: alarm } = await this._vm.$api.get(ENDPOINTS.ALARM(id));
    commit("SET_ALARM_MUTATION", alarm);
    return alarm;
  },

  async GET_ALARMS({ commit, getters }, filters) {
    if (getters.ALARMS.doneInitialLoading) {
      return;
    }

    const alarms = await this._vm.$api.get(ENDPOINTS.ALARMS, filters);
    commit("SET_ALARMS_MUTATION", alarms);
    return alarms;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
