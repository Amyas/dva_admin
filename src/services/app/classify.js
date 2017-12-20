import request from "../../utils/request";
export function query(params) {
  return request({
    url: "admin/type/index"
  });
}
export function addClassify(params) {
  return request({
    method: "POST",
    url: "admin/type/add_type",
    params
  });
}
export function editClassify(params) {
  return request({
    method: "POST",
    url: "admin/type/upd_type",
    params
  });
}
export function delClassify(params) {
  return request({
    method: "POST",
    url: "admin/type/del_type",
    params
  });
}
