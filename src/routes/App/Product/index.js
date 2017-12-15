import React from "react";
import { connect } from "dva";
import { Button, Table } from "antd";

@connect(state => ({ product: state.product }))
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: "Name",
          dataIndex: "name"
        },
        {
          title: "Age",
          dataIndex: "age"
        },
        {
          title: "Address",
          dataIndex: "address"
        }
      ]
    };
  }
  render() {
    const { list } = this.props.product;
    const { columns } = this.state;
    return (
      <div>
        <div>
          <Button type="primary">新建产品</Button>
          <Table
            columns={columns}
            dataSource={list}
            rowKey={record => record.name}
            pagination={false}
          />
          {/* <Pagination
            style={{ margin: "30px 0" }}
            total={total}
            current={current}
            onChange={page => {
              dispatch({
                type: "users/query",
                payload: { page }
              });
            }}
          /> */}
        </div>
      </div>
    );
  }
}
