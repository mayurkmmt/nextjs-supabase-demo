import Link from "next/link";
import User from "../components/User";
// import classes from "./Header.module.css";

export default async function Header() {
  return (
    <div className="px-[2rem] py-[1rem] flex justify-between items-center border border-solid mb-[1rem]">
      <Link href="/">
        <h3>My Auth App</h3>
      </Link>
      <User />
    </div>
  );
}
