const numAscending = (data) => {
  let dataToSort = data;
  if (!dataToSort) {
    return;
  }
  dataToSort = [...dataToSort].sort((a, b) => a.price - b.price);
  return dataToSort;
};

const numDescending = (data) => {
  let dataToSort = data;
  if (!dataToSort) {
    return;
  }
  dataToSort = [...dataToSort].sort((a, b) => b.price - a.price);
  return dataToSort;
};

const strAscending = (data) => {
  let dataToSort = data;
  if (!dataToSort) {
    return;
  }
  dataToSort = [...dataToSort].sort((a, b) => (a.title > b.title ? 1 : -1));
  return dataToSort;
};

const strDescending = (data) => {
  let dataToSort = data;
  if (!dataToSort) {
    return;
  }
  dataToSort = [...dataToSort].sort((a, b) => (a.title > b.title ? -1 : 1));
  return dataToSort;
};
export { numAscending, numDescending, strAscending, strDescending };
