import ButtonLogin from "@/components/ButtonLogin";

export default function Home() {
  const isLoggedIn = true;

  return (
    <main>
      <section className="bg-base-300">
        <div className="flex justify-between items-center px-8 py-2 mx-auto max-w-3xl">
          <div className="font-bold">CodeFastSaas</div>
          <div className="space-x-4 max-md:hidden">
            <a href="#" className="link link-hover">
              Pricing
            </a>
            <a href="#" className="link link-hover">
              FAQ
            </a>
          </div>
          <div className="">
            <ButtonLogin isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </section>

      <section className="text-center py-32 px-8 mx-auto max-w-3xl">
        <h1 className="text-4xl font-extrabold mb-6 lg:text-5xl">
          Collect customer feedback to build better products
        </h1>
        <div className="opacity-90 mb-10">
          Create a feedback board in minutes, prioritize features, and build
          products your customers will love.
        </div>
        <ButtonLogin isLoggedIn={isLoggedIn} />
      </section>
    </main>
  );
}
