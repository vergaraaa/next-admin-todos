import * as yup from "yup";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) return null;

  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } });

  return todo;
};

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id '${id}' not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const todo = await getTodo(id);

    if (!todo) {
      return NextResponse.json(
        { message: `Todo with id '${id}' not found` },
        { status: 404 }
      );
    }

    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: { description, complete },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
