"use client";
import { getAddress } from "@/actions/address";
import { getItinerary } from "@/actions/cart";
import AddAddress from "@/components/common/addAddress";
import { AddButton } from "@/components/common/addButton";
import Container from "@/components/common/container";
import { Address } from "@/types/address";
import { Itinerary } from "@/types/cart";
import { Dropdown, Label, Modal, Spinner, Textarea } from "flowbite-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Cart } from "../../../../public/assets";
import { postOrder } from "@/actions/order";
import { toast } from "react-toastify";

export default function Categories() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [addressId, setAddressId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [loadingOrder, setLoadingOrder] = useState(false);

  const getUserAddress = useCallback(async () => {
    const { success, error, data } = await getAddress();
    if (success && data) setAddress(data);
  }, []);

  const closeModal = useCallback(() => setShowModal(false), []);

  const getData = async () => {
    setLoading(true);
    const { data, success, empty } = await getItinerary();
    if (success && !empty && data) {
      setItinerary(data);
    } else {
      setItinerary(null);
    }
    setLoading(false);
  };

  const placeOrder = async () => {
    if (addressId && itinerary) {
      const { success, message } = await postOrder({
        deliveryAddress: addressId,
        itinerary,
        note,
      });
      if (success) {
        toast.success(message);
        getData();
      } else {
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    getData();
    getUserAddress();
  }, [getUserAddress]);

  if (loading && !itinerary)
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <Spinner color={"success"} size="xl" />
      </div>
    );
  if (!itinerary)
    return (
      <div className=" h-[70vh] flex justify-center items-center">
        <div>
          <Image width={200} src={Cart} alt="cart" />
          <p className=" text-3xl font-semibold color-primary">
            Your cart is empty!
          </p>
        </div>
      </div>
    );
  return (
    <Container>
      <div className=" lg:flex mb-12 lg:mb-16">
        <div className=" basis-2/3 mb-12 lg:mb-0 ">
          <div>
            <h1 className=" text-3xl font-semibold color-primary my-6 ms-3">
              My Cart
            </h1>
            <div className=" flex flex-col gap-4 px-4 lg:px-0">
              {itinerary?.CartItems.map((item) => (
                <div
                  key={item._id}
                  className=" flex justify-between lg:w-2/3 items-center"
                >
                  <div className=" flex gap-4 items-center">
                    <Image
                      className=" object-contain"
                      src={item.ProductDetails.Image}
                      width={100}
                      height={100}
                      alt="product-image"
                    />
                    <div>
                      <p className=" text-base font-medium color-primary line-clamp-1">
                        {item.ProductDetails.Name}
                      </p>
                      <p className=" font-medium text-sm color-primary">
                        {item.ProductDetails.Quantity}
                      </p>
                      <div className=" flex gap-1 items-baseline">
                        {item.ProductDetails.OnSale ? (
                          <>
                            <p className=" color-active text-base font-semibold">
                              ₹{item.ProductDetails.DiscountPrice}
                            </p>
                            <p className=" color-disabled text-sm font-medium line-through">
                              ₹{item.ProductDetails.Price}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className=" color-active text-base font-semibold">
                              ₹{item.ProductDetails.Price}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <AddButton
                      size="sm"
                      id={item.ProductId}
                      callback={getData}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className=" basis-1/3 bg-green-50 rounded-lg p-4 h-fit mx-4 lg:mx-0">
          <div>
            <h1 className=" text-xl font-semibold color-primary my-6">
              Bill Details
            </h1>
            <div className=" flex flex-col gap-2">
              <div className=" flex justify-between">
                <p className="font-medium text-base color-primary">
                  Total Price
                </p>
                <p className="font-medium text-lg color-primary">
                  ₹{itinerary?.TotalPrice?.toFixed(1)}
                </p>
              </div>
              <div className=" flex justify-between">
                <p className="font-medium text-base color-active ">You Save</p>
                <p className="font-medium text-lg color-active ">
                  (-) ₹{itinerary?.Saving?.toFixed(1)}
                </p>
              </div>
              <hr />
              <div className=" flex justify-between">
                <p className="font-medium text-lg color-primary">Final Price</p>
                <p className="font-medium text-lg color-primary">
                  ₹{itinerary?.TotalNetPrice?.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <div className=" my-6">
            <div className="flex justify-between items-center">
              <h1 className=" text-xl font-semibold color-primary my-3">
                Delivery Address
              </h1>
              <h1
                onClick={() => setShowModal(true)}
                className=" text-base font-semibold color-active cursor-pointer"
              >
                + Add
              </h1>
            </div>
            <div className=" bg-[#D1E8E4] p-2 rounded relative left-0">
              <Dropdown
                className=" w-full"
                label={
                  <h1 className="text-base font-medium color-primary">
                    {address.find((item) => item._id === addressId)
                      ?.AddressLine1 ?? "Select Address"}
                  </h1>
                }
                inline
              >
                <div className=" max-h-48 overflow-scroll">
                  {address.map((item) => (
                    <Dropdown.Item
                      className={`${
                        addressId === item._id ? "bg-green-200" : ""
                      } hover:!bg-green-200`}
                      onClick={() => setAddressId(item._id)}
                      key={item._id}
                    >
                      <div className=" text-start color-primary font-medium">
                        <p>{item.AddressLine1}</p>
                        <p>
                          {item.City}, {item.State}
                        </p>
                        <p>{item.ZipCode}</p>
                      </div>
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown>
            </div>
          </div>
          <div className=" mb-6">
            <Label>
              <p className=" text-base font-medium">Delivery Note</p>
            </Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className=" text-base font-medium color-primary"
              placeholder="Write note here..."
            />
          </div>
          <div className=" relative overflow-hidden">
            <button
              disabled={loading || !addressId}
              onClick={placeOrder}
              className=" bg-[#52b38b] hover:bg-[#1F8A70] font-bold text-xl p-2 rounded-lg w-full text-white disabled:bg-gray-300"
            >
              Place Order
            </button>
            {loadingOrder && (
              <div className=" absolute bottom-0 h-1 rounded-b animate-loading bg-green-700" />
            )}
          </div>
        </div>
      </div>
      <AddAddress
        showModal={showModal}
        onClose={closeModal}
        callback={getUserAddress}
      />
    </Container>
  );
}
