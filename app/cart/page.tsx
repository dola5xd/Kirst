import Footer from "../_components/Footer";
import Header from "../_components/Header";
import CartInformations from "../_components/CartInformations";
import CartItems from "../_components/CartItems";

function Page() {
  return (
    <>
      <Header />
      <main className="px-4 pt-5 pb-10 sm:px-6 lg:px-8 xl:px-20 xl:pt-10 xl:pb-32">
        <h1 className="text-2xl font-light sm:text-3xl">Cart</h1>
        <div className="grid grid-cols-1 gap-6 px-4 py-6 xl:px-0 sm:grid-cols-12 sm:gap-10 xl:py-10">
          <div className="sm:col-span-12 lg:col-span-8">
            <CartItems />
          </div>
          <div className="sm:col-span-12 lg:col-span-4">
            <CartInformations step={1} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Page;
