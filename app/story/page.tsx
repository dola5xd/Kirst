import Image from "next/image";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import AosSection from "../_components/AosSection";
import Link from "next/link";

function Page() {
  return (
    <>
      <Header />
      <AosSection className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl font-bold">Welcome to Kirst</h1>
          <p className="mb-8 text-lg text-gray-600">
            Where Style Meets Comfort. Explore Our Collection of Trendy,
            High-Quality Clothing
          </p>
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80"
            alt="Kirst Clothing Collection"
            width={1951}
            height={1301}
            className="w-full h-auto mb-8 rounded-lg shadow-lg"
          />
          <div className="space-y-4 text-left">
            <p>
              At Kirst, we believe that fashion is more than just clothing –
              it’s a way of expressing who you are. Founded in 2020, our mission
              is simple: to provide stylish, comfortable, and affordable
              clothing for every individual.
            </p>
            <p>
              From everyday essentials to statement pieces, we design clothes
              that are versatile and made to last. Whether you’re dressing up
              for a special occasion or keeping it casual, Kirst has the perfect
              look for you.
            </p>
            <h2 className="mt-6 text-2xl font-semibold">
              Why Shop with Kirst?
            </h2>
            <ul className="space-y-2 list-disc list-inside">
              <li>
                Premium Quality: Each piece of clothing is crafted from
                high-quality fabrics that ensure durability and comfort.
              </li>
              <li>
                Trendy Designs: We stay ahead of the fashion curve, offering a
                range of styles that fit your unique personality.
              </li>
              <li>
                Sustainable Practices: We are committed to sustainability by
                using eco-friendly materials and ethical production methods.
              </li>
              <li>
                Easy Shopping Experience: Our user-friendly website makes
                shopping a breeze with secure checkout and fast shipping.
              </li>
            </ul>
            <p className="mt-6">
              Discover the perfect addition to your wardrobe with Kirst. Join
              the fashion revolution and experience the difference of shopping
              with a brand that cares about style, quality, and the planet.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-block px-6 py-3 mt-6 text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
      </AosSection>
      <Footer />
    </>
  );
}

export default Page;
