import request from "../../utils/request";
export function query(params) {
    return request({
        url: "admin/order/index",
        params
    });
}