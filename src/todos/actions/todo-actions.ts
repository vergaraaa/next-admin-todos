"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) => {
  return new Promise((r) => setTimeout(r, seconds * 1000));
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo with id "${id}" not found`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos", "page");

  return updatedTodo;
};

export const addTodo = async (description: string, userId: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description, userId } });

    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    throw new Error("Error creating todo");
  }
};

export const deleteTodos = async () => {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });

    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    throw new Error("Error deleting completed todos");
  }
};
