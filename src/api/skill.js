import request from "@/utils/request";

export function getAllSkills() {
  return request({
    url: "/pub/skills",
    method: "get",
  });
}

export function createSkill(data) {
  return request({
    url: "/pub/skills",
    method: "POST",
    data,
  });
}
