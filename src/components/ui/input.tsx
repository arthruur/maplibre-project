import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { 
  icon?: React.ReactNode;
}>(({ className, type, icon, ...props }, ref) => {
  return (
    <div
      className={cn("relative flex items-center")}
    >
      {icon && (
        <span className="absolute left-3 flex items-center text-muted-foreground">
          {icon}
        </span>
      )}
      
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-3xl border-[1px] border-gray-400 px-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" 
      size={20} />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
