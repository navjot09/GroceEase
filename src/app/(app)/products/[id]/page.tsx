import Container from "@/components/common/container";
import { Grid } from "@/components/screen/products/grid";
import { Tabs } from "@/components/screen/products/tabs";
import { CategoryWithChildren } from "@/types/category";
import { Product } from "@/types/product";
import { cookies } from "next/headers";

const getCategories = async (id: string) => {
  try {
    const token = cookies().get("token");
    const res = await fetch(`${process.env.API_HOST}/api/categories/${id}`, {
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
        data: response?.data as CategoryWithChildren,
      };
    }
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  } catch (error) {
    return {
      success: false,
      error: "Error Fetching Categories",
    };
  }
};
export default async function CategoriesDetails({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await getCategories(params.id);
  return (
    <Container>
      <div className=" lg:flex">
        <div className=" basis-1/5">
          {data && <Tabs data={data} parent={params.id} />}
        </div>
        <div className=" basis-4/5">
          <Grid category={params.id} />
        </div>
      </div>
    </Container>
  );
}
