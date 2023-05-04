const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const errorHandler = (status) => {
  throw new Error(`Ошибка ${status}`);
};

export const getIngerdients = async () => {
  const response = await fetch(`${BURGER_API_URL}/ingredients`);
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
};

const options = {
  method: "POST",
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: null,
};

export const sendOrder = async (ingredients) => {
  const response = await fetch(`${BURGER_API_URL}/orders`, {
    ...options,
    body: JSON.stringify(ingredients),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};

export const registerRequeset = async (form) => {
  const response = await fetch(`${BURGER_API_URL}/auth/register`, {
    ...options,
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    const accessToken = data.accessToken.split("Bearer ")[1];
    if (accessToken) {
      setCookie("accessToken", accessToken);
    }
    sessionStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }
};

export const loginRequeset = async (form) => {
  const response = await fetch(`${BURGER_API_URL}/auth/login`, {
    ...options,
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    const accessToken = data.accessToken.split("Bearer ")[1];
    if (accessToken) {
      setCookie("accessToken", accessToken);
    }
    sessionStorage.setItem("refreshToken", data.refreshToken);
    return data;
  }
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};
