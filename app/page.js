import ButtonLogin from "@/components/ButtonLogin";
import ListItem from "@/components/ListItem";
import FAQListItem from "@/components/FAQListItem";
import Image from "next/image";
import productDemo from "@/public/assets/productDemo.jpeg";
import { auth } from "@/auth";

export default async function Home() {
  const faqList = [
    { question: "How much does it cost?", answer: "It's free!" },
    { question: "How do I get started?", answer: "It's free!" },
    { question: "How do I get started?", answer: "It's free!" },
    { question: "How do I get started?", answer: "It's free!" },
    { question: "How do I get started?", answer: "It's free!" },
  ];

  const session = await auth();

  return (
    <main>
      {/* Header */}
      <section className="bg-base-300">
        <div className="flex justify-between items-center px-8 py-2 mx-auto max-w-5xl">
          <div className="font-bold">CodeFastSaas</div>
          <div className="space-x-4 max-md:hidden">
            <a href="#pricing" className="link link-hover">
              Pricing
            </a>
            <a href="#faq" className="link link-hover">
              FAQ
            </a>
          </div>
          <div className="">
            <ButtonLogin session={session} />
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="flex flex-col gap-14 text-center py-32 px-8 mx-auto max-w-5xl items-center md:items-start md:text-left md:flex-row">
        <Image
          src={productDemo}
          alt="Product demo"
          className="w-96 rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-extrabold mb-6 lg:text-5xl">
            Collect customer feedback to build better products
          </h1>
          <div className="opacity-90 mb-10">
            Create a feedback board in minutes, prioritize features, and build
            products your customers will love.
          </div>
          <ButtonLogin session={session} />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-base-200">
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

            <ButtonLogin session={session} extraStyle="w-full" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-base-200">
        <div className="py-32 px-8 mx-auto max-w-3xl">
          <p className="text-sm uppercase font-medium text-center text-primary md-4">
            FAQ
          </p>
          <h2 className="text-center text-3xl lg:text-4xl font-extrabold mb-12">
            Frequently Asked Questions
          </h2>

          <ul className="max-w-lg mx-auto">
            {faqList.map((qa) => (
              <FAQListItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
