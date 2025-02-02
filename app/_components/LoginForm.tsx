"use client";

import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleLogin, handleSignInWithGoogle } from "../_lib/userApi";
import Button from "./Button";
import { CgGoogle } from "react-icons/cg";
import { useState } from "react";

export type loginType = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const { setUser } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const onSubmit = async (data: loginType) => {
    setIsLoading(true);
    setLoginError("");
    try {
      const userData = await handleLogin(data);
      if (typeof userData === "object") {
        setUser(userData);
        router.push("/");
      } else {
        setLoginError("Incorrect email or password.");
      }
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? "Incorrect email or password."
          : "Incorrect email or password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const userData = await handleSignInWithGoogle();
      if (typeof userData === "object") {
        setUser(userData);
        router.push("/");
      } else {
        toast.error("Failed to sign in with Google.");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? "Failed to sign in with Google."
          : "Failed to sign in with Google."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4 py-7"
      autoComplete="off"
    >
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
            errors.email || loginError
              ? "border-red-600 focus:border-red-600"
              : ""
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
            errors.password || loginError
              ? "border-red-600 focus:border-red-600"
              : ""
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

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            className="w-5 h-5 rounded-full accent-black"
          />{" "}
          <label htmlFor="remember" className="text-lg leading-7 text-black">
            Remember Me{" "}
          </label>
        </div>
        <Link href={"/forgotPass"} className="underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        title="Login"
        className="w-full py-4 text-xl text-white bg-black rounded-lg disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <Button
        className="flex items-center justify-center w-full gap-4 px-5 py-4 mb-2 mr-2 font-medium text-center text-white bg-indigo-600 rounded-lg xl:text-xl hover:bg-white hover:text-black disabled:opacity-50"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        <CgGoogle />
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>

      {loginError && (
        <p className="text-sm text-center text-red-600">
          {loginError} try{" "}
          <Link href={"/register"} className="text-center underline">
            Create Account?
          </Link>
        </p>
      )}

      <Link href={"/register"} className="text-center underline">
        Create Account?
      </Link>
    </form>
  );
}

export default LoginForm;
