export default function getFormData(payload: Record<string, any>): FormData {
  const data = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    data.append(key, value);
  });

  return data;
}
