export const getFileNameFromPath = (path) => {
  return path.split("/").pop();
};

export const createIdEntryEnum = (entryList) => {
  return entryList.reduce(
    (result, item) => ({
      ...result,
      [item.id]: item,
    }),
    {}
  );
};
