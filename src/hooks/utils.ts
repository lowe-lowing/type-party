export const parse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};
