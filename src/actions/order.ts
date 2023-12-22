"use server";

import { Itinerary } from "@/types/cart";
import { Order, OrderDetails } from "@/types/order";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type OrderParams = {
  itinerary: Itinerary;
  note?: string;
  deliveryAddress: string;
};

export const postOrder = async ({
  itinerary,
  deliveryAddress,
  note,
}: OrderParams) => {
  try {
    const token = cookies().get("token");
    const data: any = {
      deliveryAddress,
      paymentMethod: "online",
      paymentStatus: "completed",
      totalAmount: itinerary.TotalNetPrice,
    };
    if (note) data.note = note;
    const res = await fetch(`${process.env.API_HOST}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      body: JSON.stringify(data),
      cache: "no-cache",
    });
    if (res.status === 201) {
      revalidatePath("/orders");
      setTimeout(() => {
        revalidateTag("cartItems");
        revalidateTag("itinerary");
        revalidateTag("orders");
      }, 0);
      return {
        success: true,
        message: "Order Places Successfully",
      };
    }
    return {
      success: false,
      message: "Failed to Place Order",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to Place Order",
    };
  }
};

export const getOrders = async () => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      next: { revalidate: 24 * 60 * 60, tags: ["orders"] },
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as Order[],
      };
    }
    return {
      success: false,
      error: "Failed to fetch orders",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const getOrderDetails = async (id: string) => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/order/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-cache",
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as OrderDetails,
      };
    }
    return {
      success: false,
      error: "Failed to fetch order Details",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
