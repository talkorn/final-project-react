const filterFunction = (data, searchParams) => {
  if (!data) {
    return [];
  }

  let filter = "";
  if (searchParams.filter) {
    filter = searchParams.filter;
  }

  let searchResult = data.filter((card) => {
    const cardTitle = card.title ? card.title.toLowerCase() : "";
    const cardColor = card.colors ? card.colors.toLowerCase() : "";
    const cardCategory = card.category ? card.category.toLowerCase() : "";

    return (
      cardTitle.startsWith(filter.toLowerCase()) ||
      cardColor.startsWith(filter.toLowerCase()) ||
      cardCategory.startsWith(filter.toLowerCase())
    );
  });

  return searchResult;
};

export default filterFunction;
