"use client";
import { Order, OrderDetails } from "@/types/order";
import Image from "next/image";
import { Grocery } from "../../../../../public/assets";
import { formatTimestamp } from "@/utils/date";
import { getOrderDetails } from "@/actions/order";
import { useState } from "react";
import { Modal } from "flowbite-react";

export default function Items({ orders }: { orders: Order[] }) {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState({ id: "", state: false });
  const [showModal, setShowModal] = useState(false);

  const getDetails = async (id: string) => {
    setLoading({ id, state: true });
    const { success, data } = await getOrderDetails(id);
    if (success && data) {
      setOrder(data);
      setShowModal(true);
    }
    setLoading({ id: "", state: false });
  };

  return (
    <div className=" flex flex-col gap-4 mb-11 mt-6">
      {orders.map((item) => (
        <div
          key={item._id}
          className=" shadow rounded-xl border lg:flex items-center p-4 lg:p-5 justify-between"
        >
          <div className="me-4">
            <Image src={Grocery} alt="grocery" />
          </div>
          <div className=" grow">
            <p className=" text-base font-medium color-primary">
              <span className=" font-bold">Order Id: </span> {item._id}
            </p>
            <p className=" text-base font-medium u capitalize color-primary flex my-1">
              <span className=" font-bold">Delivery Status: </span>
              {item.Status === "pending" && (
                <span className="inline-flex items-center ms-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                  <span className=" text-sm font-medium">Pending</span>
                </span>
              )}
              {item.Status === "completed" && (
                <span className="inline-flex items-center ms-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  <span className=" text-sm font-medium">Delivered</span>
                </span>
              )}
            </p>
            <p className=" text-base font-medium color-primary">
              <span className=" font-bold">Placed On: </span>
              {formatTimestamp(item.OrderDate)}
            </p>
          </div>
          <div className=" relative overflow-hidden mt-4 lg:mt-0">
            <button
              onClick={() => getDetails(item._id)}
              className=" bg-[#52b38b] hover:bg-[#1F8A70] font-bold text-base p-1 px-3 rounded w-full text-white"
            >
              View Details
            </button>
            {loading.id === item._id && loading.state && (
              <div className=" absolute bottom-0 h-1 rounded-b animate-loading bg-green-700" />
            )}
          </div>
        </div>
      ))}
      <Modal
        position="center"
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <Modal.Header>
          <p>Order Id: {order?.OrderDetails?._id}</p>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-2 color-primary">
              Order Summary
            </h2>
            <p className=" text-base font-medium color-primary">
              <span className=" font-bold">Order Date: </span>{" "}
              {formatTimestamp(
                order?.OrderDetails.OrderDate ?? new Date().toISOString()
              )}
            </p>
            <p className="text-base font-medium color-primary">
              <span className=" font-bold">Total Amount:</span> ₹
              {order?.OrderDetails.TotalAmount.toFixed(2)}
            </p>
            <p className=" text-base font-medium u capitalize color-primary flex my-1">
              <span className=" font-bold">Delivery Status: </span>
              {order?.OrderDetails.Status === "pending" && (
                <span className="inline-flex items-center ms-2 bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                  <span className=" text-sm font-medium">Pending</span>
                </span>
              )}
              {order?.OrderDetails.Status === "completed" && (
                <span className="inline-flex items-center ms-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                  <span className=" text-sm font-medium">Delivered</span>
                </span>
              )}
            </p>
            {order?.OrderDetails.Notes && (
              <p className="text-base font-medium color-primary">
                <span className=" font-bold">Delivery Note:</span> ₹
                {order?.OrderDetails.Notes}
              </p>
            )}
          </div>

          <div className=" mb-8">
            <h2 className="text-lg font-bold mb-2">Delivery Address</h2>
            <p className="">{order?.DeliveryAddressDetails.AddressLine1}</p>
            <p>
              {order?.DeliveryAddressDetails.City},{" "}
              {order?.DeliveryAddressDetails.State}{" "}
              {order?.DeliveryAddressDetails.ZipCode}
            </p>
          </div>

          <h2 className="text-lg font-bold mb-2 color-primary">Order Items</h2>
          <div className=" flex flex-col gap-6">
            {order?.OrderItems?.map((item) => (
              <div
                key={item.Order._id}
                className=" flex items-center gap-4 justify-between"
              >
                <div className=" flex items-center gap-4">
                  <Image
                    src={item.Product.Image}
                    alt="product image"
                    width={64}
                    height={70}
                  />
                  <div>
                    <p className=" text-sm font-semibold color-primary">
                      {item.Product.Brand}
                    </p>
                    <p className=" text-base font-medium color-primary line-clamp-1">
                      {item.Product.Name}
                    </p>
                    <p className=" text-base font-medium color-primary">
                      {item.Product.Quantity}
                    </p>
                  </div>
                </div>
                <p className=" text-lg font-semibold color-primary">
                  {item.Order.Quantity}
                </p>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
