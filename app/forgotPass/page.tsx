import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";
import Logo from "../_components/Logo";

export default function Page() {
  return (
    <section className="flex flex-col items-center justify-between w-full gap-20 py-20 xl:gap-0 xl:flex-row xl:py-0">
      <div className="hidden xl:block w-[680px] relative h-screen">
        <div className="relative z-10 p-10">
          <Logo />
        </div>
        <Image
          src={"/assets/background/forgot-bg.png"}
          fill
          alt="Girl with yellow dress"
          className="object-fill"
        />
      </div>
      <div className="xl:hidden">
        <Logo />
      </div>
      <div className="px-10 xl:pl-10 xl:pr-20 xl:w-1/2">
        <Link href={"/login"} className="flex items-center mb-10 text-xl">
          <MdKeyboardArrowLeft /> Back
        </Link>
        <h1 className="mb-3 text-4xl font-bold">Forgot Password</h1>
        <h4 className="text-xl text-gray-400">
          Enter your registered email address. we’ll send you a code to reset
          your password.
        </h4>
        <form className="flex flex-col gap-4 py-7">
          <div>
            <label htmlFor="email" className="text-lg leading-7 text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-black focus:ring-2 focus:ring-black"
            />{" "}
          </div>

          <button
            type="submit"
            title="Login"
            className="w-full py-4 text-xl text-white bg-black rounded-lg"
          >
            Send OTP
          </button>
        </form>
      </div>
    </section>
  );
}
