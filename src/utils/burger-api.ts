import { CookieSerializeOptions } from 'cookie';

const BURGER_API_URL = 'https://norma.nomoreparties.space/api/';
export const WS_NORMA_API_URL = 'wss://norma.nomoreparties.space/orders';

const getRefreshToken = (): string => {
  return JSON.stringify({ token: sessionStorage.getItem('refreshToken') });
};
const setRefreshTokent = (token: string): void => {
  localStorage.setItem('refreshToken', token);
};

const errorHandler = (status: number) => {
  throw new Error(`Ошибка ${status}`);
};

type TForm = {
  [key: string]: string;
};

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  if (!response.ok) {
    errorHandler(response.status);
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

const checkSuccess = (response: any) => {
  if (response && response.success) {
    return response;
  }
  if (!response.success) {
    errorHandler(response.status);
  }
  return Promise.reject(`Ответ не success: ${response}`);
};

const request = (
  endpoint: string,
  options?: RequestInit | undefined
): Promise<any> => {
  return fetch(`${BURGER_API_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

const options: RequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: null,
};

export const setTokens = (data: any) => {
  const accessToken = data.accessToken.split('Bearer ')[1];
  if (accessToken) {
    setCookie('accessToken', accessToken);
  }
  setRefreshTokent(data.refreshToken);
};

export const getIngerdients = () => request('ingredients');

export const getOrderByOrderNumber = (number: string) =>
  request(`orders/${number}`);

export const sendOrder = (ingredients: Array<string>) => {
  const token = getCookie('accessToken');
  return request('orders', {
    ...options,
    method: 'POST',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(ingredients),
  });
};

export const registerRequeset = (form: TForm) => {
  return request('auth/register', {
    ...options,
    method: 'POST',
    body: JSON.stringify(form),
  });
};

export const loginRequeset = (form: TForm) => {
  return request('auth/login', {
    ...options,
    method: 'POST',
    body: JSON.stringify(form),
  });
};

export const recoveryRequest = (form: TForm) => {
  return request('password-reset', {
    ...options,
    method: 'POST',
    body: JSON.stringify(form),
  });
};

export const resetPasswordRequest = (form: TForm) => {
  return request('password-reset/reset', {
    ...options,
    method: 'POST',
    body: JSON.stringify(form),
  });
};

export const refreshAccessTokenRequest = () => {
  return request('auth/token', {
    ...options,
    method: 'POST',
    body: getRefreshToken(),
  });
};

export const getUserRequest = () => {
  const token = getCookie('accessToken');
  return request('auth/user', {
    ...options,
    method: 'GET',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
  });
};

export const updateUserDataRequest = (form: TForm) => {
  const token = getCookie('accessToken');
  return request('auth/user', {
    ...options,
    method: 'PATCH',
    headers: {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(form),
  });
};

export const logoutRequest = () => {
  return request('auth/logout', {
    ...options,
    method: 'POST',
    body: getRefreshToken(),
  });
};

export const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (
  name: string,
  value: string | null,
  props?: CookieSerializeOptions
): void => {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = new Date(exp.toUTCString());
  }
  if (value !== null) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof typeof props];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: new Date(-1) });
};

export const fetchWithRefresh = async (request: any, data?: any) => {
  //data is optional argument
  try {
    return await request(data);
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      await refreshAccessTokenRequest();
      return await request(data);
    } else {
      errorHandler(error);
    }
  }
};
