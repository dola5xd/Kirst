"use client";

import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function Counter({
  initialNum = 0,
  onQuantityChange,
}: {
  initialNum: number;
  onQuantityChange?: (quantity: number) => void;
}) {
  const [count, setCount] = useState<number>(initialNum);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(count);
    }
  }, [count, onQuantityChange]);

  const handleIncrement = () => {
    setCount((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    setCount((prevValue) => (prevValue === 1 ? prevValue : prevValue - 1));
  };

  return (
    <div className="flex items-center justify-between w-full px-4 py-3 text-lg font-bold rounded-lg xl:py-2 ring-1 ring-black space-x-7 xl:w-auto">
      <button type="button" title="decrement" onClick={handleDecrement}>
        <FaMinus />
      </button>
      <span>{count}</span>
      <button type="button" title="increment" onClick={handleIncrement}>
        <FaPlus />
      </button>
    </div>
  );
}

export default Counter;
