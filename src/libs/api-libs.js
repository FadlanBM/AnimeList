import React from "react";

const GetAnime = async (resource, query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
  );
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Failed to fetch data: ${errorMessage}`);
  }
  const data = await response.json();
  return data;
};

export default GetAnime;
