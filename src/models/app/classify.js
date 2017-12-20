import * as classifyServers from "../../services/app/classify";
export default {
  namespace: "classify",
  state: {
    list: [],
    modalVisible: false,
    currentItem: null
  },
  reducers: {
    showModal(state, { payload }) {
      let currentItem = null;
      if (payload) {
        currentItem = payload.currentItem;
      }
      return {
        ...state,
        modalVisible: true,
        currentItem
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalVisible: false
      };
    },
    updateList(state, { payload: { list } }) {
      return {
        ...state,
        list
      };
    }
  },
  effects: {
    *query(payload, { call, put }) {
      const data = yield call(classifyServers.query);
      yield put({
        type: "updateList",
        payload: {
          list: data
        }
      });
    },
    *addClassify({ payload }, { call, put }) {
      yield call(classifyServers.addClassify, payload);
      yield put({
        type: "query"
      });
      yield put({
        type: "hideModal"
      });
    },
    *editClassify({ payload }, { call, put }) {
      yield call(classifyServers.editClassify, payload);
      yield put({
        type: "query"
      });
      yield put({
        type: "hideModal"
      });
    },
    *delClassify({ payload }, { call, put }) {
      console.log(payload);
      yield call(classifyServers.delClassify, payload);
      yield put({
        type: "query"
      });
    }
  },
  subscriptions: {}
};
