import { FC, useState } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SwitchDarkMode2 from "shared/SwitchDarkMode/SwitchDarkMode2";

export interface MainNav2Props {
  className?: string;
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const [showSearchForm, setShowSearchForm] = useState(false);

  const renderSearchForm = () => {
    return (
      <form
        action=""
        method="POST"
        className="flex-1 py-2 text-slate-900 dark:text-slate-100"
      >
        <input type="submit" hidden value="" />
      </form>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-slate-900 ">
      <div className="container">
        <div className="h-20 flex justify-between">
          <div className="flex items-center md:hidden flex-1">
            <MenuBar />
          </div>

          <div className="flex lg:flex-1 items-center space-x-3 sm:space-x-8">
            <Logo />
            {!showSearchForm && (
              <div className="hidden md:block h-10 border-l border-slate-200 dark:border-slate-700"></div>
            )}
            {!showSearchForm && (
              <div className="hidden md:block">
              </div>
            )}
          </div>
          <div className="flex-1 flex items-center justify-end ">
            <SwitchDarkMode2 />
            <CartDropdown />
            {/* <MenuBar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
