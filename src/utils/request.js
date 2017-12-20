import axios from "axios";
import { message } from "antd";

const config = {
  baseUrl: "http://211.159.149.135:8011/"
};
axios.defaults.baseURL = config.baseUrl;

const fetch = options => {
  const user = JSON.parse(window.localStorage.getItem("user"));

  const { method = "GET", url, params = {} } = options;
  if (user) {
    params.user_id = user.id;
    params.token = user.token;
  }

  switch (method.toUpperCase()) {
    case "GET":
      return axios.get(url, { params });
    case "POST":
      return axios.post(url, params);
    default:
      return message.error("请选择请求方式！");
  }
};

export default async function request(options) {
  const response = await fetch(options);
  if (response.data.status === 0) {
    message.error("接口出错了！");
  }
  return response.data.data;
}
