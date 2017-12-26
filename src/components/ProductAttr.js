import React from "react";
import { Button, Icon, List, Modal, Card, Tag, Popconfirm } from "antd";
import AttrModal from "./AttrModal";

export default class ProductAttr extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: "添加商品属性",
      item: {
        type: "radio",
        classify: "",
        list: null
      }
    };
  }
  triggerChange = changedValue => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    const { visible, title, item } = this.state;
    let { value: list } = this.props;
    list = list ? JSON.parse(list) : null;
    const modalProps = {
      title: title,
      visible: visible,
      item: item,
      onOk: value => {
        if (value.id) {
          const nowItem = list.filter((v, i) => v.id === value.id)[0];
          const nowIndex = list.indexOf(nowItem);
          list.splice(nowIndex, 1, value);
          this.triggerChange(JSON.stringify(list));
        } else {
          value["id"] = (list && list.length + 1) || "1";
          this.triggerChange(
            JSON.stringify((list && list.concat(value)) || [value])
          );
        }
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
              visible: true,
              title: "添加商品属性",
              item: {
                type: "radio",
                classify: "",
                list: null
              }
            });
          }}
        >
          <Icon type="plus" /> 添加商品属性
        </Button>
        {list &&
          list.map((v, i) => (
            <Card
              style={{ marginBottom: 10 }}
              key={i}
              title={v.classify}
              extra={
                <span>
                  <a
                    href="javascript:;"
                    onClick={() => {
                      this.setState({
                        visible: true,
                        item: v
                      });
                    }}
                  >
                    编辑
                  </a>
                  <span>&nbsp;|&nbsp;</span>
                  <Popconfirm
                    title="确定删除?"
                    onConfirm={e => {
                      const nowIndex = list.indexOf(v);
                      list.splice(nowIndex, 1);
                      this.triggerChange(
                        list.length ? JSON.stringify(list) : null
                      );
                    }}
                  >
                    <a href="javascript:;">删除</a>
                  </Popconfirm>
                </span>
              }
            >
              {v.list.map((e, j) => (
                <span key={j}>{e}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              ))}
            </Card>
          ))}
        {visible ? <AttrModal modalProps={modalProps} /> : null}
      </div>
    );
  }
}
