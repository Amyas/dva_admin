import React from "react";
import { Button, Icon, List, Modal } from "antd";
import AttrModal from "./AttrModal";

export default class ProductAttr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      radioList: [],
      checkList: []
    };
  }
  render() {
    const { visible } = this.state;
    const modalProps = {
      title: "添加商品属性",
      visible: visible,
      onOk: (value) => {
        this.setState({
          visible: false
        });
      },
      onCancel: () => {
        this.setState({
          visible: false
        });
      }
    };
    return (
      <div>
        <Button
          type="dashed"
          onClick={() => {
            this.setState({
              visible: true
            });
          }}
        >
          <Icon type="plus" /> 添加商品属性
        </Button>

        {visible ? <AttrModal modalProps={modalProps} /> : null}
      </div>
    );
  }
}
