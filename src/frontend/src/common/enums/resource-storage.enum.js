const resourcesEnums = new Map();

const getResourceEnum = (resource, list) => {
  if (!resourcesEnums.has(resource)) {
    resourcesEnums.set(resource, createIdEntryEnum(list));
  }
  return resourcesEnums.get(resource);
};

const createIdEntryEnum = (entryList) => {
  return entryList.reduce(
    (result, item) => ({
      ...result,
      [item.id]: item,
    }),
    {}
  );
};

export default getResourceEnum;
