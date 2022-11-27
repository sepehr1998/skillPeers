import request from "@/utils/request";


export function addRate(data) {
    return request({
        url: "/idn/rates",
        method: "PUT",
        data,
    });
}

export function getRateByID(id) {
    return request({
        url: "/pub/rates/" + id,
        method: "get",
    });
}
