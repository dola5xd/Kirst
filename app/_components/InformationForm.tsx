"use client";
import { FaEdit } from "react-icons/fa";
import Button from "../_components/Button";
import { useForm } from "react-hook-form";
import { useUser } from "../context/UserContext";
import { handleEdits } from "../_lib/userApi";
import { toast } from "react-toastify";
import ProfilePicUpload from "./ProfileUploader";

export type formType = {
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
};

function InformationForm() {
  const { user, setUser } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formType>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phone || "",
      email: String(user?.email),
    },
  });

  const onSubmit = async (data: formType) => {
    try {
      const updatedUser = await handleEdits(data);
      if (!updatedUser) throw new Error("Something went wrong!");
      setUser(updatedUser);
      toast.success("Edits have been submitted!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Edits haven't been submitted!");
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col w-full col-span-12 md:col-span-8 px-3 py-7 gap-y-14">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 gap-y-10">
        <ProfilePicUpload />
        <Button
          onClick={handleSubmit(onSubmit)}
          className="flex items-center gap-2 px-4 py-3 w-full md:w-auto"
        >
          <span className="text-xl">
            <FaEdit />
          </span>
          Edit Profile
        </Button>
      </div>

      <form className="flex flex-col gap-5 md:gap-7">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="flex flex-col w-full md:w-1/2 gap-y-2">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
              className={`px-4 py-2 border rounded border-black/50 disabled:cursor-not-allowed focus:outline-0 disabled:bg-black/10 ${
                errors.firstName ? "border-red-600 focus:border-red-600" : ""
              }`}
            />
          </span>
          <span className="flex flex-col w-full md:w-1/2 gap-y-1">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: true })}
              className={`px-4 py-2 border rounded border-black/50 disabled:cursor-not-allowed focus:outline-0 disabled:bg-black/10 ${
                errors.lastName ? "border-red-600 focus:border-red-600" : ""
              }`}
            />
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="flex flex-col w-full md:w-1/2 gap-y-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
              })}
              className={`px-4 py-2 border rounded border-black/50 disabled:cursor-not-allowed focus:outline-0 disabled:bg-black/10 ${
                errors.phone ? "border-red-600 focus:border-red-600" : ""
              }`}
            />
          </span>
          <span className="flex flex-col w-full md:w-1/2 gap-y-1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={String(user?.email)}
              disabled
              className={`px-4 py-2 border rounded border-black/50 disabled:cursor-not-allowed focus:outline-0 disabled:bg-black/10 ${
                errors.email ? "border-red-600 focus:border-red-600" : ""
              }`}
            />
          </span>
        </div>
      </form>
    </div>
  );
}

export default InformationForm;
