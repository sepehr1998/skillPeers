import request from "@/utils/request";


export function searchCountries(data) {
    return request({
        url: "/pub/countries",
        method: "get",
        params: data,
    });
}


export function searchCities(data) {
    return request({
        url: "/pub/cities",
        method: "get",
        params: data,
    });
}

export function searchLanguages(data) {
    return request({
        url: "/pub/languages",
        method: "get",
        params: data,
    });
}

