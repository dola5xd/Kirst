"use client";

import { useEffect, useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PriceRangeSlider from "./PriceRangeSlider";
import Button from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { FiFilter } from "react-icons/fi";

function Filters() {
  const [isMobile, setIsMobile] = useState(false);

  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const minPrice = Number(searchParams.get("min")) || 0;
  const maxPrice = Number(searchParams.get("max")) || 1000;
  const categoriesValues = useMemo(
    () => searchParams.getAll("category") || [],
    [searchParams]
  );
  const [showCate, setShowCate] = useState<boolean>(true);
  const [showPrice, setShowPrice] = useState<boolean>(true);
  const [cateValues, setCateValues] = useState<string[]>(categoriesValues);

  const [rangeValues, setRangeValues] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    setCateValues(categoriesValues);
  }, [categoriesValues]);

  const handleRangeChange = (values: { min: number; max: number }) => {
    setRangeValues(values);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCateValues((prev) =>
      checked ? [...prev, id] : prev.filter((value) => value !== id)
    );
  };

  const isCategorySelected = (category: string) => {
    return cateValues.includes(category);
  };

  const handleApply = () => {
    const queryParams = new URLSearchParams();

    cateValues.forEach((value) => queryParams.append("category", value));

    queryParams.set("min", String(rangeValues.min));
    queryParams.set("max", String(rangeValues.max));

    router.push(`/shop?${queryParams.toString()}`);
  };
  if (isMobile)
    return (
      <>
        <Button
          className="flex items-center justify-center gap-3 py-3 my-7"
          onClick={() => setOpenFilters((prev) => !prev)}
        >
          <FiFilter /> Fillters
        </Button>
        {openFilters && (
          <div className="flex flex-col h-full col-span-1 py-10 gap-7">
            <div className="flex flex-col gap-4">
              <h1 className="flex items-center gap-3 text-2xl font-bold">
                Product Categories{" "}
                <button
                  title="Categories"
                  onClick={() => setShowCate((prev) => !prev)}
                  type="button"
                  className={
                    showCate ? "duration-500 rotate-180" : "duration-500"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </h1>
              {showCate && (
                <ul className="flex flex-col w-3/4 gap-4">
                  {[
                    { name: "men", query: "Men's Clothes" },
                    { name: "woman", query: "Women's Clothes" },
                    { name: "kids", query: "kid's Clothes" },
                    { name: "casual", query: "Casual Wear" },
                    { name: "Shoes", query: "Footwear" },
                    { name: "accessories", query: "Accessories" },
                    { name: "winter", query: "Winter" },
                    { name: "summer", query: "Summer Collection" },
                  ].map((category) => (
                    <li key={category.name} className="text-xl font-semibold">
                      <label
                        htmlFor={category.query}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          id={category.query}
                          checked={isCategorySelected(category.query)}
                          onChange={handleCheckboxChange}
                          className="min-w-5 min-h-5 accent-black"
                        />
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="flex items-center gap-3 text-2xl font-bold">
                Filter by Price
                <button
                  title="Categories"
                  onClick={() => setShowPrice((prev) => !prev)}
                  type="button"
                  className={
                    showPrice ? "duration-500 rotate-180" : "duration-500"
                  }
                >
                  <IoIosArrowDown />
                </button>
              </h1>
              {showPrice && (
                <div className="w-3/4">
                  <div className="relative flex">
                    <PriceRangeSlider
                      min={0}
                      max={1000}
                      currentMin={rangeValues.min}
                      currentMax={rangeValues.max}
                      onChange={handleRangeChange}
                    />
                  </div>
                </div>
              )}
            </div>

            <Button
              title="Apply Filters"
              className="py-4 font-bold xl:w-3/4"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        )}
      </>
    );
  return (
    <div className="flex flex-col h-full col-span-1 py-10 gap-7">
      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          Product Categories{" "}
          <button
            title="Categories"
            onClick={() => setShowCate((prev) => !prev)}
            type="button"
            className={showCate ? "duration-500 rotate-180" : "duration-500"}
          >
            <IoIosArrowDown />
          </button>
        </h1>
        {showCate && (
          <ul className="flex flex-col w-3/4 gap-4">
            {[
              { name: "men", query: "Men's Clothes" },
              { name: "woman", query: "Women's Clothes" },
              { name: "kids", query: "kid's Clothes" },
              { name: "casual", query: "Casual Wear" },
              { name: "Shoes", query: "Footwear" },
              { name: "accessories", query: "Accessories" },
              { name: "winter", query: "Winter" },
              { name: "summer", query: "Summer Collection" },
            ].map((category) => (
              <li key={category.name} className="text-xl font-semibold">
                <label
                  htmlFor={category.query}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    id={category.query}
                    checked={isCategorySelected(category.query)}
                    onChange={handleCheckboxChange}
                    className="min-w-5 min-h-5 accent-black"
                  />
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          Filter by Price
          <button
            title="Categories"
            onClick={() => setShowPrice((prev) => !prev)}
            type="button"
            className={showPrice ? "duration-500 rotate-180" : "duration-500"}
          >
            <IoIosArrowDown />
          </button>
        </h1>
        {showPrice && (
          <div className="w-3/4">
            <div className="relative flex">
              <PriceRangeSlider
                min={0}
                max={1000}
                currentMin={rangeValues.min}
                currentMax={rangeValues.max}
                onChange={handleRangeChange}
              />
            </div>
          </div>
        )}
      </div>

      <Button
        title="Apply Filters"
        className="py-4 font-bold xl:w-3/4"
        onClick={handleApply}
      >
        Apply Filters
      </Button>
    </div>
  );
}

export default Filters;
