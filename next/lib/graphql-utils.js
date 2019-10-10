export const formatDate = d => {
  const iso = d.toISOString();
  return iso.slice(0, iso.indexOf('T'));
};
