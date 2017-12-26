import React from "react";
import { Table, Pagination, Card } from "antd";

export default function Node({ columns, data, loading, total, current_page }) {
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
        expandedRowRender={record => {
          const attr = JSON.parse(record.attr);
          attr.push(
            {
              classify: "123",
              list: ["123", "123", "123"],
              type: "check"
            },
            {
              classify: "123",
              list: ["123", "123", "123"],
              type: "check"
            }
          );
          return (
            <div>
              <p style={{}}>
                <h4>商品详情：</h4>
                {record.content}
              </p>
              <h4>商品属性：</h4>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {attr.map((v, i) => (
                  <Card
                    key={i}
                    title={v.classify}
                    style={{ width: 300, marginRight: 10 }}
                  >
                    {v.list.map((e, j) => (
                      <span key={j}>{e}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    ))}
                  </Card>
                ))}
              </div>
            </div>
          );
        }}
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
