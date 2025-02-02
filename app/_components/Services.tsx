import { BsCoin } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import { FaBox, FaHeadphones } from "react-icons/fa6";

function Services() {
  return (
    <div className="flex flex-col xl:flex-row items-center justify-between gap-7 px-5 xl:px-20 w-full">
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-delay="500"
        className="py-7 md w-full md:min-w-[calc(25%_-_48px)] flex flex-col gap-2 bg-gray-100 rounded-xl px-10"
      >
        <span className="text-4xl">
          <FaBox />
        </span>
        <h1 className="text-xl font-bold">Free Shipping</h1>
        <p className="text-sm">Free Shipping for order above $150</p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-delay="500"
        className="py-7 w-full md:min-w-[calc(25%_-_48px)] flex flex-col gap-2 bg-gray-100 rounded-xl px-10"
      >
        <span className="text-4xl">
          <BsCoin />
        </span>
        <h1 className="text-xl font-bold">Money Guarantee</h1>
        <p className="text-sm">Within 30 days for an exchange</p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-delay="500"
        className="py-7 w-full md:min-w-[calc(25%_-_48px)] flex flex-col gap-2 bg-gray-100 rounded-xl px-10"
      >
        <span className="text-4xl">
          <FaHeadphones />
        </span>
        <h1 className="text-xl font-bold">Online Support</h1>
        <p className="text-sm">24 hours a day, 7 days a week</p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-once="true"
        data-aos-delay="500"
        className="py-7 w-full md:min-w-[calc(25%_-_48px)] flex flex-col gap-2 bg-gray-100 rounded-xl px-10"
      >
        <span className="text-4xl">
          <FaRegCreditCard />
        </span>
        <h1 className="text-xl font-bold">Flexible Payment</h1>
        <p className="text-sm">Pay with multiple credit cards</p>
      </div>
    </div>
  );
}

export default Services;
