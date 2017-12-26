import React from "react";
import { connect } from "dva";
import { Button, Popconfirm } from "antd";

import List from "./List";
import Modal from "./Modal";

@connect(state => ({
  loading: state.loading.global,
  classify: state.classify
}))
export default class Classify extends React.Component {
  state = {};
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "classify/query"
    });
  }
  //创建分类
  createClassify() {
    const { dispatch } = this.props;
    dispatch({
      type: "classify/showModal"
    });
  }
  render() {
    const {
      dispatch,
      classify: { list, modalVisible, currentItem },
      loading
    } = this.props;
    // 弹框参数
    // -----------------------------
    const modalProps = {
      title: currentItem ? "编辑分类" : "创建分类",
      item: currentItem || {},
      visible: modalVisible,
      onOk: data => {
        let isEdit = "add";
        if (currentItem && currentItem.id) {
          data.type_id = currentItem.id;
          isEdit = "edit";
        }
        dispatch({
          type: `classify/${isEdit}Item`,
          payload: data
        });
      },
      onCancel: () => {
        dispatch({
          type: "classify/hideModal"
        });
      }
    };

    // 列表参数
    // -----------------------------
    const listProps = {
      data: list,
      loading: loading,
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "分类名称",
          dataIndex: "name"
        },
        {
          title: "操作",
          width: "150px",
          render: (text, record) => (
            <span>
              <a
                href="javascript:;"
                onClick={() => {
                  dispatch({
                    type: "classify/showModal",
                    payload: {
                      currentItem: record
                    }
                  });
                }}
              >
                编辑
              </a>
              <span>&nbsp;|&nbsp;</span>
              <Popconfirm
                title="确定删除?"
                onConfirm={e => {
                  dispatch({
                    type: "classify/delItem",
                    payload: {
                      type_id: record.id
                    }
                  });
                }}
              >
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          )
        }
      ]
    };

    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 24 }}
          onClick={this.createClassify.bind(this)}
        >
          创建分类
        </Button>
        {modalVisible && <Modal modalProps={modalProps} />}
        <List {...listProps} />
      </div>
    );
  }
}
