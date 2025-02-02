import Header from "../_components/Header";
import Footer from "../_components/Footer";
import CartOpertions from "../_components/CartOpertions";

const Page = () => {
  return (
    <>
      <Header />
      <main className="px-4 pt-10 pb-32 xl:px-20">
        <h1 className="text-2xl font-light xl:text-3xl">Checkout</h1>
        <section className="grid w-full h-full grid-cols-12 py-10 xl:grid-cols-12 gap-x-6 xl:gap-x-20">
          <CartOpertions />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Page;
