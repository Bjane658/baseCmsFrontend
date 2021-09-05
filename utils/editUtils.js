export const getSiteIdFromQueryParameter = () => {
    console.log(location.search.split("="));
    const queryKeyIndex = location.search.split("=").findIndex((value) => value.includes("id"));
    console.log(queryKeyIndex);
    return location.search.split("=")[queryKeyIndex + 1]
};