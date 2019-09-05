// 0, 20 => 20 (currentPage is zero-based, output is not)
const rangeMax = (currentPage, pageSize) => (currentPage + 1) * pageSize;

// 0, 20 => 1 (currentPage is zero-based, output is not)
const rangeMin = (currentPage, pageSize) => currentPage * pageSize + 1;

const onCurrentPage = (index, currentPage, pageSize) =>
  index >= rangeMin(currentPage, pageSize) - 1 &&
  index <= rangeMax(currentPage, pageSize) - 1;

const hasNextPage = (currentPage, pageSize, itemCount) =>
  itemCount > rangeMax(currentPage, pageSize);

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
