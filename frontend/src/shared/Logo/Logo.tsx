import React from "react";
import { Link } from "react-router-dom";
import Logeo from "images/Icons/Logo.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = Logeo,
  imgLight = Logeo,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-8 sm:max-h-10 ${imgLight ? "dark:hidden" : ""
            }`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-8 sm:max-h-10 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;