"use client";

import { useRouter, useSearchParams } from "next/navigation";

function Select() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultValue = searchParams.get("sort") || "latest";

  function handleOption(value: string) {
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set("sort", String(value));

    router.push(`/shop?${queryParams.toString()}`);
  }

  return (
    <select
      title="SortBy"
      name="sortBy"
      id="sort"
      defaultValue={defaultValue}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-3 px-4"
      onChange={(e) => handleOption(e.target.value)}
    >
      <option value="latest" key="latest">
        Shot by latest
      </option>
      <option value="price_asc" key="lowPrice">
        Shot by low-price
      </option>
      <option value="price_desc" key="highPrice">
        Shot by high-price
      </option>
    </select>
  );
}

export default Select;
