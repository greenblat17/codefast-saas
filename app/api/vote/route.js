import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";

export async function POST(req) {
  try {
    const postId = req.nextUrl.searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    await connectMongo();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    post.votesCounter++;
    await post.save();

    return NextResponse.json({ message: "Post voted" });
  } catch (error) {
    return NextResponse.json({ message: "Error voting post" }, { status: 500 });
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

    await connectMongo();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    post.votesCounter--;
    await post.save();

    return NextResponse.json({ message: "Post unvoted" });
  } catch (error) {
    return NextResponse.json({ message: "Error voting post" }, { status: 500 });
  }
}
