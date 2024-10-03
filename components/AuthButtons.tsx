import { createClient } from "../app/utils/supabase/server";
import Link from "next/link";
import React from "react";

export const AuthButtons = async () => {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return undefined;
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Link
        href="/login"
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
      >
        Signup
      </Link>
    </div>
  );
};
