import * as yup from "yup";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({
    take: take,
    skip: skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    );
    const todo = await prisma.todo.create({
      data: { description, complete, userId: user.id },
    });

    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  const user = await getUserSessionServer();

  if (!user) return NextResponse.json("Unauthorized", { status: 401 });

  try {
    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });

    return NextResponse.json("Deleted");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
