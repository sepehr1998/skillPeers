import request from "@/utils/request";

export function uploadTempFile(files) {
  return request({
    url: "/pub/files/temp",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: files,
  });
}
