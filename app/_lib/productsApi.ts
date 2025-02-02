import { SanityDocument } from "next-sanity";
import { client } from "./client";

const options = { next: { revalidate: 0 } };

export async function getProducts(
  pageNumber: number,
  category: string[],
  minPrice: number,
  maxPrice: number,
  sortBy: string
) {
  const itemsPerPage = 15;
  const skip = (pageNumber - 1) * itemsPerPage;

  let query = `*[_type == "product" && defined(slug.current)${
    category.length === 0 && minPrice <= 0 && maxPrice >= 1000 ? "]" : ""
  }`;

  if (category.length > 0) {
    if (typeof category === "string") {
      query += ` && "${category}" in Category ${
        maxPrice < 1000 || minPrice > 0 ? "" : "]"
      }`;
    } else {
      query += `&& (${category
        .map((cat) => `"${cat}" in Category`)
        .join(" || ")})${maxPrice < 1000 || minPrice > 0 ? "" : "]"}`;
    }
  }

  if (minPrice > 0) {
    query += ` && price >= ${minPrice} ${maxPrice < 1000 ? "" : "]"}`;
  }

  if (maxPrice < 1000) {
    query += ` && price <= ${maxPrice}]`;
  }

  if (sortBy === "latest") {
    query += ` | order(publishedAt desc)`;
  } else if (sortBy === "price_asc") {
    query += ` | order(price asc)`;
  } else if (sortBy === "price_desc") {
    query += ` | order(price desc)`;
  }

  query += ` {
    _id,
    title,
    publishedAt,
    description,
    image,
    price,
    inStock,
    Category,
    Colors,
    rating
  }[${skip}...${skip + itemsPerPage}]`;

  try {
    const data = await client.fetch<SanityDocument[]>(query, {}, options);
    return data;
  } catch (error) {
    console.error("Error fetching products: ", error);
    return [];
  }
}

export async function getBestRating() {
  try {
    const data = await client.fetch<SanityDocument[]>(
      `*[
  _type == "product" && defined(slug.current) && defined(rating)
] | order(rating.Rating asc)[0...4] {_id, title, publishedAt,description,image,price,inStock,rating}`,
      {},
      options
    );
    return data;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}

export async function haveDiscount(productName: string) {
  try {
    const [discount] = await client.fetch<SanityDocument[]>(
      `*[_type == "discount" && productName == "${String(
        productName
      )}"]{discount}`,
      {},
      options
    );
    return discount;
  } catch (error) {
    console.error("error: ", error);
    return null;
  }
}

export const getTotalProducts = async (
  category: string[],
  minPrice: number,
  maxPrice: number,
  sortBy: string
) => {
  let query = `*[_type == "product" && defined(slug.current)${
    category.length === 0 && minPrice <= 0 && maxPrice >= 1000 ? "]" : ""
  }`;

  if (category.length > 0) {
    if (typeof category === "string") {
      query += ` && "${category}" in Category ${
        maxPrice < 1000 || minPrice > 0 ? "" : "]"
      }`;
    } else {
      query += `&& (${category
        .map((cat) => `"${cat}" in Category`)
        .join(" || ")})${maxPrice < 1000 || minPrice > 0 ? "" : "]"}`;
    }
  }

  if (minPrice > 0) {
    query += ` && price >= ${minPrice} ${maxPrice < 1000 ? "" : "]"}`;
  }

  if (maxPrice < 1000) {
    query += ` && price <= ${maxPrice}]`;
  }

  if (sortBy === "latest") {
    query += ` | order(publishedAt desc)`;
  } else if (sortBy === "price_asc") {
    query += ` | order(price asc)`;
  } else if (sortBy === "price_desc") {
    query += ` | order(price desc)`;
  }

  query += ` {
      _id,
      title,
      publishedAt,
      description,
      image,
      price,
      inStock,
      Category,
      Colors,
      rating
    }`;

  const countQuery = `count(${query})`;
  const totalProducts = await client.fetch(countQuery);
  return totalProducts;
};

export const getCategories = async function () {
  const query = `*[_type == "Category" && defined(slug.current)]{
  title,image,_id
}`;
  try {
    const data = await client.fetch<SanityDocument[]>(query, {}, options);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getProductByID = async function (id: string) {
  const query = `*[_id == "${id}"&& defined(slug.current)]{
   _id,
    title,
    publishedAt,
    description,
    image,
    price,
    inStock,
    Category,
    Colors,
    rating
}`;
  try {
    const data = await client.fetch<SanityDocument>(query, {}, options);
    return data[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getProductByCategory = async function (
  category: string[],
  currentID: string
) {
  let query = `*[_type == "product" && defined(slug.current)  && _id != "${currentID}" ${
    category.length === 0 ? "]" : ""
  }`;
  if (category.length > 0) {
    if (typeof category === "string") {
      query += ` && "${category}" in Category]`;
    } else {
      query += `&& (${category
        .map((cat) => `"${cat}" in Category`)
        .join(" || ")})]`;
    }
  }
  query += ` {
    _id,
    title,
    publishedAt,
    description,
    image,
    price,
    inStock,
    Category,
    Colors,
    rating
  }[0...4]`;
  try {
    const data = await client.fetch<SanityDocument[]>(query, {}, options);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getProductsByIds = async (ids: string[]) => {
  if (ids.length === 0) return [];

  const query = `*[_id in ${JSON.stringify(ids)}]{
    _id,
    title,
    price,
    description,
    image,
    inStock,
    slug
  }`;

  const products = await client.fetch<SanityDocument[]>(query);
  return products;
};
