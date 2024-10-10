import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });

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

  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id '${id}' not found` },
      { status: 404 }
    );
  }

  try {
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