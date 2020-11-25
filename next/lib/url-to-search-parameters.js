// combines a defaults object with a router.query object
// to generate an object with the same structure as the defaults,
// but with any provided url values replaced. Supports strings, ints, booleans and arrays.
// NOTE that arrays will always become an array of strings, so postprocessing is likely
// required for number arrays. See searchParamsPostProcessNumArray.
export default function UrlToSearchParameters(defaultParams, queryObject) {
  const searchParams = { ...defaultParams };
  if (!queryObject) {
    return searchParams;
  }
  for (const entry of Object.entries(queryObject)) {
    const [name, value] = entry;
    if (value) {
      // convert '1,2,3' => [1,2,3]
      switch (typeof defaultParams[name]) {
        case 'object':
          searchParams[name] = value.split(',');
          break;
        case 'boolean':
          searchParams[name] = `${value}`.toLowerCase() === 'true';
          break;
        case 'number':
          searchParams[name] = parseInt(value, 10);
          break;
        default:
          searchParams[name] = value;
      }
    }
  }
  return searchParams;
}

// supports default fn
export const searchParamsPostProcessNumArray = (searchParams, key) =>
  (searchParams[key] = searchParams[key].map(i => parseInt(i, 10)));
