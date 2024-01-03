export const formatData = (array: string[][]) => {
  const newArray = array.map((item, idx) => ({
    id: idx.toString(),
    question: item,
  }));
  return newArray;
};
