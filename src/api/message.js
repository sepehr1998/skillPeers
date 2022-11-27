import request from "@/utils/request";

export function sendNewMessage(data) {
  return request({
    url: "/idn/messages",
    method: "post",
    data: data,
  });
}



export function countMessages(data) {
    return request({
        url: "/idn/messages/count",
        method: "get",
        params: data,
    });
}

export function getMessages(data) {
    return request({
        url: "/idn/messages",
        method: "get",
        params: data,
    });
}

export function getMessageByID(id) {
    return request({
        url: "/idn/messages/" + id,
        method: "get",
    });
}
