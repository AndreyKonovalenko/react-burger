const BURGER_API_URL = 'https://norma.nomoreparties.space/api';

export const getIngerdients = async () => {
  const response = await fetch(`${BURGER_API_URL}/ingredients`);
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
};

const options = {
  method: 'POST',
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

export const sendOrder = async (ingredients) => {
  const response = await fetch(`${BURGER_API_URL}/orders`, {
    ...options,
    body: JSON.stringify(ingredients),
  });
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}`);
  }
  const data = await response.json();
  if (data.success) {
    return data;
  }
};
