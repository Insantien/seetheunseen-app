import type { Metadata } from "next";
import { RegisterClient } from "@/components/auth/RegisterClient";

export const metadata: Metadata = {
  title: "Create Account | See the Unseen",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
