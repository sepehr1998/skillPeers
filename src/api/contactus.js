import request from "@/utils/request";

export function sendMessage(data) {
  return request({
    url: "/pub/contact",
    method: "post",
    data: data,
  });
}
