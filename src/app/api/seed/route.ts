import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function GET() {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test@gmail.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          {
            description: "Soul stone",
            complete: true,
          },
          {
            description: "Power stone",
          },
          {
            description: "Time stone",
          },
          {
            description: "Space stone",
          },
          {
            description: "Reality stone",
          },
        ],
      },
    },
  });

  return NextResponse.json({ message: "Seed executed" });
}
