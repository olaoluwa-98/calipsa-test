import app from "@/main";
import { LOGIN } from "@/api/endpoints";
import { LOGIN as loginRoute } from "@/router/routes";

const state = {
  user: {},
};

const getters = {
  USER: (state) => state.user,
};

const mutations = {
  SET_USER_MUTATION(state, data) {
    state.user = { ...state.user, ...data };
  },
};

const actions = {
  async authenticateUser({ commit }, { token, user }) {
    commit("SET_USER_MUTATION", user);
    this._vm.$api.setToken(token);
    localStorage.setItem("authToken", token);
  },

  async GET_USER({ commit }) {
    const user = await this._vm.$api.get(ENDPOINTS.USER);
    commit("SET_USER_MUTATION", user);
  },

  async login({ dispatch, commit }, payload) {
    const { user, token } = await this._vm.$api.post(LOGIN, payload);
    await dispatch("authenticateUser", { token, user });
  },

  async logout({ dispatch }) {
    localStorage.removeItem("authToken");
    this._vm.$api.deleteToken();
    dispatch("RESET_STATE");
    app.$router.replace({ path: loginRoute });
  },

  RESET_STATE({ commit }) {
    commit("alarms/RESET_STATE", {}, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
