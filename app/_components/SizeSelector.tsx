"use client";

import { Dispatch, SetStateAction } from "react";

interface Sizes {
  size: "S" | "M" | "L" | "XL" | "XXL";
}

function SizeSelector({
  size: activeSize,
  setSize,
}: {
  size: Sizes["size"];
  setSize: Dispatch<SetStateAction<Sizes["size"]>>;
}) {
  const sizes: Sizes["size"][] = ["S", "M", "L", "XL", "XXL"];

  return (
    <ul className="flex space-x-4">
      {sizes.map((size) => (
        <li
          key={size}
          onClick={() => setSize(size)}
          className={`w-12 h-12 rounded text-lg flex items-center justify-center ring-1 ring-black font-bold cursor-pointer ${
            activeSize === size ? "bg-black text-white" : ""
          }`}
        >
          {size}
        </li>
      ))}
    </ul>
  );
}

export default SizeSelector;
