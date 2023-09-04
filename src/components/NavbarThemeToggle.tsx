"use client";
import { type FC } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const NavbarThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
    >
      {theme === "dark" ? <Sun className="h-8 w-8 sm:h-6 sm:w-6" /> : <Moon className="h-8 w-8 sm:h-6 sm:w-6" />}
    </Button>
  );
};

export default NavbarThemeToggle;
