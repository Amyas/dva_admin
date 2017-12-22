import * as productServers from "../../services/app/product";
export default {
  namespace: "product",
  state: {
    list: [],
    current_page: 1,
    total: null,
    modalVisible: false,
    currentItem: null,
    classifyList: []
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
    updateList(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
    updateClassify(state, { payload: classifyList }) {
      return {
        ...state,
        classifyList
      };
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      const { current_page, total, goods_info: list } = yield call(
        productServers.query,
        payload
      );
      yield put({
        type: "updateList",
        payload: {
          list,
          current_page,
          total
        }
      });
    },
    *addItem({ payload }, { call, put }) {
      yield call(productServers.addItem, payload);
      yield put({
        type: "query"
      });
      yield put({
        type: "hideModal"
      });
    },
    *editItem({ payload }, { call, put }) {
      yield call(productServers.editItem, payload);
      yield put({
        type: "query"
      });
      yield put({
        type: "hideModal"
      });
    },
    *delItem({ payload }, { call, put }) {
      yield call(productServers.delItem, payload);
      yield put({
        type: "query"
      });
    },
    *queryClassifyList({ payload }, { call, put }) {
      const classifyList = yield call(productServers.queryClassifyList);
      yield put({
        type: "updateClassify",
        payload: classifyList
      });
    }
  },
  subscriptions: {}
};
