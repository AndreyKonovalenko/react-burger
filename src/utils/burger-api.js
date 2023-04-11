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
