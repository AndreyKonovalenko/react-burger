export function getIngerdients(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }
    return response.json();
  });
}
