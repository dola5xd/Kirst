"use client";
import Image from "next/image";
import { useUser } from "../context/UserContext";
import { MouseEventHandler, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../_lib/firebase";

function ProfilePic({
  onClick,
  className,
  loading = false,
}: {
  onClick?: MouseEventHandler<HTMLImageElement>;
  className?: string;
  loading?: boolean;
}) {
  const { user, loading: userLoading } = useUser();
  const photoURL = auth.currentUser?.photoURL;
  const router = useRouter();

  useEffect(() => {
    if (!user && !userLoading) router.push("/login");
  }, [user, router, userLoading]);

  if (!user && loading)
    return (
      <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-white">
        <span className="block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );

  return (
    <Image
      src={
        photoURL
          ? photoURL
          : `https://api.dicebear.com/9.x/initials/png?seed=${user ? user!.firstName + "+" + user!.lastName : ""}`
      }
      width={500}
      height={500}
      quality={100}
      alt="avatar"
      className={"rounded-full object-cover w-[50px] h-[50px] " + className}
      onClick={onClick}
    />
  );
}

export default ProfilePic;
