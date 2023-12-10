export const shuffle = (array: any[]) => {
  const arr = [...array];
  let m = arr.length;
  let t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
};
