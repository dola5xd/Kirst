"use client";

import { useState } from "react";
import { closest } from "color-2-name";
import StarComponent from "@/app/_components/StarComponent";

function TabsSection({
  desc,
  Colors,
  rating,
}: {
  desc: string;
  Colors: string[];
  rating: { name: string; text: string; Rating: number }[];
}) {
  const [activeTab, setActiveTab] = useState<string>("Descriptions");
  const colors = Colors.map((color) => closest(color).name);

  return (
    <section className="flex flex-col px-4 md:px-10 xl:px-20">
      <ul className="flex justify-between w-full gap-7 border-b *:duration-500 *:cursor-pointer *:text-base *:text-nowrap xl:*:text-xl border-black">
        <li
          className={`${
            activeTab === "Descriptions"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          }`}
          onClick={() => setActiveTab("Descriptions")}
        >
          Descriptions
        </li>
        <li
          className={`${
            activeTab === "Additional"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          }`}
          onClick={() => setActiveTab("Additional")}
        >
          Additional Information
        </li>
        <li
          className={`${
            activeTab === "Reviews"
              ? "border-b-4 border-black"
              : "border-b-4 border-transparent"
          }`}
          onClick={() => setActiveTab("Reviews")}
        >
          Reviews
        </li>
      </ul>
      <div className="flex flex-col gap-4 py-10">
        {activeTab === "Descriptions" ? (
          <p className="text-lg">{desc}</p>
        ) : activeTab === "Additional" ? (
          <>
            <h3 className="flex items-center gap-4 text-2xl capitalize">
              <span className="font-bold">Color</span>
              {colors.map((colorName) => colorName + ", ")}
            </h3>
            <h3 className="flex items-center gap-4 text-2xl">
              <span className="font-bold">Size</span>S, M, L, XL, XXL
            </h3>
          </>
        ) : (
          <>
            {rating ? (
              rating.map((rate, i) => (
                <div key={i} className="flex flex-col gap-2 py-7">
                  <h3 className="text-xl font-bold">{rate.name}</h3>
                  <StarComponent ratingValue={rate.Rating / 2} />
                  <p className="text-xl">{rate.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xl font-semibold text-center">
                No Rating 😢 Buy this Product to be able to write one ❗❗❗
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default TabsSection;
