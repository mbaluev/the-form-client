export const getProgress = (values?: boolean[]) => {
  let value = 0;
  if (values && values.length > 0) {
    const trues = values.filter((v) => v);
    value = (trues.length / values.length) * 100;
  }
  return Math.round(value);
};
