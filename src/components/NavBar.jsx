import { Menu, Search, ShoppingCart, Clock, User } from "lucide-react";
import { useSidebar } from "../customHooks/useSidebar";

const NavBar = () => {
  const {toggleSidebar} = useSidebar();
  return (
    <>
      <header className="flex items-center gap-6 bg-[#1e293b] px-6 py-4">
        <div className="shrink-0">
          <button onClick={toggleSidebar} aria-label="Toggle filters" className="text-white">
            <Menu size={22} />
          </button>
        </div>

        <div className="flex-1 flex px-6 justify-center">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-md bg-white pl-10 pr-4 py-2 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 shrink-0">
          <button aria-label="Cart" className="text-white">
            <ShoppingCart size={20} />
          </button>
          <button aria-label="History" className="text-white">
            <Clock size={20} />
          </button>
          <button aria-label="Account" className="text-white">
            <User size={20} />
          </button>
        </div>
      </header>
    </>
  );
};

export default NavBar;
