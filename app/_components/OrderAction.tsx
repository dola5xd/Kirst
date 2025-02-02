"use client";

import { Dispatch, SetStateAction } from "react";

function OrderAction({
  activeFilter,

  setActiveFilter,
}: {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}) {
  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex flex-wrap items-center self-end gap-4 xl:flex-nowrap">
      <button
        type="button"
        onClick={() => handleFilterClick("All")}
        className={`flex items-center py-2 px-5 gap-2 ring-1 duration-500 ring-black rounded-xl ${
          activeFilter === "All" ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => handleFilterClick("Not Submitted")}
        className={`flex items-center py-2 px-5 gap-2 ring-1 duration-500 ring-black text-nowrap rounded-xl text-black ${
          activeFilter === "Not Submitted"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Not Submitted
      </button>
      <button
        type="button"
        onClick={() => handleFilterClick("Submitted")}
        className={`flex items-center py-2 px-5 gap-2 ring-1 duration-500 ring-black text-nowrap rounded-xl ${
          activeFilter === "Submitted"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Submitted
      </button>
      <button
        type="button"
        onClick={() => handleFilterClick("In Process")}
        className={`flex items-center py-2 px-5 gap-2 ring-1 duration-500 ring-black text-nowrap rounded-xl ${
          activeFilter === "In Process"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        In Process
      </button>
      <button
        type="button"
        onClick={() => handleFilterClick("Delivered")}
        className={`flex items-center py-2 px-5 gap-2 ring-1 duration-500 ring-black text-nowrap rounded-xl ${
          activeFilter === "Delivered"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}
      >
        Delivered
      </button>
    </div>
  );
}

export default OrderAction;
