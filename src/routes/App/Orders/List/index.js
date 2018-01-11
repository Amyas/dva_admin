import React from "react";
import { connect } from "dva";
import { Table, Pagination } from "antd";

function Node({ columns, data, loading, total, page, dispatch }) {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
            />
            <Pagination
                style={{ display: "flex", justifyContent: "center", margin: "30px 0" }}
                total={Number(total)}
                current={Number(page)}
                onChange={page => {
                    dispatch({
                        type: "orders/query",
                        payload: { page }
                    });
                }}
            />
        </div>
    )
}
export default connect(() => ({}))(Node);
