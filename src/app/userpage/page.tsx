"use client";

import { useRouter } from "next/navigation";

export default function UserPage() {
  const token = sessionStorage.getItem("token");
  const router = useRouter();

  if (token == null) {
    router.push("/signin");
  }

  (async () => {
    const response = await fetch("/api/getrole", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    const { role } = await response.json();

    if (role === "EO") {
      router.push("/dashboard");
    }

    if (role === null) {
      router.push("/signin");
    }
  })();

  return (
    <div>
      <h1>Ini page khusus untuk user</h1>
    </div>
  );
}
