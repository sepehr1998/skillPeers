export function validateEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  );
}

export function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

export function randomString(length = 7) {
  const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let text = "";

  for (let i = 0; i < length; i++)
    text += possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );

  return text;
}

export function calcAge(date) {
  if (!date) return null;
  let birthDate = new Date(date);
  let currentDate = new Date();
  let years = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() == birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    years--;
  }

  return years;
}

export function getServerAddress() {
  // return "http://44.240.53.177";
  return "";

}
