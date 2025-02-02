"use client";

import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdPhoneInTalk } from "react-icons/md";
import { addressType } from "./AllAddresses";
import { editAddress, removeAddress } from "../_lib/userApi";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

function AddressCard({ address }: { address: addressType }) {
  const { Name, phone, street, city, state, zip, id } = address;
  const { setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<addressType>({
    defaultValues: address,
  });

  const handleDelete = async () => {
    try {
      const updatedUser = await removeAddress(id);
      setUser(updatedUser);
      toast.success("Address deleted successfully!");
    } catch (error) {
      if (error instanceof Error) toast.error("Failed to delete address.");
      toast.error("Unknown Error.");
    }
  };

  const handleEdit: SubmitHandler<addressType> = async (data) => {
    try {
      const updatedUser = await editAddress(data);
      setUser(updatedUser);
      toast.success("Address updated successfully!");
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to update address.");
    }
  };

  return (
    <li className="flex items-center justify-between rounded ring-1 ring-black/50 px-7 py-7">
      {isEditing ? (
        <form onSubmit={handleSubmit(handleEdit)} className="w-full">
          <div className="flex flex-col gap-4">
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
              />
              {errors.state && (
                <span className="text-sm text-red-500">State is required</span>
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
                Phone
              </label>
              <input
                type="text"
                id="phone"
                {...register("phone", { required: true })}
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.phone && (
                <span className="text-sm text-red-500">Phone is required</span>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="p-3 text-white transition-colors duration-200 bg-indigo-500 rounded-lg hover:bg-indigo-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-3 text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold">{Name}</h3>
            <h5 className="text-lg">{`${street}, ${city}, ${state} ${zip}`}</h5>
            <p className="flex items-center gap-2">
              <span>
                <MdPhoneInTalk />
              </span>
              {phone}
            </p>
          </div>
          <div className="flex flex-col gap-4 [&>button]:flex [&>button]:items-center [&>button]:gap-3 [&>button]:justify-center">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-black duration-500 rounded bg-black/5 hover:bg-black/50 hover:text-white"
            >
              <FiEdit />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-3 py-2 text-red-500 duration-500 bg-red-200 rounded hover:text-white hover:bg-red-500"
            >
              <FaRegTrashAlt />
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default AddressCard;
