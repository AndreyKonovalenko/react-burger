const BURGER_API_URL = "https://norma.nomoreparties.space/api";

const errorHandler = (status) => {
  throw new Error(`Ошибка ${status}`);
};

const options = {
  method: null,
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Authorization: null,
  },
  redirect: "follow",
  referrerPolicy: "no-referrer",
  body: null,
};

export const getIngerdients = async () => {
  const response = await fetch(`${BURGER_API_URL}/ingredients`, {
    ...options,
    method: "GET",
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
};

export const sendOrder = async (ingredients) => {
  const response = await fetch(`${BURGER_API_URL}/orders`, {
    ...options,
    method: "POST",
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
    method: "POST",
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
    method: "POST",
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

export const recoveryRequest = async (email) => {
  const response = await fetch(`${BURGER_API_URL}/password-reset`, {
    ...options,
    method: "POST",
    body: JSON.stringify(email),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};

export const resetPasswordRequest = async (form) => {
  const response = await fetch(`${BURGER_API_URL}/reset-password`, {
    ...options,
    method: "POST",
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};

export const refreshAccessTokenRequest = async (refreshToken) => {
  const response = await fetch(`${BURGER_API_URL}/auth/token`, {
    ...options,
    method: "POST",
    body: JSON.stringify(refreshToken),
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

export const getUserRequest = async () => {
  const token = getCookie("AccessToken");
  const response = await fetch(`${BURGER_API_URL}/auth/user`, {
    ...options,
    method: "GET",
    headers: {
      ...options.headers,
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
};

export const updateUserDataRequest = async (form) => {
  const token = getCookie("AccessToken");
  const response = await fetch(`${BURGER_API_URL}/auth/user`, {
    ...options,
    method: "PATCH",
    headers: {
      ...options.headers,
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
};

export const logoutRequest = async (refreshToken) => {
  const response = await fetch(`${BURGER_API_URL}/auth/logout`, {
    ...options,
    method: "POST",
    body: JSON.stringify(refreshToken),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    sessionStorage.removeItem("refreshToken");
    deleteCookie("accessToken");
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
