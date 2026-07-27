"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { authClient } from "@rynex/auth/client";

const STAFF_ROLES = ["staff", "admin", "superAdmin"];

export default function AuthCallbackPage() {
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await authClient.getSession();

        if (!data?.user) {
          window.location.href = "/login";
          return;
        }

        const user = data.user as { role?: string };
        if (user.role && STAFF_ROLES.includes(user.role)) {
          window.location.href = "https://rynexdev-core.vercel.app";
        } else {
          window.location.href = window.location.origin;
        }
      } catch {
        window.location.href = "/login";
      }
    };

    checkSession();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
    </div>
  );
}
