import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
const getBoard = async (boardId) => {
  const session = await auth();

  await connectMongo();

  const board = await Board.findById(boardId);

  if (!board) {
    redirect("/");
  }

  return board;
};

export default async function PublicFeedbackBoard(props) {
  const { boardId } = props.params;

  const board = await getBoard(boardId);

  if (!board) {
    return <div>Board not found</div>;
  }

  return <main>{board.name} (public)</main>;
}
