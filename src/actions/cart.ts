"use server";

import { CartItem, Itinerary } from "@/types/cart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getCartItems() {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      next: { tags: ["cartItems"], revalidate: 3600 },
    });
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        data: response?.data as CartItem[],
      };
    }
    return {
      success: false,
      error: "Failed to fetch cart items",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function addToCart(productId: string) {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/cartItems/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    if (res.status === 204) {
      setTimeout(() => {
        revalidateTag("cartItems");
        revalidateTag("itinerary");
      }, 100);
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Failed to add product",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/cartItems/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-cache",
      }
    );
    if (res.status === 204) {
      setTimeout(() => {
        revalidateTag("cartItems");
        revalidateTag("itinerary");
      }, 100);
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Failed to remove product",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function getProductCount(productId: string) {
  try {
    const token = cookies().get("token");
    const res = await fetch(
      `${process.env.API_HOST}/api/cartItems/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-cache",
      }
    );
    const response = await res.json();
    if (res.status === 200) {
      return {
        success: true,
        data: response as { success: boolean; count: number },
      };
    }
    return {
      success: false,
      error: "Failed to remove product",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}

export async function getCartItemsCount() {
  const res = await fetch(`${process.env.API_HOST}/api/cartItems/count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 * 60, tags: ["cart"] },
  });
}

export async function getItinerary() {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/cart/itinerary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
      cache: "no-cache",
    });
    if (res.status === 204) {
      return {
        success: true,
        empty: true,
      };
    }
    const response = await res.json();
    if (res.status === 200 && response?.success) {
      return {
        success: true,
        empty: false,
        data: response?.data as Itinerary,
      };
    }
    return {
      success: false,
      error: "Failed to fetch cart items",
    };
  } catch (error) {
    return {
      success: false,
      error: "Something went wrong",
    };
  }
}
