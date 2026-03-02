import type { Metadata } from "next";
import { LoginClient } from "@/components/auth/LoginClient";

export const metadata: Metadata = {
  title: "Sign In | See the Unseen",
};

export default function LoginPage() {
  return <LoginClient />;
}
