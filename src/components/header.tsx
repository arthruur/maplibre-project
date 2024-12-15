import logo from "../assets/mapbiomas-complete-logo-E1zO2n1p.png";
import mining from "../assets/mining.png"
import { Moon } from "lucide-react";

export function Header() {
  
  return (
    <header>
      <div className="flex border-b border-gray-300 flex-row w-screen justify-between gap-[20px] p-[20px]">
        {/* Seção da esquerda com logo e input */}
        <div className="flex flex-row align-middle items-center gap-[8px]">
          <img src={mining} alt="Ícone de picareta" className="h-[48px]" />
          <img src={logo} alt="Mapbiomas logo" className="h-[24px]" />
        </div>

        {/* Nova seção com ícones */}
        <div className="flex flex-row items-center gap-[10px]">
          <div className="p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <Moon size={24} className="text-gray-600 hover:text-gray-800" />
          </div>
        </div>
      </div>
    </header>
  );
}
