import ButtonLogout from "@/components/ButtonLogout";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import User from "@/models/User";
import connectMongo from "@/libs/mongoose";

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
      <section className="bg-base-100 px-5 py-3 max-w-5xl mx-auto flex justify-end">
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
              <li
                key={board._id}
                className="p-6 rounded-3xl bg-base-100 hover:bg-base-300 transition-colors cursor-pointer"
              >
                {board.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
