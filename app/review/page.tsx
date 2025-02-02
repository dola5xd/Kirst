import CartInformations from "../_components/CartInformations";
import CheckoutSteps from "../_components/CheckoutSteps";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import ReviewCart from "../_components/ReviewCart";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ order: string }>;
}) {
  const orderID = Number((await searchParams).order);
  return (
    <>
      <Header />
      <main className="px-4 sm:px-6 md:px-10 xl:pt-10 xl:pb-32 xl:px-20">
        <h1 className="text-2xl font-light sm:text-3xl">Review Order</h1>
        <div className="grid grid-cols-1 gap-6 py-6 lg:grid-cols-12 sm:gap-10 sm:py-10">
          <div className="col-span-1 lg:col-span-8">
            <CheckoutSteps />
            <ReviewCart orderID={orderID} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <CartInformations orderID={orderID} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default page;
