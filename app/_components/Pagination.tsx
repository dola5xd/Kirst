"use client";

import { useRouter } from "next/navigation";

function Pagination({
  numberOfPages,
  pageNumber,
}: {
  numberOfPages: number[];
  pageNumber: number;
}) {
  const router = useRouter();

  function handlePage(number: number) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", String(number));
    router.push(`/shop?${queryParams.toString()}`);
  }

  return (
    <ul className="flex items-center gap-4 self-end py-7">
      {numberOfPages?.map((page) => (
        <li
          key={page}
          className={` font-bold ring-1 rounded w-10 h-10 flex items-center cursor-pointer justify-center duration-500 ${
            page === pageNumber
              ? "bg-black text-white ring-transparent cursor-not-allowed"
              : "bg-white text-black ring-black hover:bg-black/50 hover:text-white"
          }`}
          onClick={() => handlePage(Number(page))}
        >
          {page}
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
