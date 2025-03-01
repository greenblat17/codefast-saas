import ButtonLogin from "@/components/ButtonLogin";
import ListItem from "@/components/ListItem";

export default function Home() {
  const isLoggedIn = true;

  return (
    <main>
      {/* Header */}
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

      {/* Hero */}
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

      {/* Pricing */}
      <section className="bg-base-200">
        <div className="py-32 px-8 mx-auto max-w-3xl">
          <p className="text-sm uppercase font-medium text-center text-primary mb-4">
            Pricing
          </p>
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold mb-6">
            A pricing that adapts to your needs
          </h2>

          <div className="p-8 bg-base-100 max-w-96 rounded-3xl mx-auto space-y-6">
            <div className="flex gap-2 items-baseline">
              <div className="text-4xl font-black">19$</div>
              <div className="text-sm uppercase font-medium opacity-60">
                /month
              </div>
            </div>

            <ul className="space-y-4">
              <ListItem>Collect customer feedback</ListItem>
              <ListItem>Unlimited boards</ListItem>
              <ListItem>24/7 support</ListItem>
              <ListItem>Admin dashboard</ListItem>
            </ul>

            <ButtonLogin isLoggedIn={isLoggedIn} extraStyle="w-full" />
          </div>
        </div>
      </section>
    </main>
  );
}
