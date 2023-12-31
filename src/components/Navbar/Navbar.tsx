import { type FC } from "react";
import NavbarThemeToggle from "./NavbarThemeToggle";
import Link from "next/link";
import NavbarAuth from "./NavbarAuth";
import { parse } from "@/hooks/utils";
import { cookies } from "next/headers";

const Navbar: FC = () => {
  const theme = cookies().get("dark-theme")?.value;
  return (
    <div className="flex items-center justify-between py-2 container">
      <div className="flex gap-1">
        <Link href={"/"}>Type Party</Link>
        <Link className="text-blue-400" href="/todos">
          Todos
        </Link>
        <Link className="text-blue-400" href="/party?player=1">
          player1
        </Link>
        <Link className="text-blue-400" href="/party?player=2">
          player2
        </Link>
      </div>
      <div className="flex gap-1">
        <NavbarAuth />
        <NavbarThemeToggle initial={theme ? parse(theme) : true} />
      </div>
    </div>
  );
};

export default Navbar;
