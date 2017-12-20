import * as LoginServers from "../../services/auth/login";
export default {
  namespace: "login",
  state: {
    user: null
  },
  reducers: {
    updateAuth(state, { payload: { user } }) {
      window.localStorage.setItem("user", JSON.stringify(user));
      return {
        ...state,
        user
      };
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(LoginServers.login, payload);
      yield put({
        type: "updateAuth",
        payload: { user: data }
      });
    }
  }
};
