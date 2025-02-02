"use client";
import { useEffect, useState } from "react";
import OrderAction from "./OrderAction";
import { SanityDocument } from "next-sanity";
import { getOrders } from "../_lib/userApi";
import { toast } from "react-toastify";
import ReviewProduct from "./ReviewProduct";
import Link from "next/link";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../_lib/firebase";

function Orders() {
  const [orders, setOrders] = useState<SanityDocument[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchOrders();
      } else {
        setUser(null);
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const orders = await getOrders();
      setOrders(orders);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unknown error happened"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders?.filter((order) =>
    activeFilter === "All" ? true : order.status === activeFilter
  );

  if (loading)
    return (
      <div className="flex items-center justify-center col-span-6 overflow-x-hidden">
        <span className="block border-4 border-gray-300 rounded-full animate-spin h-14 w-14 border-r-indigo-500"></span>
      </div>
    );

  return (
    <section className="flex flex-col col-span-12 md:col-span-8 px-3 md:px-6 py-10 rounded gap-y-7 ring-1 ring-black/25">
      <OrderAction
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <div className="flex flex-col px-2 md:px-4 max-h-[500px] overflow-y-auto gap-y-4">
        {filteredOrders?.length > 0 ? (
          filteredOrders?.map((order) => (
            <div
              key={order.id}
              className="flex flex-wrap items-center justify-between border-b md:flex-row border-black/25"
            >
              <div>
                {order.cartProducts.map(
                  (product: SanityDocument, i: number) => (
                    <ReviewProduct cartProduct={product} key={i} />
                  )
                )}
              </div>
              <div className="flex flex-col gap-1.5 text-base xl:text-lg">
                <h2 className="[&>span]:font-bold">
                  Order ID: <span>{order.id}</span>
                </h2>
                <p
                  className={`${
                    order.status === "Not Submitted"
                      ? "[&>span]:text-red-500 [&>span]:font-bold"
                      : "[&>span]:text-green-600 [&>span]:font-bold"
                  }`}
                >
                  Status:{" "}
                  <span>
                    {order.status === "Not Submitted" ? (
                      <Link
                        className="font-bold underline"
                        href={`/review?order=${order.id}`}
                      >
                        Not Submitted
                      </Link>
                    ) : (
                      order.status
                    )}
                  </span>
                </p>
                <p className="[&>span]:font-bold">
                  Created At:{" "}
                  <span>
                    {new Date(
                      new Date(order.Created_At).getTime() +
                        7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
          ))
        ) : filteredOrders?.length === 0 ? (
          <p className="flex flex-col items-center text-xl xl:text-2xl gap-y-3">
            No {activeFilter !== "All" && `"${activeFilter}"`} Orders in this
            account{" "}
            <Link className="font-bold underline" href={"/shop"}>
              Let&apos;s make one! 😇
            </Link>
          </p>
        ) : !orders ? (
          <p className="flex flex-col items-center text-xl xl:text-2xl gap-y-3">
            No Orders in this account{" "}
            <Link className="font-bold underline" href={"/shop"}>
              Let&apos;s add one! 😇
            </Link>
          </p>
        ) : (
          <p className="flex flex-col items-center text-xl xl:text-2xl gap-y-3">
            Something went wrong!{" "}
            <Link className="font-bold underline" href={"/account"}>
              Try Again
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default Orders;
