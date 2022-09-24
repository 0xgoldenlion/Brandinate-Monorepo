import { FC } from "react";
//
import HeaderNavigation from "./HeaderNavigation";

export interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  return (
    <div className="nc-Header relative w-full z-40 ">
      <HeaderNavigation />
    </div>
  );
};

export default Header;
