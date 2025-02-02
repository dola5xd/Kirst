"use client";

import { useUser } from "../context/UserContext";
import ProfilePic from "./ProfilePic";

function WellcomeUser({ pic = false }: { pic?: boolean }) {
  const { user } = useUser();
  return (
    <>
      {pic && <ProfilePic className="max-h-[50px]" loading={true} />}
      <h1 className="flex flex-col justify-start gap-1 text-xl font-bold ">
        <span className="text-base font-normal">Hello 👋</span>{" "}
        {`${user?.firstName} ${user?.lastName}`}
      </h1>
    </>
  );
}

export default WellcomeUser;
