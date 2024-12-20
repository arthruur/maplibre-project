import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import mining from "../assets/mining.svg";
import { Moon } from "lucide-react";

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Novo estado para carregamento

  // Recupera o tema do localStorage e atualiza o estado inicial
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
    }
    setIsLoading(false); // Quando terminar o carregamento, defina o estado como false
  }, []);

  // Atualiza a classe no elemento <html> e salva no localStorage
  useEffect(() => {
    if (!isLoading) { // Verifica se o carregamento terminou
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDarkMode, isLoading]); // Dependência do isLoading para garantir que só execute depois do carregamento

  // Alterna o estado do tema
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  if (isLoading) {
    return null; // Pode retornar um carregamento ou simplesmente nada enquanto o estado isLoading for true
  }

  return (
    <header>
      <div className="flex border-b border-gray-300 dark:border-gray-700 flex-row w-screen h-fit justify-between p-[15px] bg-white dark:bg-gray-900">
        {/* Seção da esquerda com logo e input */}
        <div className="flex flex-row align-middle items-center gap-[8px]">
          <img src={mining} alt="Ícone de picareta" className="h-[48px]" />
          <img src={logo} alt="Mapbiomas logo" className="h-[28px]" />
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
