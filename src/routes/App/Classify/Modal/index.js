import React from "react";
import { Form, Modal, Input, Button } from "antd";
const FormItem = Form.Item;

function Node({
  modalProps,
  form: { getFieldDecorator, validateFields, getFieldsValue }
}) {
  const { onOk, item } = modalProps;
  const handleOk = () => {
    validateFields((error, values) => {
      if (error) {
        return;
      }
      onOk(values);
    });
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk
  };
  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="分类名称" hasFeedback>
          {getFieldDecorator("name", {
            initialValue: item.name,
            rules: [
              {
                required: true,
                message: "请输入分类名称！"
              }
            ]
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  );
}
export default Form.create()(Node);
