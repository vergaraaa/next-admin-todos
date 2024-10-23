"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Profile Page</h1>
      <hr />

      <div className="flex flex-col">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.email}</span>
      </div>
    </div>
  );
}
