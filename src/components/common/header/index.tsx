"use client";
import Image from "next/image";
import Container from "../container";

import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  Call,
  Cart,
  CartActive,
  Grid,
  GridActive,
  GridBlack,
  Grocery,
  Hamburger,
  Home,
  HomeActive,
  Logout,
  OrderActive,
  Orders,
  Search,
} from "../../../../public/assets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { getCategories } from "@/actions/categories";
import { User } from "@/types/user";
import { getMyDetails, logout } from "@/actions/user";
import { cookies } from "next/headers";
const tabs = [
  {
    id: 1,
    title: "Home",
    icon: Home,
    activeIcon: HomeActive,
    activePath: "/home",
  },
  {
    id: 2,
    title: "Orders",
    icon: Orders,
    activeIcon: OrderActive,
    activePath: "/orders",
  },
];

const mobileTtabs = [
  {
    id: 1,
    title: "Home",
    icon: Home,
    activeIcon: HomeActive,
    activePath: "/home",
  },
  {
    id: 2,
    title: "Categories",
    icon: GridBlack,
    activeIcon: GridActive,
    activePath: "/categories",
  },
  {
    id: 3,
    title: "Orders",
    icon: Orders,
    activeIcon: OrderActive,
    activePath: "/orders",
  },
  {
    id: 4,
    title: "Cart",
    icon: Cart,
    activeIcon: CartActive,
    activePath: "/cart",
  },
];

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const pathName = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      const { data } = await getCategories();
      if (data) {
        setCategories(data);
      }
    };
    if (categories.length === 0) {
      getData();
    }
    if (pathName === "/search") {
      setSelectedCategory(params.get("c") ?? null);
      setSearch(params.get("s") ?? "");
    }
  }, [params, categories, pathName]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await getMyDetails();
      if (data) {
        setUser(data);
      }
    };
    getUser();
  }, []);
  return (
    <main>
      <Navbar fluid className="hidden md:block">
        <Container>
          <div className=" flex py-5 justify-between">
            <Link href="/home">
              <div className=" flex items-center">
                <Image
                  src={Grocery}
                  width={40}
                  height={40}
                  alt="grocery-logo"
                />
                <div className="h-fit">
                  <h4 className=" text-sm color-active font-bold">GroceEase</h4>
                  <h4 className=" text-xs color-disabled font-medium">
                    GROCERY
                  </h4>
                </div>
              </div>
            </Link>
            <div className=" flex bg-[#F3F3F3] items-center gap-3">
              <Dropdown
                inline
                label={
                  <p className="text-center font-medium line-clamp-1 color-primary w-44">
                    {categories?.find(
                      (category) => category._id === selectedCategory
                    )?.Name ?? "All Categories"}
                  </p>
                }
                className=""
              >
                <div className=" h-48 overflow-scroll">
                  <Dropdown.Item
                    className={`${
                      selectedCategory === null ? "bg-green-200" : ""
                    } hover:!bg-green-200`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </Dropdown.Item>
                  {categories?.map((category) => (
                    <Dropdown.Item
                      className={`${
                        selectedCategory === category._id ? "bg-green-200" : ""
                      } hover:!bg-green-200`}
                      onClick={() => setSelectedCategory(category._id)}
                      key={category._id}
                    >
                      {category.Name}
                    </Dropdown.Item>
                  ))}
                </div>
              </Dropdown>
              <div className=" w-[1px] h-3 bg-[#ADADAD]" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  router.push(
                    `/search?s=${search}&c=${selectedCategory ?? "all"}`
                  );
                }}
              >
                <input
                  className=" bg-transparent focus:outline-none w-96"
                  placeholder="Search for items..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
              <div
                onClick={() =>
                  router.push(
                    `/search?s=${search}&c=${selectedCategory ?? "all"}`
                  )
                }
                className="bg-[#3BB77E] p-2 cursor-pointer"
              >
                <Image
                  src={Search}
                  width={24}
                  height={24}
                  alt="grocery-search"
                />
              </div>
            </div>
            <div className=" flex gap-12 items-center">
              <Link href={"/cart"} className=" flex items-center gap-2">
                <div className=" relative">
                  <Image
                    src={pathName === "/cart" ? CartActive : Cart}
                    width={24}
                    height={24}
                    color="red"
                    alt="wishlist"
                    className=" fill-red"
                  />
                </div>
                <h4
                  className={` text-sm font-semibold ${
                    pathName === "/cart" ? "color-active" : "color-primary"
                  }`}
                >
                  My cart
                </h4>
              </Link>
              <div className=" flex items-center gap-2">
                <Avatar size="sm" rounded />
                <h4 className="color-primary font-bold">{user?.Name}</h4>
              </div>
              <div
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className=" flex items-center gap-2 cursor-pointer"
              >
                <Image src={Logout} width={24} height={24} alt="logut" />
                <h4 className="color-primary font-bold">Logout</h4>
              </div>
            </div>
          </div>
        </Container>
        <div className=" border-[#ADADAD2B] border-t-[1px] w-full" />
        <Container>
          <div className=" flex py-2 justify-between items-center">
            <Link href="/categories" title="categories">
              <div className="bg-[#3BB77E] flex p-4 rounded-lg gap-2">
                <Image src={Grid} width={24} height={24} alt="wishlist" />
                <p className=" text-base text-white font-bold">
                  Browse All Categories
                </p>
              </div>
            </Link>
            <div className=" flex items-center gap-11">
              {tabs.map((tab) => {
                return (
                  <Link key={tab.id} href={tab.activePath}>
                    <div className=" flex items-center gap-1">
                      <Image
                        src={
                          pathName === tab.activePath
                            ? tab.activeIcon
                            : tab.icon
                        }
                        width={20}
                        height={20}
                        alt={tab.title}
                      />
                      <h4
                        className={`font-medium text-base ${
                          pathName === tab.activePath
                            ? "color-active"
                            : "color-primary"
                        }`}
                      >
                        {tab.title}
                      </h4>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div className=" flex items-center gap-1">
              <Image src={Call} width={24} height={24} alt="phone" />
              <h4 className=" text-lg font-semibold color-active">1233-7777</h4>
              <h4 className=" text-lg font-semibold color-primary">
                24/7 support center
              </h4>
            </div>
          </div>
        </Container>
      </Navbar>
      <Navbar fluid className="md:hidden">
        <Container>
          <div className=" flex py-3 justify-between">
            <Link href="/home">
              <div className=" flex items-center">
                <Image
                  src={Grocery}
                  width={40}
                  height={40}
                  alt="grocery-logo"
                />
                <div className="h-fit">
                  <h4 className=" text-sm color-active font-bold">GroceEase</h4>
                  <h4 className=" text-xs color-disabled font-medium">
                    GROCERY
                  </h4>
                </div>
              </div>
            </Link>
            <Image
              onClick={() => setToggle(!toggle)}
              src={Hamburger}
              alt="hamburger-menu"
            />
          </div>
        </Container>
        <div className=" border-[#ADADAD2B] border-t-[1px] w-full" />
        <Container>
          {toggle && (
            <div className=" absolute left-0 pb-4 bg-white z-10 w-full">
              {mobileTtabs.map((tab) => {
                return (
                  <Link
                    onClick={() => setToggle(false)}
                    href={tab.activePath}
                    key={tab.id}
                    className=" flex items-center gap-3 mx-4 my-2"
                  >
                    <Image
                      src={
                        pathName === tab.activePath ? tab.activeIcon : tab.icon
                      }
                      width={20}
                      height={20}
                      alt={tab.title}
                    />
                    <h4
                      className={` font-semibold text-xl ${
                        pathName === tab.activePath
                          ? "color-active"
                          : "color-primary"
                      }`}
                    >
                      {tab.title}
                    </h4>
                  </Link>
                );
              })}
              <div
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
                className=" flex items-center gap-3 mx-4 my-2"
              >
                <Image src={Logout} width={20} height={20} alt="logut" />
                <h4 className="font-semibold text-xl">Logout</h4>
              </div>
            </div>
          )}
          <div className=" flex bg-[#F3F3F3]  items-center gap-2 justify-between">
            <Dropdown
              inline
              label={
                <p className="text-center font-medium line-clamp-1 color-primary w-22 px-1">
                  {categories?.find(
                    (category) => category._id === selectedCategory
                  )?.Name ?? "All Categories"}
                </p>
              }
              className=""
            >
              <div className=" h-48 overflow-scroll">
                <Dropdown.Item
                  className={`${
                    selectedCategory === null ? "bg-green-200" : ""
                  } hover:!bg-green-200`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Dropdown.Item>
                {categories?.map((category) => (
                  <Dropdown.Item
                    className={`${
                      selectedCategory === category._id ? "bg-green-200" : ""
                    } hover:!bg-green-200`}
                    onClick={() => setSelectedCategory(category._id)}
                    key={category._id}
                  >
                    {category.Name}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
            <div className=" w-[1px] h-3 bg-[#ADADAD]" />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(
                  `/search?s=${search}&c=${selectedCategory ?? "all"}`
                );
              }}
            >
              <input
                className=" bg-transparent focus:outline-none"
                placeholder="Search for items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <div
              className="bg-[#3BB77E] p-2"
              onClick={() =>
                router.push(
                  `/search?s=${search}&c=${selectedCategory ?? "all"}`
                )
              }
            >
              <Image src={Search} width={24} height={24} alt="grocery-search" />
            </div>
          </div>
        </Container>
      </Navbar>
    </main>
  );
}
