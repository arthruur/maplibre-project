import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import mining from "../assets/mining.svg";
import { Moon } from "lucide-react";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Atualiza a classe no elemento <html> com base no estado do tema
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Alterna o estado do tema
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <header>
      <div className="flex border-b border-gray-300 dark:border-gray-700 flex-row w-screen justify-between gap-[20px] p-[20px] bg-white dark:bg-gray-900">
        {/* Seção da esquerda com logo e input */}
        <div className="flex flex-row align-middle items-center gap-[8px]">
          <img src={mining} alt="Ícone de picareta" className="h-[48px]" />
          <img src={logo} alt="Mapbiomas logo" className="h-[28x]" />
        </div>

        {/* Nova seção com ícones */}
        <div className="flex flex-row items-center gap-[10px]">
          <div
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 cursor-pointer"
          >
            <Moon
              size={24}
              className={`${
                isDarkMode ? "text-white" : "text-gray-600"
              } hover:text-gray-800`}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
