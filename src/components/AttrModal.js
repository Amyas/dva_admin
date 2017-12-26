import React from "react";
import { Modal, Form, Input, Radio, Tag, Icon } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: ""
    };
  }
  triggerChange = changedValue => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  handleClose = removedTag => {
    const tags = this.props.value.filter(tag => tag !== removedTag);
    this.triggerChange(tags);
  };
  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = this.props.value || [];
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.triggerChange(tags);
    this.setState({
      inputVisible: false,
      inputValue: ""
    });
  };
  saveInputRef = input => (this.input = input);

  render() {
    const { inputVisible, inputValue } = this.state;
    const { value: tags } = this.props;
    return (
      <div>
        {tags &&
          tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                key={tag}
                closable={index !== -1}
                afterClose={() => this.handleClose(tag)}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: "#fff", borderStyle: "dashed" }}
          >
            <Icon type="plus" /> 添加属性
          </Tag>
        )}
      </div>
    );
  }
}

@Form.create()
export default class AttrModal extends React.Component {
  constructor(props) {
    super(props);
  }
  checkAttrList = (rule, value, callback) => {
    if (value && value.length) {
      callback();
      return;
    }
    callback("请添加商品属性！");
  };
  render() {
    const {
      modalProps,
      form: { getFieldDecorator, validateFields }
    } = this.props;
    const { onOk, item } = modalProps;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    const modalOpts = {
      ...modalProps,
      onOk: () => {
        validateFields((error, values) => {
          if (error) {
            return;
          }
          if (item.id) {
            values["id"] = item.id;
          }
          onOk(values);
        });
      }
    };

    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="属性类型" hasFeedback {...formItemLayout}>
            {getFieldDecorator("type", {
              initialValue: item.type,
              rules: [
                {
                  required: true,
                  message: "请选择属性类型"
                }
              ]
            })(
              <RadioGroup
                onChange={e => {
                  this.setState({ type: e.target.value });
                }}
              >
                <Radio value="radio">单选</Radio>
                <Radio value="check">多选</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem label="属性分类" hasFeedback {...formItemLayout}>
            {getFieldDecorator("classify", {
              initialValue: item.classify,
              rules: [
                {
                  required: true,
                  message: "请选择属性分类"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="属性列表" hasFeedback {...formItemLayout}>
            {getFieldDecorator("list", {
              initialValue: item.list,
              rules: [{ validator: this.checkAttrList }]
            })(<TagList />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
