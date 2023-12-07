import Image from "next/image";
import {
  Call,
  Facebook,
  Grocery,
  Instagram,
  LinkedIn,
  Location,
  Mail,
  Payment,
  Time,
  Twitter,
} from "../../../../public/assets";
import Container from "../container";
import Link from "next/link";

const details = [
  { id: 1, icon: Location, title: "Address", value: "1762 School House Road" },
  { id: 2, icon: Call, title: "Call Us", value: "1233-777" },
  { id: 3, icon: Mail, title: "Email", value: "groceyish@contact.com" },
  {
    id: 4,
    icon: Time,
    title: "Work hours",
    value: "8:00 - 20:00, Sunday -  Thursday",
  },
];

const navs = [
  {
    id: 1,
    title: "Account",
    links: [
      { title: "Wishlist", link: "/wishlist" },
      { title: "Cart", link: "/cart" },
      { title: "Orders", link: "/orders" },
      { title: "Address", link: "/address" },
    ],
  },
  {
    id: 2,
    title: "Useful links",
    links: [
      { title: "Home", link: "/home" },
      { title: "About Us", link: "/about-us" },
      { title: "Hot Deals", link: "/hot-deals" },
      { title: "New Products", link: "/new-products" },
    ],
  },
  {
    id: 3,
    title: "Help Center",
    links: [
      { title: "Payments", link: "/home" },
      { title: "Refund", link: "/home" },
      { title: "Checkout", link: "/home" },
      { title: "Shipping", link: "/home" },
      { title: "Q&A", link: "/home" },
      { title: "Privacy Policy", link: "/home" },
    ],
  },
];

const socials = [Facebook, Instagram, LinkedIn, Twitter];

export default function Footer() {
  return (
    <Container>
      <div className=" flex py-16 border-t-2 border-[#0000000D] border-b-2">
        <div className=" basis-2/5">
          <div className=" flex items-center">
            <Image src={Grocery} width={60} height={60} alt="grocery-logo" />
            <div className="h-fit">
              <h4 className=" text-xl color-active font-bold">GroceEase</h4>
              <h4 className=" text-base color-disabled font-medium">GROCERY</h4>
            </div>
          </div>
          <div className=" mt-12 flex flex-col gap-7">
            {details.map((detail) => (
              <div key={detail.id} className=" flex gap-1 items-center">
                <Image
                  src={detail.icon}
                  width={20}
                  height={20}
                  alt={detail.title}
                />
                <p className=" text-base font-medium color-primary">
                  <span className=" font-bold">{detail.title}: </span>
                  {detail.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className=" basis-3/4 flex">
          {navs.map((nav) => (
            <div className=" basis-1/3" key={nav.id}>
              <h3 className=" text-2xl font-semibold color-primary">
                {nav.title}
              </h3>
              <div className=" mt-14 flex flex-col gap-2">
                {nav.links.map((link) => (
                  <Link href={link.link} key={link.title} className=" w-fit">
                    <p className=" text-base font-medium color-primary hover:text-[#3bb77e] w-fit hover:underline">
                      {link.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" flex justify-between items-center py-5">
        <div>
          <p>© 2023, All rights reserved</p>
        </div>
        <div>
          <Image src={Payment} alt="payment" />
        </div>
        <div className=" flex gap-3">
          {socials.map((social, i) => (
            <div
              key={i}
              className=" bg-green-700 p-2 rounded-full cursor-pointer"
            >
              <Image src={social} alt="social" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
