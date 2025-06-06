import { NextResponse } from "next/server";
import { Filter } from "bad-words";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";
import User from "@/models/User";
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

export async function DELETE(req) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongo();

    const user = await User.findById(session?.user?.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { message: "Please subscribe first" },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json(
        { message: "You are not authorized to delete this post" },
        { status: 401 }
      );
    }

    await Post.deleteOne({ _id: postId });

    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}
