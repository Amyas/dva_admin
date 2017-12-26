import * as productServers from "../../services/app/product";
export default {
  namespace: "product",
  state: {
    list: [],
    current_page: 1,
    total: null,
    modalVisible: false,
    currentItem: null, //当前元素
    classifyList: [], //分类列表
    guigeList: [] //规格列表
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
    },
    updateGuige(state, { payload: guigeList }) {
      return {
        ...state,
        guigeList
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
    },
    *queryGuigeList({ payload }, { call, put }) {
      const guigeList = yield call(productServers.queryGuigeList);
      yield put({
        type: "updateGuige",
        payload: guigeList
      });
    }
  },
  subscriptions: {}
};
