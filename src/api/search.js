import request from "@/utils/request";


export function searchUsers(data) {
    return request({
        url: "/pub/users/search",
        method: "get",
        params: data,
    });
}

export function countUsers(data) {
    return request({
        url: "pub/users/search/count",
        method: "get",
        params: data,
    });
}

export function searchSkills(data) {
    return request({
        url: "/pub/skills",
        method: "get",
        params: data,
    });
}

export function searchUserByID(id) {
    return request({
        url: "/pub/users/" + id,
        method: "get",
    });
}
