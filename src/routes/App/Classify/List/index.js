import React from "react";
import { Table } from "antd";

export default function Node({ columns, data, loading }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={record => record.id}
      pagination={false}
    />
  );
}
