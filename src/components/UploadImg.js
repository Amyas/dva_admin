import React from "react";
import { Upload } from "antd";
import axios from "axios";

export default class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  customRequest(img) {
    const { type } = this.props;
    const user = JSON.parse(window.localStorage.getItem("user"));
    var formData = new FormData();
    formData.append("img", img);
    formData.append("user_id", user.id);
    formData.append("token", user.token);
    formData.append("type", type.value);

    const url = "http://211.159.149.135:8011/admin/Uploadfile/upload_img";

    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      .then(response => {
        const imageUrl = response.data.data.img;
        this.triggerChange(imageUrl);
        this.setState({
          imageUrl
        });
      });
  }
  triggerChange(changedValue) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }
  render() {
    const { imageUrl } = this.state;
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Upload
        name="img"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        customRequest={e => {
          this.customRequest(e.file);
        }}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    );
  }
}
