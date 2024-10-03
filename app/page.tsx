import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If user is logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
  return null;
}
