import { useCallback, useEffect, useState, useRef } from "react";

const PriceRangeSlider = ({
  min,
  max,
  currentMin,
  currentMax,
  onChange,
}: {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  onChange: (values: { min: number; max: number }) => void;
}) => {
  const [minVal, setMinVal] = useState(currentMin || min);
  const [maxVal, setMaxVal] = useState(currentMax || max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLInputElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    if (minVal != minValRef.current || maxVal != maxValRef.current) {
      onChange({ min: minVal, max: maxVal });
      minValRef.current = minVal;
      maxValRef.current = maxVal;
    }
  }, [minVal, maxVal, onChange]);

  return (
    <div className="w-full flex items-center justify-center flex-col py-7 gap-7">
      <p className="flex gap-2 text-xl">
        Price: <span className="font-bold">{"$ " + minVal}</span> -{" "}
        <span className="font-bold">{"$ " + maxVal}</span>
      </p>

      <div className="multi-slide-input-container w-full">
        <label htmlFor="rangeMin">
          <input
            id="rangeMin"
            type="range"
            min={min}
            max={max}
            value={minVal}
            onChange={(event) => {
              const value = Math.min(Number(event.target.value), maxVal - 1);
              setMinVal(value);
            }}
            className={`thumb pointer-events-none absolute h-0 outline-none z-[3] w-full ${
              minVal > max - 100 || minVal === maxVal ? "z-[5]" : ""
            }`}
          />
        </label>
        <label>
          <input
            type="range"
            min={min}
            max={max}
            value={maxVal}
            onChange={(event) => {
              const value = Math.max(Number(event.target.value), minVal + 1);
              setMaxVal(value);
            }}
            className={`thumb pointer-events-none absolute h-0 outline-none z-[4] w-full ${
              minVal > max - 100 || minVal === maxVal ? "z-[4]" : ""
            }`}
          />
        </label>
        <div className="relative slider">
          <div className="track-slider w-full z-[1] rounded h-2 absolute bg-gray-400" />

          <div
            ref={range}
            className="range-slider z-[2] rounded h-2 absolute bg-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
