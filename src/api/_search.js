import request from "@/utils/request";

export function searchSkill(data) {
  var queryString = Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
  console.log("/pub/skills?" + queryString);
  return request({
    url: "/pub/skills?" + queryString,
    method: "get",
  });
}

export function searchUser(data) {
  console.log("mehdi Search by user", data);
  var queryString = Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
  console.log("/pub/users/search?" + queryString);
  return request({
    url: "/pub/users/search?" + queryString,
    method: "get",
  });
}

export function searchByLocation(data) {
  var queryString = Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
  return request({
    url: "/api/pub/skills?" + queryString,
    method: "get",
  });
}
