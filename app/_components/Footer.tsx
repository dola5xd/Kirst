import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import Subscribe from "./Subscribe";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";

function Footer() {
  return (
    <footer className="flex flex-col py-20 text-white bg-black px-7 xl:px-20 gap-7">
      <div className="flex flex-col items-start justify-between gap-10 xl:flex-row xl:gap-0">
        <div className="flex flex-col gap-7">
          <span>
            <svg
              width="143"
              height="44"
              viewBox="0 0 143 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0.897705V16.6108L9.39604 9.38717L0 0.897705Z"
                fill="#fff"
              />
              <path
                d="M0 43.1381L9.39604 34.6506L0 27.4325V43.1381Z"
                fill="#fff"
              />
              <path
                d="M17.6191 19.8653L41.2598 0.897339H27.4806L0 22.0224L17.6191 19.8653Z"
                fill="#fff"
              />
              <path
                d="M0 22.0223L27.4806 43.1393H41.2598L17.6191 24.1677L0 22.0223Z"
                fill="#fff"
              />
              <path
                d="M48.6411 2.71947H53.2872V40.9814H48.6411V2.71947ZM68.3187 2.71947H74.058L57.496 20.6479L74.8779 40.9814H69.1386L51.8661 20.7572L68.3187 2.71947Z"
                fill="#fff"
              />
              <path
                d="M83.647 15.8379V40.9814H79.2742V15.8379H83.647ZM91.2447 20.6479C90.6617 20.2106 90.1333 19.9009 89.6596 19.7187C89.1858 19.5001 88.5846 19.3907 87.8558 19.3907C86.7626 19.3907 85.9062 19.6641 85.2868 20.2106C84.6673 20.7572 84.23 21.5043 83.9749 22.4517C83.7563 23.3991 83.647 24.4741 83.647 25.6766H81.6792C81.6792 23.6724 82.0254 21.9051 82.7178 20.3746C83.4465 18.8077 84.3758 17.5688 85.5054 16.6578C86.635 15.7468 87.7829 15.2913 88.949 15.2913C89.86 15.2913 90.6981 15.4188 91.4633 15.6739C92.265 15.8925 92.9938 16.348 93.6497 17.0404L91.2447 20.6479Z"
                fill="#fff"
              />
              <path
                d="M98.0101 5.45246C98.0101 4.61434 98.3017 3.90377 98.8847 3.32073C99.5042 2.73769 100.215 2.44617 101.016 2.44617C101.855 2.44617 102.565 2.73769 103.148 3.32073C103.731 3.90377 104.023 4.61434 104.023 5.45246C104.023 6.25414 103.731 6.96472 103.148 7.5842C102.565 8.16724 101.855 8.45876 101.016 8.45876C100.215 8.45876 99.5042 8.16724 98.8847 7.5842C98.3017 6.96472 98.0101 6.25414 98.0101 5.45246ZM98.83 15.8379H103.203V40.9814H98.83V15.8379Z"
                fill="#fff"
              />
              <path
                d="M113.247 33.2744C113.758 34.0396 114.341 34.7502 114.997 35.4061C115.652 36.062 116.4 36.5904 117.238 36.9913C118.112 37.3557 119.06 37.5379 120.08 37.5379C121.319 37.5379 122.285 37.2646 122.977 36.718C123.706 36.1349 124.07 35.3515 124.07 34.3676C124.07 33.493 123.779 32.7642 123.196 32.1812C122.649 31.5617 121.938 31.0515 121.064 30.6507C120.189 30.2134 119.26 29.8126 118.276 29.4482C117.183 29.0109 116.072 28.5007 114.942 27.9177C113.849 27.2982 112.919 26.5148 112.154 25.5673C111.425 24.5834 111.061 23.3627 111.061 21.9051C111.061 20.4111 111.444 19.1721 112.209 18.1882C113.011 17.2044 114.031 16.4756 115.27 16.0018C116.545 15.5281 117.857 15.2913 119.205 15.2913C120.554 15.2913 121.811 15.5099 122.977 15.9472C124.179 16.3845 125.236 16.9675 126.147 17.6963C127.058 18.4251 127.769 19.2632 128.279 20.2106L124.781 22.4517C124.088 21.5043 123.214 20.7208 122.157 20.1013C121.137 19.4818 119.971 19.1721 118.659 19.1721C117.748 19.1721 116.964 19.3725 116.308 19.7734C115.652 20.1742 115.325 20.7937 115.325 21.6318C115.325 22.2877 115.58 22.8708 116.09 23.3809C116.6 23.8911 117.256 24.3466 118.058 24.7474C118.859 25.1483 119.697 25.5309 120.572 25.8953C122.029 26.4783 123.36 27.116 124.562 27.8084C125.765 28.4643 126.712 29.266 127.404 30.2134C128.133 31.1609 128.498 32.3816 128.498 33.8756C128.498 36.062 127.696 37.884 126.093 39.3416C124.526 40.7992 122.449 41.528 119.861 41.528C118.185 41.528 116.673 41.2365 115.325 40.6535C113.976 40.034 112.828 39.2505 111.881 38.3031C110.97 37.3557 110.278 36.39 109.804 35.4061L113.247 33.2744Z"
                fill="#fff"
              />
              <path
                d="M130.428 15.8379H143V19.9374H130.428V15.8379ZM134.528 7.09226H138.9V40.9814H134.528V7.09226Z"
                fill="#fff"
              />
            </svg>
          </span>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 text-lg">
              <MdOutlinePhoneInTalk className="text-2xl" />
              <p>(+20) 1069142906</p>
            </li>
            <li className="flex items-center gap-2 text-lg">
              <IoMail className="text-2xl" />
              <p>
                <a href="mailto:dolay6253@gmail.com">dolay6253@gmail.com</a>
              </p>
            </li>
            <li className="flex items-center gap-2 text-lg">
              <FaLocationDot className="text-2xl" />
              <p>3891 Tanta, Egypt</p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Information</h1>
          <ul className="flex flex-col gap-4 text-gray-100 transition duration-700 hover:underline">
            <li>
              <Link href="/account">My Account</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/cart">My Cart</Link>
            </li>
            <li>
              <Link href="/wishlist">My Wishlist</Link>
            </li>
            <li>
              <Link href="/checkout">Checkout</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 xl:w-1/3">
          <h1 className="text-2xl font-bold">Subscribe</h1>
          <p>
            Enter your email below to be the first to know about new collections
            and product launches
          </p>
          <Subscribe />
        </div>
      </div>

      <hr className="w-full h-1 bg-gray-600" />

      <div className="flex flex-col items-start justify-between gap-10 xl:flex-row xl:gap-0">
        <div>
          Coded with ❤ by
          <Link
            className="ml-1 font-bold underline"
            href="https://my-portfolio-website-orpin.vercel.app/"
            target="_blank"
          >
            Adel Yasser
          </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Krist. All Rights Reserved.</p>
        <div>
          <ul className="flex items-center gap-4 text-lg">
            <li>
              <Link href="https://www.facebook.com/dola2005ti" target="_blank">
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link
                href="https://www.linkedin.com/in/adel-yasser-a28181242/"
                target="_blank"
              >
                <FaLinkedinIn />
              </Link>
            </li>
            <li>
              <Link href="https://github.com/dola5xd" target="_blank">
                <FiGithub />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
