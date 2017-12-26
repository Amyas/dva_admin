import React from "react";
import { connect } from "dva";
import { Table, Pagination, Card } from "antd";

function Node({ columns, data, loading, total, current_page, dispatch }) {
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
          return (
            <div>
              <div style={{ marginBottom: 10 }}>
                <h4>商品详情：</h4>
                {record.content}
              </div>
              <h4>商品属性：</h4>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {attr.map((v, i) => (
                  <Card
                    key={i}
                    title={`${v.classify}(${
                      v.type === "check" ? "复选" : "单选"
                    })`}
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
        style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
        total={Number(total)}
        current={Number(current_page)}
        onChange={page => {
          dispatch({
            type: "product/query",
            payload: { page }
          });
        }}
      />
    </div>
  );
}

export default connect(() => ({}))(Node);
