import { NextResponse } from "next/server";
import { Filter } from "bad-words";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const { title, description } = await req.json();
    const boardId = req.nextUrl.searchParams.get("boardId");

    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    if (!sanitizedTitle) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json({ message: "Post created", post });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}
