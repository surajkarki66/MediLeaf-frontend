const getFormData = (payload: any): FormData => {
  const data = new FormData();

  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in payload) {
    data.append(key, payload[key]);
  }
  return data;
};

export default getFormData;
