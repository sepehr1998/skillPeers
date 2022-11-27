import request from "@/utils/request";

export function registerNewUser(data) {
  return request({
    url: "/pub/account/register",
    method: "post",
    data: data,
  });
}

export function login(data) {
  return request({
    url: "/pub/account/login",
    method: "post",
    data: data,
  });
}

export function getInfo() {
  return request({
    url: "/idn/account/profile",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/idn/account/logout",
    method: "post",
  });
}

export function confirmEmail(data) {
  return request({
    url: "/idn/account/confirm-email",
    method: "Post",
    data: data,
  });
}

export function sendOtp(data) {
  return request({
    url: "/pub/account/send-otp",
    method: "POST",
    data: data,
  });
}

export function updateProfile(data) {
  console.log("profile update",data);
  return request({
    url: "/idn/account/profile",
    method: "PUT",
    data: data,
  });
}

export function resetPassword(data) {
  return request({
    url: "/pub/account/reset-password",
    method: "POST",
    data: data,
  });
}

export function changePassword(data) {
  return request({
    url: "/idn/account/change-password",
    method: "PATCH",
    data: data,
  });
}
