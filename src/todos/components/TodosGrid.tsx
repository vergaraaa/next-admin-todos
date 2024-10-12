"use client";

import { Todo } from "@prisma/client";
import { TodoItem } from "./TodoItem";

import { useRouter } from "next/navigation";
import * as api from "../helper/todos";

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  const router = useRouter();

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await api.updateTodo(id, complete);
    router.refresh();

    return updatedTodo;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
