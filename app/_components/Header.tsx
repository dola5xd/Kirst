"use client";

import Link from "next/link";
import Logo from "./Logo";
import { BsBag } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import Button from "./Button";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import ProfilePic from "./ProfilePic";
import { handleSignOut } from "../_lib/userApi";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { user } = useUser();

  const [openUserMenu, setUserMenu] = useState<boolean>(false);

  const signOut = async () => {
    await handleSignOut();
  };

  return (
    <header className="flex flex-col items-center justify-between w-full px-2 py-5 bg-white gap-y-4 md:flex-row md:px-20">
      <Logo />
      <nav>
        <ul className="flex items-center gap-4 text-sm md:text-lg">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/shop"}>Shop</Link>
          </li>

          <li>
            <Link href={"/story"}>Our Story</Link>
          </li>
        </ul>
      </nav>
      <div>
        {user ? (
          <ul className="flex items-center gap-4 text-lg">
            <li>
              <Link href={"/account?active=wishlist"}>
                <IoIosHeartEmpty />
              </Link>
            </li>
            <li>
              <Link href={"/cart"}>
                <BsBag />
              </Link>
            </li>
            <li className="relative">
              <ProfilePic
                className="cursor-pointer w-[50px] h-[50px]"
                onClick={() => setUserMenu((prev) => !prev)}
              />
              {openUserMenu && (
                <div className="absolute z-50 flex flex-col gap-0 -translate-x-1/2 translate-y-2 bg-white border rounded left-1/2 border-black/25 top-full">
                  <Link
                    href={"/account"}
                    className="flex items-center gap-2 px-4 py-2 duration-500 hover:bg-black hover:text-white"
                  >
                    <FiSettings />
                    Settings
                  </Link>
                  <button
                    type="button"
                    title="Signout"
                    className="flex items-center gap-2 px-4 py-2 duration-500 hover:bg-black hover:text-red-400"
                    onClick={signOut}
                  >
                    <GoSignOut />
                    Signout
                  </button>
                </div>
              )}
            </li>
          </ul>
        ) : (
          <Link href={"/login"}>
            <Button className="px-10 py-3" title="login">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
