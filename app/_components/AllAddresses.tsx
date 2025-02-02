"use client";

import { useState } from "react";
import { useUser } from "../context/UserContext";
import AddressCard from "./AddressCard";
import Button from "./Button";
import { GoPlus } from "react-icons/go";
import { SubmitHandler, useForm } from "react-hook-form";
import { addNewAddress } from "../_lib/userApi";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";

export type addressType = {
  id: string;
  Name: string;
  phone: string;
  zip: string;
  street: string;
  city: string;
  state: string;
};

function AllAddresses() {
  const { user, setUser } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<addressType>();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const submitAddress: SubmitHandler<addressType> = async (data) => {
    try {
      const newData = await addNewAddress({
        ...data,
        id: (Math.random() * 10000).toFixed(0),
      });
      if (!newData) throw new Error("Something went wrong!");
      setUser(newData);
      toast.success("Added new address successfully!");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to add new address!");
    } finally {
      setOpenModal(false);
      reset({
        id: "",
        Name: "",
        phone: "",
        zip: "",
        street: "",
        city: "",
        state: "",
      });
    }
  };

  return (
    <div className="flex flex-col col-span-12 md:col-span-8 px-3 py-7 gap-y-7">
      {(user?.address?.length ?? 0) < 3 && (
        <Button
          onClick={() => setOpenModal((prev) => !prev)}
          className="flex items-center justify-center gap-3 py-4 w-full md:w-1/3"
        >
          <span>
            <GoPlus />
          </span>
          Add New Address
        </Button>
      )}

      <ul className="space-y-4">
        {user?.address &&
          user.address.map((address) => (
            <AddressCard address={address} key={address.id} />
          ))}
      </ul>

      {openModal && (
        <section className="absolute top-0 left-0 z-50 flex justify-center w-full h-full bg-black/25">
          <form
            onSubmit={handleSubmit(submitAddress)}
            className="relative flex flex-col w-11/12 md:w-5/6 lg:w-1/2 px-5 md:px-10 py-10 space-y-4 bg-white rounded top-10 h-fit"
          >
            <span
              className="absolute top-0 right-0 z-50 p-2 text-4xl text-white duration-500 bg-indigo-600 rounded cursor-pointer hover:bg-opacity-75"
              onClick={() => setOpenModal(false)}
            >
              <CgClose />
            </span>
            <h2 className="text-xl font-semibold text-gray-800">New Address</h2>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="Name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="Name"
                  {...register("Name", { required: true })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Adel Yasser"
                />
                {errors.Name && (
                  <span className="text-sm text-red-500">Name is required</span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="street"
                  className="text-sm font-medium text-gray-700"
                >
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  {...register("street", { required: true })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="123 Main St"
                />
                {errors.street && (
                  <span className="text-sm text-red-500">
                    Street address is required
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city", { required: true })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="New York"
                />
                {errors.city && (
                  <span className="text-sm text-red-500">City is required</span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="state"
                  className="text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", { required: true })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="NY"
                />
                {errors.state && (
                  <span className="text-sm text-red-500">
                    State is required
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="zip"
                  className="text-sm font-medium text-gray-700"
                >
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  {...register("zip", { required: true })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="10001"
                />
                {errors.zip && (
                  <span className="text-sm text-red-500">
                    ZIP code is required
                  </span>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: true,
                    pattern:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim,
                  })}
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="+1 123 123 1234"
                />
                {errors.phone && (
                  <span className="text-sm text-red-500">
                    Phone is required
                  </span>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="p-3 text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
            >
              Save Address
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default AllAddresses;
