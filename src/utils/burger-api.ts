const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

const errorHandler = (status: number)=> {
  throw new Error(`Ошибка ${status}`);
};


const options = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    Authorization: null,
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: null
};

export const getIngerdients = async () => {
  const response = await fetch(`${BURGER_API_URL}/ingredients`, {
    ...options,
    method: 'GET',
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
  const token = getCookie('accessToken');
  const response = await fetch(`${BURGER_API_URL}/orders`, {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
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
    method: 'POST',
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    const accessToken = data.accessToken.split('Bearer ')[1];
    if (accessToken) {
      setCookie('accessToken', accessToken);
    }
    sessionStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
};

export const loginRequeset = async (form) => {
  const response = await fetch(`${BURGER_API_URL}/auth/login`, {
    ...options,
    method: 'POST',
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    const accessToken = data.accessToken.split('Bearer ')[1];
    if (accessToken) {
      setCookie('accessToken', accessToken);
    }
    sessionStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
};

export const recoveryRequest = async (email) => {
  const response = await fetch(`${BURGER_API_URL}/password-reset`, {
    ...options,
    method: 'POST',
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
  const response = await fetch(`${BURGER_API_URL}/password-reset/reset`, {
    ...options,
    method: 'POST',
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

export const refreshAccessTokenRequest = async () => {
  const response = await fetch(`${BURGER_API_URL}/auth/token`, {
    ...options,
    method: 'POST',
    body: JSON.stringify({ token: sessionStorage.getItem('refreshToken') }),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    const accessToken = data.accessToken.split('Bearer ')[1];
    setCookie('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
};

export const getUserRequest = async () => {
  const token = getCookie('accessToken');
  const response = await fetch(`${BURGER_API_URL}/auth/user`, {
    ...options,
    method: 'GET',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
  });
  if (!response.ok) {
    const data = await response.json();
    if (Boolean(data.message)) {
      throw new Error(data.message);
    }
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};

export const updateUserDataRequest = async (form) => {
  const token = getCookie('accessToken');
  const response = await fetch(`${BURGER_API_URL}/auth/user`, {
    ...options,
    method: 'PATCH',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
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

export const logoutRequest = async () => {
  const response = await fetch(`${BURGER_API_URL}/auth/logout`, {
    ...options,
    method: 'POST',
    body: JSON.stringify({ token: sessionStorage.getItem('refreshToken') }),
  });
  if (!response.ok) {
    errorHandler(response.status);
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value, props) => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name) => {
  setCookie(name, null, { expires: -1 });
};

export const fetchWithRefresh = async (request, data) => {
  //data is optional argument
  try {
    return await request(data);
  } catch (error) {
    if (error.message === 'jwt expired') {
      await refreshAccessTokenRequest();
      return await request(data);
    } else {
      errorHandler(error);
    }
  }
};
