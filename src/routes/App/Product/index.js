import React from "react";
import { connect } from "dva";
import { Button, Popconfirm, Avatar } from "antd";

import List from "./List";
import Modal from "./Modal";

@connect(state => ({
  loading: state.loading.global,
  product: state.product
}))
export default class Product extends React.Component {
  state = {};
  componentWillMount() {
    const { dispatch, product: { current_page: page } } = this.props;
    dispatch({
      type: "product/query",
      payload: {
        page
      }
    });
  }
  createItem() {
    const { dispatch } = this.props;
    dispatch({
      type: "product/showModal"
    });
  }
  render() {
    const {
      dispatch,
      product: { list, modalVisible, currentItem },
      loading
    } = this.props;
    // 弹框参数
    // -----------------------------
    const modalProps = {
      title: currentItem ? "编辑产品" : "创建产品",
      item: currentItem || {},
      visible: modalVisible,
      loading: loading,
      onOk: data => {
        let isEdit = "add";
        if (currentItem && currentItem.id) {
          data.type_id = currentItem.id;
          isEdit = "edit";
        }
        dispatch({
          type: `product/${isEdit}Item`,
          payload: data
        });
      },
      onCancel: () => {
        dispatch({
          type: "product/hideModal"
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
          title: "名称",
          dataIndex: "title"
        },
        {
          title: "图片",
          dataIndex: "img",
          render: text => <Avatar src={text} />
        },
        {
          title: "描述",
          dataIndex: "desc"
        },
        {
          title: "价格",
          dataIndex: "money"
        },
        {
          title: "所属分类",
          dataIndex: "type_name"
        },
        {
          title: "商品规格",
          dataIndex: "guige"
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
                    type: "product/showModal",
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
                    type: "product/delClassify",
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
        <Button type="primary" onClick={this.createItem.bind(this)}>
          创建产品
        </Button>
        {modalVisible && <Modal modalProps={modalProps} />}
        <List {...listProps} />
      </div>
    );
  }
}
