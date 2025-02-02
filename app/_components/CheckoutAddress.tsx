import { useForm, SubmitHandler } from "react-hook-form";
import { addNewAddress } from "../_lib/userApi";
import { addressType } from "../_components/AllAddresses";
import { Dispatch, SetStateAction, useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import { PaymentType } from "./CartOpertions";

function CheckoutAddress({
  setPayment,
}: {
  setPayment: Dispatch<SetStateAction<PaymentType | null>>;
}) {
  const { handleSubmit, register, reset } = useForm<addressType>();
  const { user, setUser } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<addressType | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const handleAddAddress: SubmitHandler<addressType> = async (data) => {
    try {
      const newAddress = { ...data, id: (Math.random() * 10000).toFixed(0) };
      const updatedUser = await addNewAddress(newAddress);
      if (!updatedUser) throw new Error("Failed to add address");

      setUser(updatedUser);
      reset();
      setShowForm(false);
      toast.success("Address added successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Address addition failed"
      );
    }
  };

  const handleSelectAddress = () => {
    if (!selectedAddress) return toast.error("Please select an address");
    setPayment((prev) => ({ ...prev!, Address: selectedAddress }));
    toast.success("Address selected successfully");
  };

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Select Address</h2>

      <div className="flex flex-col space-y-2">
        {user?.address?.map((address) => (
          <div
            key={address.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedAddress?.id === address.id
                ? "border-black bg-black/5"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedAddress(address)}
          >
            <h3 className="font-bold">{address.Name}</h3>
            <p>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</p>
            <p>{address.phone}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleSelectAddress}
        disabled={!selectedAddress}
        className="p-2 text-white bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Use Selected Address
      </button>

      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className={`p-3 text-white transition-colors duration-200 rounded-lg ${
          showForm
            ? "bg-red-600 hover:bg-red-500"
            : "bg-black hover:bg-black/75"
        }`}
      >
        {showForm ? "Cancel" : "Add New Address"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit(handleAddAddress)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("Name", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Adel Yasser"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: true,
                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
              })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="+1 123 123 1234"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Street</label>
            <input
              {...register("street", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="123 Main St"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">City</label>
            <input
              {...register("city", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="New York"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">State</label>
            <input
              {...register("state", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="NY"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">ZIP</label>
            <input
              {...register("zip", { required: true })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="10001"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 p-3 text-white transition-colors duration-200 bg-black rounded-lg hover:bg-black/75"
          >
            Save Address
          </button>
        </form>
      )}
    </div>
  );
}

export default CheckoutAddress;
