import { Input } from "./ui/input";
import logo from "../assets/mapbiomas-complete-logo-E1zO2n1p.png";
import { Moon, Languages, FolderCode } from "lucide-react";

export function Header() {
  return (
    <header>
      <div className="flex border-b border-gray-300 flex-row w-screen justify-between gap-[20px] p-[20px]">
        {/* Seção da esquerda com logo e input */}
        <div className="flex flex-row items-center gap-[20px]">
          <img src={logo} alt="Mapbiomas logo" className="h-[40px] gap-[8px]" />
          <Input placeholder="Pesquise por territórios" className="w-[600px]" />
        </div>

        {/* Nova seção com ícones */}
        <div className="flex flex-row items-center gap-[10px]">
          <div className="p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <Languages size={24} className="text-gray-600 hover:text-gray-800" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <FolderCode size={24} className="text-gray-600 text-opacity-100 hover:text-gray-800" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 transition duration-300">
            <Moon size={24} className="text-gray-600 hover:text-gray-800" />
          </div>
        </div>
      </div>
    </header>
  );
}
