import { type FC } from "react";
import NavbarThemeToggle from "./NavbarThemeToggle";

const Navbar: FC = () => {
  return (
    <div className="flex items-center justify-between py-2 container">
      <p>Type Party</p>
      <NavbarThemeToggle />
    </div>
  );
};

export default Navbar;
