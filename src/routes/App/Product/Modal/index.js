import React from "react";
import { connect } from "dva";
import UploadImg from "../../../../components/UploadImg";
import ProductAttr from '../../../../components/ProductAttr'
import {
  Form,
  Modal,
  Input,
  Button,
  Icon,
  message,
  InputNumber,
  Select,
  Row,
  Col
} from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

@connect(state => ({ product: state.product }))
@Form.create()
export default class Node extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: "product/queryClassifyList"
    });
  }
  handleOk = () => {
    const { form: { validateFields }, modalProps: { onOk } } = this.props;
    validateFields((error, values) => {
      if (error) {
        return;
      }
      onOk(values);
    });
  };
  checkImg = (rule, value, callback) => {
    if (value) {
      callback();
      return;
    }
    callback("请上传商品图片！");
  };
  render() {
    const {
      modalProps,
      form: { getFieldDecorator, validateFields, getFieldsValue },
      dispatch,
      product: { classifyList }
    } = this.props;
    const modalOpts = {
      ...modalProps,
      onOk: this.handleOk
    };
    const { item } = modalProps;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 }
    };
    return (
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          <FormItem label="商品名称" hasFeedback {...formItemLayout}>
            {getFieldDecorator("title", {
              initialValue: item.title,
              rules: [
                {
                  required: true,
                  message: "请输入商品名称！"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="价格" hasFeedback {...formItemLayout}>
            {getFieldDecorator("money", {
              initialValue: item.money,
              rules: [
                {
                  required: true,
                  message: "请输入商品价格！"
                }
              ]
            })(<InputNumber min={0} step={1} />)}
          </FormItem>
          <FormItem label="所属分类" hasFeedback {...formItemLayout}>
            {getFieldDecorator("type_id", {
              initialValue: item.type_id,
              rules: [
                {
                  required: true,
                  message: "请输入商品价格！"
                }
              ]
            })(
              <Select>
                {classifyList.map(v => (
                  <Option key={v.id} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="商品图片" hasFeedback {...formItemLayout}>
            {getFieldDecorator("img", {
              initialValue: item.img,
              rules: [{ validator: this.checkImg }]
            })(<UploadImg type={{ name: "banner", value: "1" }} />)}
          </FormItem>
          <FormItem label="描述" hasFeedback {...formItemLayout}>
            {getFieldDecorator("desc", {
              initialValue: item.desc,
              rules: [
                {
                  required: true,
                  message: "请输入商品描述！"
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label="详情" hasFeedback {...formItemLayout}>
            {getFieldDecorator("content", {
              initialValue: item.content,
              rules: [
                {
                  required: true,
                  message: "请输入商品详情！"
                }
              ]
            })(<TextArea rows={3} />)}
          </FormItem>
          <FormItem label="商品规格" hasFeedback {...formItemLayout}>
            {getFieldDecorator("guige", {
              initialValue: item.guige,
              rules: [
                {
                  required: true,
                  message: "请输入商品规格！"
                }
              ]
            })(
              <Select>
                {classifyList.map(v => (
                  <Option key={v.id} value={v.id}>
                    {v.name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem label="商品属性" hasFeedback {...formItemLayout}>
            {getFieldDecorator("attr", {
              initialValue: item.attr,
              rules: [
                {
                  required: true,
                  message: "请输入商品属性！"
                }
              ]
            })(<ProductAttr />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
