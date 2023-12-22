import { getCategoriesWithChildren } from "@/actions/categories";
import Container from "@/components/common/container";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const { data } = await getCategoriesWithChildren();
  return (
    <Container>
      <div className=" flex flex-col gap-10 pt-12 lg:pt-20 pb-24">
        {data?.map((item) => {
          return (
            <div key={item._id}>
              <div className=" lg:flex px-4 lg:px-0">
                <div className=" basis-1/2">
                  <h1 className=" text-3xl font-semibold color-primary hover:underline hover:text-[#3bb77e] w-fit mx-auto lg:mx-0">
                    <Link href={`products/${item.parent._id}`}>
                      {item.parent.Name}
                    </Link>
                  </h1>
                  <div className=" flex lg:hidden justify-center basis-1/2 my-2">
                    <Image
                      className=" w-[300px] h-[250px] object-cover rounded-lg"
                      src={item.parent.Image}
                      width={300}
                      height={250}
                      alt={item.parent.Name}
                    />
                  </div>
                  <p className=" basis-1/2 my-4 text-lg font-medium color-primary">
                    {item.parent.Description}
                  </p>
                  <div className=" flex flex-wrap">
                    {item.children.map((child) => {
                      return (
                        <div className=" basis-1/2 my-1" key={child._id}>
                          <p className=" text-base font-medium hover:underline hover:text-[#3bb77e] w-fit line-clamp-1">
                            <Link
                              href={`products/${item.parent._id}?subcat=${child._id}`}
                            >
                              {child.Name}
                            </Link>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className=" hidden lg:flex justify-center basis-1/2">
                  <Image
                    className=" w-[400px] h-[300px] object-cover rounded-lg sticky top-4"
                    src={item.parent.Image}
                    width={400}
                    height={300}
                    alt={item.parent.Name}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
