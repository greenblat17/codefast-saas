import Link from "next/link";
import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import CardBoardLink from "@/components/CardBoardLink";
import { auth } from "@/auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";
import ButtonCheckout from "@/components/ButtonCheckout";

async function getUser() {
  const session = await auth();

  await connectMongo();

  return await User.findById(session.user.id).populate("boards");
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="bg-base-200 min-h-screen">
      {/* HEADER */}
      <section className="bg-base-100 px-5 py-3 max-w-5xl mx-auto flex justify-between">
        <ButtonCheckout />
        <ButtonLogout />
      </section>

      <section className="px-5 py-12 max-w-5xl mx-auto space-y-12">
        <FormNewBoard />

        <div className="mt-12">
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>

          <ul className="space-y-4">
            {user.boards.map((board) => (
              <li key={board._id}>
                <Link
                  href={`dashboard/b/${board._id}`}
                  className="block p-6 rounded-3xl bg-base-100 transition-colors cursor-pointer hover:bg-neutral hover:text-neutral-content duration-200"
                >
                  {board.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
