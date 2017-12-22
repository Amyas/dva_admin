import React from "react";
import { Modal, Form, Input, Radio } from "antd";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@Form.create()
export default class AttrModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "radio",
      list: []
    };
  }
  render() {
    const {
      modalProps,
      form: { getFieldDecorator, setFieldsValue }
    } = this.props;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    const modalOpts = {
      ...modalProps,
      onOk: () => {
        const { form: { validateFields }, modalProps: { onOk } } = this.props;
        validateFields((error, values) => {
          if (error) {
            return;
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
              initialValue: this.state.type,
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
          <FormItem label="属性名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator("name", {
              initialValue: this.state.name,
              rules: [
                {
                  required: true,
                  message: "请选择属性名称"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="属性名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator("name", {
              initialValue: this.state.list,
              rules: [
                {
                  required: true,
                  message: "请选择属性名称"
                }
              ]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
