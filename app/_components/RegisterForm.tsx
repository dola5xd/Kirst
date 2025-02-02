"use client";

import { useForm } from "react-hook-form";
import { handleRegister, handleSignInWithGoogle } from "../_lib/userApi";
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import Link from "next/link";
import Button from "./Button";
import { CgGoogle } from "react-icons/cg";

export type RegisterType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  terms: boolean;
};

function RegisterForm() {
  const router = useRouter();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>();

  const onSubmit = async (data: RegisterType) => {
    const userData = await handleRegister(data);
    if (typeof userData !== "string") {
      setUser(userData);
      router.push("/");
    } else {
      toast.error(userData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 py-4"
      autoComplete="off"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-lg text-gray-600">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          autoComplete="off"
          {...register("firstName", { required: "First name is required." })}
          className={`w-full px-3 py-3 text-base bg-white border rounded ${
            errors.firstName ? "border-red-600 focus:border-red-600" : ""
          }`}
        />
        {errors.firstName && (
          <p className="text-sm text-red-600">{errors.firstName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-lg text-gray-600">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          autoComplete="off"
          {...register("lastName", { required: "Last name is required." })}
          className={`w-full px-3 py-3 text-base bg-white border rounded ${
            errors.lastName ? "border-red-600 focus:border-red-600" : ""
          }`}
        />
        {errors.lastName && (
          <p className="text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-lg text-gray-600">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Invalid email format.",
            },
          })}
          className={`w-full px-3 py-3 text-base bg-white border rounded ${
            errors.email ? "border-red-600 focus:border-red-600" : ""
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-lg text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          {...register("password", {
            required: "Password is required.",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
              message: "Password must ",
            },
          })}
          className={`w-full px-3 py-3 text-base bg-white border rounded ${
            errors.password ? "border-red-600 focus:border-red-600" : ""
          }`}
        />
        {errors.password && (
          <p className="flex flex-col text-sm text-red-600">
            {errors.password.message}
            <span>- At least 8 characters</span>
            <span>
              - Must contain at least 1 uppercase letter, 1 lowercase letter,
              and 1 number
            </span>
            <span> - Can contain special characters.</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          id="terms"
          {...register("terms", { required: "You must accept the terms." })}
          className="w-5 h-5 rounded-full accent-black"
        />
        <label htmlFor="terms" className="text-lg text-black">
          I agree to the <span className="font-bold">Terms & Conditions</span>
        </label>
        {errors.terms && (
          <p className="text-sm text-red-600">{errors.terms.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-4 text-lg text-white bg-black rounded-lg"
      >
        Signup
      </button>

      <Button
        className="flex items-center justify-center w-full gap-4 px-5 py-4 mb-2 mr-2 text-xl font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-600/90 focus:ring-4 focus:outline-none focus:ring-indigo-600/50 hover:text-white"
        onClick={async () => {
          const userData = await handleSignInWithGoogle();
          if (typeof userData === "object") {
            setUser(userData);
            router.push("/");
          } else {
            toast.error(userData);
          }
        }}
      >
        <CgGoogle />
        Continue with Google
      </Button>
      <p className="self-center text-lg">
        Already have account?{" "}
        <Link href={"/login"} className="font-bold underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
