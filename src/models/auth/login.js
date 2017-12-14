export default {
  namespace: "login",
  state: {
    user: null
  },
  reducers: {
    login(state, { payload: user }) {
      window.localStorage.setItem("user", user);
      return {
        ...state,
        user
      };
    }
  },
  effects: {}
};
