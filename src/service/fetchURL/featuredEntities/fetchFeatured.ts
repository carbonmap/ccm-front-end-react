export const fetchFeatured = async () => {
  let featuredEntities: { id: string; name: string; emissions: string[] }[] =
    [];

  featuredEntities = await fetch(
    `${process.env.REACT_APP_DATABASE_URL}/featured.json`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  });

    return featuredEntities;
};
