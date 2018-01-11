import React from 'react'
import { connect } from 'dva'
import { Avatar } from 'antd'

import List from './List'

@connect(({ orders, loading }) => ({
    orders,
    loading: loading.global
}))
export default class Orders extends React.Component {
    componentWillMount() {
        const { dispatch, orders } = this.props;
        dispatch({
            type: "orders/query",
            payload: {
                page: orders.page
            }
        });
    }
    render() {
        const { orders: { list, total, page }, loading } = this.props;
        // 列表参数
        // -----------------------------
        const listProps = {
            data: list,
            total: total,
            page: page,
            loading: loading,
            columns: [
                {
                    title: "ID",
                    dataIndex: "id"
                },
                {
                    title: "产品",
                    render: (record) => {
                        const goods = JSON.parse(record.goods);
                        return goods.map((v, i) => <span key={i}>{v.title}{i !== goods.length - 1 && "、"}</span>)
                    }
                },
                {
                    title: "金额",
                    dataIndex: "money"
                },
                {
                    title: "备注",
                    dataIndex: "content"
                },
                {
                    title: "创建时间",
                    render: (record) => (<span>{new Date(record.instime * 1000).toLocaleString().split("/").join("-")}</span>)
                },
                {
                    title: "用户信息",
                    render: (record) => {
                        if (record.userinfo) {
                            return (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <Avatar src={record.userinfo.img} />
                                    &nbsp;&nbsp;&nbsp;
                                    <b>{record.userinfo.nickname}</b>
                                </div>
                            )
                        } else {
                            return <div>用户未关注公众号暂无信息</div>
                        }
                    }
                },
                {
                    title: "状态",
                    render: (record) => {
                        let status = '';
                        switch (record.status) {
                            case 0:
                                status = "已付款未完成"
                                break;
                            case 1:
                                status = "订单已完成"
                                break;
                            case 3:
                                status = "未付款"
                                break;
                            default:
                                state = record.status
                                break;

                        }
                        return status
                    }
                },
            ]
        };
        return (
            <div>
                <List {...listProps} />
            </div>
        )

    }
}