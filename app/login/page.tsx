import Image from "next/image";
import Logo from "../_components/Logo";
import LoginForm from "../_components/LoginForm";

export default function Page() {
  return (
    <section className="flex flex-col justify-between w-full pt-10 xl:items-center gap-y-10 xl:gap-0 xl:flex-row xl:py-0">
      <div className="hidden xl:block w-[680px] relative h-screen">
        <div className="relative z-10 p-10">
          <Logo />
        </div>
        <Image
          src={"/assets/background/login-bg.png"}
          fill
          alt="Girl sit down"
          className="block object-fill"
        />
      </div>
      <div className="self-center xl:hidden">
        <Logo />
      </div>
      <div className="px-7 xl:w-1/2">
        <h1 className="text-4xl font-bold">Welcome 👋</h1>
        <h4 className="text-xl text-gray-400">Please login here</h4>
        <LoginForm />
      </div>
    </section>
  );
}
