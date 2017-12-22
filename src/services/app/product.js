import request from "../../utils/request";
export function query(params) {
  return request({
    url: "admin/goods/index",
    params
  });
}
export function addItem(params) {
  return request({
    method: "POST",
    url: "admin/goods/add_goods",
    params
  });
}
export function editItem(params) {
  return request({
    method: "POST",
    url: "admin/goods/upd_goods",
    params
  });
}
export function delItem(params) {
  return request({
    method: "POST",
    url: "admin/goods/del_goods",
    params
  });
}
export function queryClassifyList(params) {
  return request({
    method: "POST",
    url: "admin/type/index",
    params
  });
}
