const removeProperties = (data, propertiesToRemove) => {
  const newData = { ...data };
  for (const property of propertiesToRemove) {
    const nestedProperties = property.split(".");
    if (nestedProperties.length === 1) {
      delete newData[property];
    } else {
      const [nestedProperty, nestedKey] = nestedProperties;
      if (newData[nestedProperty]) {
        delete newData[nestedProperty][nestedKey];
      }
    }
  }
  return newData;
};
export default removeProperties;
