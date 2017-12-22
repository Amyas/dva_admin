import React from "react";
import { Table, Pagination } from "antd";

export default function Node({ columns, data, loading, total, current_page }) {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
        expandedRowRender={record => (
          <p style={{ margin: 0 }}>商品详情：{record.content}</p>
        )}
      />
      <Pagination
        style={{ margin: "30px 0" }}
        total={total}
        current={current_page}
        onChange={page => {
          dispatch({
            type: "users/query",
            payload: { page }
          });
        }}
      />
    </div>
  );
}
