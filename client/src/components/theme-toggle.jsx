import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/themeContext";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex   items-center gap-2 justify-start w-full ">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Sun className="h-8 w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-8 w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <span className="uppercase text-base">{theme}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="dark:bg-dark-theme bg-white dark:text-white text-black"
      >
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggle;
