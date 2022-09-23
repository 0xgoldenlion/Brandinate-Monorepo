import React from "react";
import { useLocation } from "react-router-dom";
import Header from "components/Header/Header";

const SiteHeader = () => {
  let location = useLocation();
  return location.pathname === "/" ? <Header /> : <Header/>;
};

export default SiteHeader;
