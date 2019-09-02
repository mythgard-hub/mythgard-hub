const rangeMax = (currentPage, pageSize) => (currentPage + 1) * pageSize - 1;

const rangeMin = (currentPage, pageSize) => currentPage * pageSize;

const onCurrentPage = (index, currentPage, pageSize) => {
  const min = rangeMin(currentPage, pageSize);
  const max = rangeMax(currentPage, pageSize);
  return index >= min && index <= max;
};

const hasNextPage = (currentPage, pageSize, itemCount) =>
  itemCount - 1 > rangeMax(currentPage, pageSize);

const hasPrevPage = currentPage => currentPage > 0;

const totalPages = (itemCount, pageSize) => Math.ceil(itemCount / pageSize);

export {
  rangeMax,
  rangeMin,
  hasNextPage,
  hasPrevPage,
  onCurrentPage,
  totalPages
};
