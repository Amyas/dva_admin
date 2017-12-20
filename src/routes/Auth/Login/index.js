import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import styles from "./styles.less";
import md5 from "blueimp-md5";

import { Icon, Form, Input, InputNumber, Button } from "antd";
const FormItem = Form.Item;

@connect(state => ({ login: state.login }))
@Form.create()
export default class Login extends React.Component {
  state = {
    user: {}
  };
  componentWillMount() {
    window.localStorage.clear();
  }
  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const user = window.localStorage.getItem("user");
    if (user) {
      dispatch(routerRedux.push("/"));
    }
  }
  handleClick() {
    const { dispatch, form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      values["pass"] = md5(values["pass"]);
      dispatch({ type: "login/login", payload: values });
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.state;
    return (
      <div className={styles.box}>
        <div className={styles.form}>
          <div className={styles.title}>
            <h2>
              <Icon type="api" />后台管理
            </h2>
          </div>
          <Form>
            <FormItem hasFeedback>
              {getFieldDecorator("user", {
                initialValue: "1",
                rules: [
                  {
                    required: true,
                    message: "请输入手机号码！"
                  }
                  // {
                  //   pattern: /^1[34578]\d{9}$/,
                  //   message: "输入的不是有效的手机号!"
                  // }
                ]
              })(<Input placeholder="请输入手机号码" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator("pass", {
                initialValue: "1",
                rules: [
                  {
                    required: true,
                    message: "请输入密码！"
                  }
                ]
              })(<Input type="password" placeholder="请输入手机号码" />)}
            </FormItem>
            <Button
              type="primary"
              onClick={() => {
                this.handleClick();
              }}
            >
              登陆
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}
