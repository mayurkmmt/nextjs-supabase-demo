import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "../utils/supabase/server";
import { redirect } from "next/navigation";
import Header from "../../components/Header";

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/");
  }

  const signUp = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect("/signup?message=Passwords do not match");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect("/signup?message=Could not authenticate user");
    }
  };

  return (
    <div>
      <Header />
      <div className="w-full px-8 sm:max-w-md mx-auto mt-4">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mb-4"
          action={signUp}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <label className="text-md" htmlFor="password">
            Confirm Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            className="bg-foreground rounded-md px-4 py-2 text-white mb-2"
          >
            Sign up
          </button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>

        <Link
          href="/login"
          className="rounded-md no-underline text-foreground text-sm"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
