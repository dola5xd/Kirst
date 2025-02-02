"use client";
import { useRef, useState } from "react";
import { BiArrowToRight } from "react-icons/bi";
import { MdEmail } from "react-icons/md";

function Subscribe() {
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const inputEl = useRef<HTMLInputElement>(null);

  if (
    subscribe &&
    inputEl.current?.value?.length &&
    inputEl.current?.value?.length >= 10
  ) {
    return (
      <div className="ring-1 ring-indigo-300 py-2 px-10 w-2/3 rounded-xl">
        <p className="text-indigo-300 font-bold text-xl">
          Thanks for subscribing!
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <span className="text-3xl absolute top-1/2 -translate-y-1/2 left-2">
        <MdEmail />
      </span>

      <input
        type="email"
        ref={inputEl}
        placeholder="Your Email"
        className="bg-transparent py-4 px-12 ring-white ring-1 rounded duration-500 placeholder:text-gray-300 focus:ring-indigo-400 focus:outline-none"
      />
      <button
        title="Send"
        type="submit"
        onClick={() => setSubscribe(true)}
        className="absolute -translate-x-8 text-2xl top-1/2 -translate-y-1/2 duration-500 hover:text-indigo-400"
      >
        <BiArrowToRight />
      </button>
    </div>
  );
}

export default Subscribe;
