import * as orderServers from "../../services/app/orders";
export default {
  namespace: "orders",
  state: {
    list: [],
    total: 0,
    page: 1
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { goods_info, current_page, total } = yield call(orderServers.query, payload);
      yield put({
        type: "updateState",
        payload: {
          list: goods_info,
          page: current_page,
          total
        }
      });
    },
  },
  subscriptions: {}
};
