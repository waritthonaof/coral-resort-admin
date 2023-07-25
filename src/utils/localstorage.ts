export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
};
